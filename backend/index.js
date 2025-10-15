const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const argon2 = require("argon2");

const app = express();
app.use(cors());
const PORT = 4000;
let db;
app.use(express.json());

// Helper function to get next sequence for auto-incrementing IDs
async function getNextSequence(name) {
  const ret = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after", upsert: true }
    );
  return ret.sequence_value || 1;
}

// Helper function to handle React Admin list queries
function buildListQuery(req) {
  const { _start, _end, _sort, _order, ...filters } = req.query;

  // Build MongoDB filter from React Admin filters
  const mongoFilter = {};
  Object.keys(filters).forEach((key) => {
    if (key.startsWith("q")) {
      // Text search across multiple fields
      mongoFilter.$or = [
        { folio: { $regex: filters[key], $options: "i" } },
        { nombre_paciente: { $regex: filters[key], $options: "i" } },
        { observaciones: { $regex: filters[key], $options: "i" } },
      ];
    } else {
      mongoFilter[key] = filters[key];
    }
  });

  const sort = {};
  if (_sort) {
    sort[_sort] = _order === "ASC" ? 1 : -1;
  } else {
    sort.fecha = -1; // Default sort by date descending
  }

  const skip = parseInt(_start) || 0;
  const limit = parseInt(_end) - skip || 10;

  return { mongoFilter, sort, skip, limit };
}

// ================================
// REPORTES ROUTES
// ================================
app.get("/reportes", async (req, res) => {
  try {
    const { mongoFilter, sort, skip, limit } = buildListQuery(req);

    const data = await db
      .collection("reportes")
      .find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("reportes").countDocuments(mongoFilter);

    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", total);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reportes:", error);
    res.status(500).json({ error: "Error fetching reportes" });
  }
});

// Get single reporte
app.get("/reportes/:id", async (req, res) => {
  try {
    // Ensure ID is treated as string
    const id = String(req.params.id);
    const data = await db.collection("reportes").findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ error: "Reporte not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching reporte:", error);
    res.status(500).json({ error: "Error fetching reporte" });
  }
});

// Create new reporte
app.post("/reportes", async (req, res) => {
  try {
    const values = req.body;

    // Generate next sequence number for folio if not provided
    if (!values.folio) {
      const nextId = await getNextSequence("reportes");
      values.folio = `R-${nextId.toString().padStart(4, "0")}`;
    }

    // Generate ID for both _id and id fields
    if (!values._id) {
      const nextId = (await getNextSequence("reportes")).toString();
      values._id = nextId;
      values.id = nextId;
    }

    // Set timestamps
    values.createdAt = new Date();
    values.updatedAt = new Date();

    // Convert date strings to Date objects
    if (values.fecha && typeof values.fecha === "string") {
      values.fecha = new Date(values.fecha);
    }

    // Convert timing fields to Date objects
    const timeFields = [
      "hora_llamada",
      "hora_salida_base",
      "hora_llegada_servicio",
      "hora_salida_servicio",
      "hora_llegada_hospital",
      "hora_salida_hospital",
      "hora_llegada_base",
    ];

    timeFields.forEach((field) => {
      if (values[field] && typeof values[field] === "string") {
        values[field] = new Date(values[field]);
      }
    });

    // Convert vital signs timestamps
    if (values.signos_vitales && Array.isArray(values.signos_vitales)) {
      values.signos_vitales = values.signos_vitales.map((signo) => ({
        ...signo,
        hora_lectura:
          typeof signo.hora_lectura === "string"
            ? new Date(signo.hora_lectura)
            : signo.hora_lectura,
      }));
    }

    // Convert medication timestamps
    if (values.medicamentos && Array.isArray(values.medicamentos)) {
      values.medicamentos = values.medicamentos.map((med) => ({
        ...med,
        hora: typeof med.hora === "string" ? new Date(med.hora) : med.hora,
      }));
    }

    const result = await db.collection("reportes").insertOne(values);

    // Return the created document with id field
    const createdDoc = await db
      .collection("reportes")
      .findOne({ id: values.id });

    res.status(201).json(createdDoc);
  } catch (error) {
    console.error("Error creating reporte:", error);
    res.status(500).json({ error: "Error creating reporte" });
  }
});

