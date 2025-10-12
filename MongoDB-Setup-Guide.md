# MongoDB Setup Guide for Protección Civil Cuajimalpa

## 📋 Prerequisites

1. **MongoDB installed** (Community Edition or MongoDB Atlas)
2. **MongoDB Compass** (optional, for GUI management)
3. **mongosh** (MongoDB Shell)

## 🚀 Setup Instructions

### Step 1: Create Database

```bash
# Connect to MongoDB
mongosh

# Create and use your database
use proteccion_civil_cuajimalpa
```

### Step 2: Create Collections with Schema Validation

```bash
# Run the collections creation script
load("mongodb-collections.js")
```

### Step 3: Insert Sample Data

```bash
# Run the sample data insertion script
load("mongodb-sample-data.js")
```

## 📊 Collection Overview

### 1. **users** - User Management

- **Purpose**: Store system users (paramedics, supervisors, admins)
- **Key Fields**: username, fullName, role, turnoId
- **Indexes**: username (unique), role, turnoId

### 2. **turnos** - Shift Management

- **Purpose**: Define work shifts and assigned personnel
- **Key Fields**: nombre, horario, colaboradores[]
- **Indexes**: nombre

### 3. **reportes** - Emergency Reports (Main Collection)

- **Purpose**: Comprehensive emergency response documentation
- **Key Sections**:
  - Basic info (folio, date, personnel)
  - Unit data (ambulance, crew)
  - Timing (call to return chronometry)
  - Location (address, occurrence type)
  - Patient data (demographics, insurance)
  - Emergency cause (origin, agent, accident details)
  - Medical evaluation (consciousness, airways, vitals)
  - Treatment (procedures, medications)
  - Transfer (destination, condition)
- **Indexes**: folio (unique), fecha, colaboradorId, tipoEmergencia, gravedad

### 4. **insumos** - Medical Supplies

- **Purpose**: Inventory management for medical supplies
- **Key Fields**: nombre, categoria, stock, unidad, stockMinimo
- **Indexes**: nombre, categoria, stock

### 5. **logs** - Audit Trail

- **Purpose**: Track all system activities for accountability
- **Key Fields**: accion, usuario, fecha, detalle
- **Indexes**: fecha, usuarioId, accion

### 6. **counters** - Auto-incrementing IDs

- **Purpose**: Generate sequential IDs for reports (R-0001, R-0002, etc.)

## 🔐 Security Recommendations

### 1. Password Hashing

```javascript
// Use bcrypt for password hashing (example shown in sample data)
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash("plainPassword", 10);
```

### 2. Database User Creation

```javascript
// Create dedicated database user
db.createUser({
  user: "proteccion_civil_app",
  pwd: "your_secure_password_here",
  roles: [{ role: "readWrite", db: "proteccion_civil_cuajimalpa" }],
});
```

### 3. Connection String Example

```
mongodb://proteccion_civil_app:your_password@localhost:27017/proteccion_civil_cuajimalpa
```

## 📈 Performance Optimization

### 1. Additional Indexes for Heavy Queries

```javascript
// Composite indexes for common queries
db.reportes.createIndex({ colaboradorId: 1, fecha: -1 });
db.reportes.createIndex({ turnoId: 1, estado: 1 });
db.reportes.createIndex({ gravedad: 1, fecha: -1 });

// Text search index for observations
db.reportes.createIndex({ observaciones: "text", nombre_paciente: "text" });
```

### 2. Data Archival Strategy

```javascript
// Archive old reports (older than 2 years)
db.reportes_archive.insertMany(
  db.reportes
    .find({
      fecha: {
        $lt: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
      },
    })
    .toArray()
);
```

## 🔄 Migration from JSON Server

### 1. Data Export Script

```javascript
// Export existing db.json data to MongoDB format
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./frontend/db.json"));

// Convert date strings to Date objects
data.reportes.forEach((reporte) => {
  if (reporte.fecha) reporte.fecha = new Date(reporte.fecha);
  if (reporte.hora_llamada)
    reporte.hora_llamada = new Date(reporte.hora_llamada);
  // ... convert other date fields
});

// Insert to MongoDB
db.reportes.insertMany(data.reportes);
db.users.insertMany(data.users);
// ... etc
```

### 2. Backend Integration

Update your data provider to connect to MongoDB instead of JSON server:

```javascript
// Example with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/proteccion_civil_cuajimalpa");

// Or with native MongoDB driver
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
```

## 📋 Validation Features

The collections include comprehensive validation:

- ✅ **Required fields** enforcement
- ✅ **Data types** validation (string, int, date, bool)
- ✅ **Enum values** for dropdowns (role, gravedad, etc.)
- ✅ **Range validation** (age 0-120, Glasgow 1-15, etc.)
- ✅ **Array structure** validation (vital signs, medications)
- ✅ **Nested objects** validation (ambulance info, patient data)

## 🎯 Next Steps

1. **Run the setup scripts** to create your MongoDB collections
2. **Update your backend** to connect to MongoDB
3. **Modify your data provider** in React Admin
4. **Test the integration** with your existing frontend
5. **Implement backup strategy** for production data

Your MongoDB database will now support the full comprehensive emergency reporting system with proper data validation and indexing for optimal performance!