// Delete reporte
app.delete("/reportes/:id", async (req, res) => {
  try {
    const result = await db
      .collection("reportes")
      .deleteOne({ id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Reporte not found" });
    }

    res.json({ id: req.params.id });
  } catch (error) {
    console.error("Error deleting reporte:", error);
    res.status(500).json({ error: "Error deleting reporte" });
  }
});

// Update reporte
app.put("/reportes/:id", async (req, res) => {
  try {
    const values = req.body;
    values.updatedAt = new Date();

    // Convert date strings to Date objects (same as create)
    if (values.fecha && typeof values.fecha === "string") {
      values.fecha = new Date(values.fecha);
    }

    const timeFields = [
      "hora_llamada",
      "hora_salida_base",
      "hora_llegada_servicio",
      "hora_salida_servicio",
      "hora_llegada_hospital",
      "hora_salida_hospital",
      "hora_llegada_base",
    ];

    timeFields.forEach((field) => {
      if (values[field] && typeof values[field] === "string") {
        values[field] = new Date(values[field]);
      }
    });

    if (values.signos_vitales && Array.isArray(values.signos_vitales)) {
      values.signos_vitales = values.signos_vitales.map((signo) => ({
        ...signo,
        hora_lectura:
          typeof signo.hora_lectura === "string"
            ? new Date(signo.hora_lectura)
            : signo.hora_lectura,
      }));
    }

    if (values.medicamentos && Array.isArray(values.medicamentos)) {
      values.medicamentos = values.medicamentos.map((med) => ({
        ...med,
        hora: typeof med.hora === "string" ? new Date(med.hora) : med.hora,
      }));
    }

    const result = await db
      .collection("reportes")
      .updateOne({ id: req.params.id }, { $set: values });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Reporte not found" });
    }

    const updatedDoc = await db
      .collection("reportes")
      .findOne({ id: req.params.id });

    res.json(updatedDoc);
  } catch (error) {
    console.error("Error updating reporte:", error);
    res.status(500).json({ error: "Error updating reporte" });
  }
});

// ================================
// USERS ROUTES
// ================================
app.get("/users", async (req, res) => {
  try {
    const { mongoFilter, sort, skip, limit } = buildListQuery(req);

    const data = await db
      .collection("users")
      .find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .project({ password: 0 }) // Don't return passwords
      .toArray();

    const total = await db.collection("users").countDocuments(mongoFilter);

    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", total);
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const data = await db
      .collection("users")
      .findOne({ _id: req.params.id }, { projection: { password: 0 } });

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const values = req.body;

    // Check if username already exists
    const existingUser = await db
      .collection("users")
      .findOne({ username: values.username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Generate ID for both _id and id fields
    if (!values._id) {
      const nextId = (await getNextSequence("users")).toString();
      values._id = nextId;
      values.id = nextId;
    }

    // Hash password
    if (values.password) {
      const hash = await argon2.hash(values.password, {
        type: argon2.argon2id,
        memoryCost: 19 * 1024,
        timeCost: 2,
        parallelism: 1,
        saltLength: 16,
      });
      values.password = hash;
    }

    values.isActive = true;
    values.createdAt = new Date();
    values.updatedAt = new Date();

    const result = await db.collection("users").insertOne(values);

    // Return without password
    const createdDoc = await db
      .collection("users")
      .findOne({ _id: result.insertedId }, { projection: { password: 0 } });

    res.status(201).json(createdDoc);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const values = req.body;

    // Hash password if it's being updated
    if (values.password) {
      const hash = await argon2.hash(values.password, {
        type: argon2.argon2id,
        memoryCost: 19 * 1024,
        timeCost: 2,
        parallelism: 1,
        saltLength: 16,
      });
      values.password = hash;
    }

    values.updatedAt = new Date();

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: values },
        { returnDocument: "after", projection: { _id: 0, password: 0 } }
      );

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const result = await db
      .collection("users")
      .deleteOne({ id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

// ================================
// TURNOS ROUTES
// ================================
app.get("/turnos", async (req, res) => {
  try {
    const { mongoFilter, sort, skip, limit } = buildListQuery(req);

    const data = await db
      .collection("turnos")
      .find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)

      .toArray();

    const total = await db.collection("turnos").countDocuments(mongoFilter);

    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", total);
    res.json(data);
  } catch (error) {
    console.error("Error fetching turnos:", error);
    res.status(500).json({ error: "Error fetching turnos" });
  }
});

// Get single turno
app.get("/turnos/:id", async (req, res) => {
  try {
    const data = await db.collection("turnos").findOne({ id: req.params.id });

    if (!data) {
      return res.status(404).json({ error: "Turno not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching turno:", error);
    res.status(500).json({ error: "Error fetching turno" });
  }
});

app.post("/turnos", async (req, res) => {
  try {
    const values = req.body;

    // Generate ID for both _id and id fields
    if (!values._id) {
      const nextId = (await getNextSequence("turnos")).toString();
      values._id = nextId;
      values.id = nextId;
    }

    values.isActive = true;
    values.createdAt = new Date();
    values.updatedAt = new Date();

    const result = await db.collection("turnos").insertOne(values);

    const createdDoc = await db.collection("turnos").findOne({ id: values.id });

    res.status(201).json(createdDoc);
  } catch (error) {
    console.error("Error creating turno:", error);
    res.status(500).json({ error: "Error creating turno" });
  }
});

// ================================
// INSUMOS ROUTES
// ================================
app.get("/insumos", async (req, res) => {
  try {
    const { mongoFilter, sort, skip, limit } = buildListQuery(req);

    const data = await db
      .collection("insumos")
      .find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)

      .toArray();

    const total = await db.collection("insumos").countDocuments(mongoFilter);

    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", total);
    res.json(data);
  } catch (error) {
    console.error("Error fetching insumos:", error);
    res.status(500).json({ error: "Error fetching insumos" });
  }
});

// Get single insumo
app.get("/insumos/:id", async (req, res) => {
  try {
    const data = await db.collection("insumos").findOne({ id: req.params.id });

    if (!data) {
      return res.status(404).json({ error: "Insumo not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching insumo:", error);
    res.status(500).json({ error: "Error fetching insumo" });
  }
});

app.post("/insumos", async (req, res) => {
  try {
    const values = req.body;

    // Generate ID for both _id and id fields
    if (!values._id) {
      const nextId = (await getNextSequence("insumos")).toString();
      values._id = nextId;
      values.id = nextId;
    }

    values.isActive = true;
    values.createdAt = new Date();
    values.updatedAt = new Date();

    const result = await db.collection("insumos").insertOne(values);

    const createdDoc = await db
      .collection("insumos")
      .findOne({ id: values.id });

    res.status(201).json(createdDoc);
  } catch (error) {
    console.error("Error creating insumo:", error);
    res.status(500).json({ error: "Error creating insumo" });
  }
});

// ================================
// LOGS ROUTES
// ================================
app.get("/logs", async (req, res) => {
  try {
    const { mongoFilter, sort, skip, limit } = buildListQuery(req);

    const data = await db
      .collection("logs")
      .find(mongoFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)

      .toArray();

    const total = await db.collection("logs").countDocuments(mongoFilter);

    res.set("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("X-Total-Count", total);
    res.json(data);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Error fetching logs" });
  }
});

// Get single log
app.get("/logs/:id", async (req, res) => {
  try {
    const data = await db.collection("logs").findOne({ id: req.params.id });

    if (!data) {
      return res.status(404).json({ error: "Log not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching log:", error);
    res.status(500).json({ error: "Error fetching log" });
  }
});

// ================================
// AUTHENTICATION
// ================================
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.collection("users").findOne({ username });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password using argon2
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Log the login
    await db.collection("logs").insertOne({
      id: (await getNextSequence("logs")).toString(),
      accion: "login",
      usuario: user.fullName,
      usuarioId: user.id,
      fecha: new Date(),
      detalle: `Usuario ${user.username} inició sesión`,
      ip_address: req.ip,
    });

    // Create a simple JWT token (for development - use proper JWT library in production)
    const token = Buffer.from(
      `${user.id}:${user.username}:${Date.now()}`
    ).toString("base64");

    // Return user data without password
    const { password: _, ...userData } = user;
    res.json({ user: userData, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// Database connection
async function connectToDB() {
  try {
    const client = new MongoClient(
      "mongodb://127.0.0.1:27017/proteccion_civil_cuajimalpa"
    );
    await client.connect();
    db = client.db();
    console.log("✅ Connected to MongoDB - Protección Civil Cuajimalpa");

    // Initialize counters if they don't exist
    const countersExist = await db
      .collection("counters")
      .findOne({ _id: "reportes" });
    if (!countersExist) {
      await db.collection("counters").insertMany([
        { _id: "reportes", sequence_value: 0 },
        { _id: "users", sequence_value: 9 }, // Starting after existing users
        { _id: "turnos", sequence_value: 3 },
        { _id: "insumos", sequence_value: 8 },
        { _id: "logs", sequence_value: 0 },
      ]);
      console.log("✅ Counters initialized");
    }
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, () => {
  connectToDB();
  console.log(`🚀 Protección Civil API running on port ${PORT}`);
});
