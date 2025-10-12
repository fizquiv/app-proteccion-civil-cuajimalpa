// Sample data insertion script for MongoDB
// Run this after creating the collections to populate with initial data

// ================================
// INSERT USERS
// ================================
db.users.insertMany([
  {
    _id: ObjectId(),
    username: "juan.manuel",
    fullName: "Juan Manuel Rodríguez",
    password: "$2b$10$8K1p/a0drtwhzwCBDfVOyuvzFNiRfZ/0xRVGM3lTCzOEhqQf/2FgW", // hashed "1234"
    role: "colaborador",
    turnoId: "1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId(),
    username: "maria.gonzalez",
    fullName: "María González López",
    password: "$2b$10$8K1p/a0drtwhzwCBDfVOyuvzFNiRfZ/0xRVGM3lTCzOEhqQf/2FgW", // hashed "1234"
    role: "jefe_turno",
    turnoId: "1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId(),
    username: "admin",
    fullName: "Administrador del Sistema",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // hashed "admin"
    role: "administrador",
    turnoId: "1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// ================================
// INSERT TURNOS
// ================================
db.turnos.insertMany([
  {
    _id: "1",
    nombre: "Turno Matutino",
    horario: "06:00 - 14:00",
    colaboradores: ["1", "2"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    nombre: "Turno Vespertino",
    horario: "14:00 - 22:00",
    colaboradores: ["4", "5", "6"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    nombre: "Turno Nocturno",
    horario: "22:00 - 06:00",
    colaboradores: ["7", "8", "9"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// ================================
// INSERT INSUMOS
// ================================
db.insumos.insertMany([
  {
    _id: "1",
    nombre: "Oxígeno",
    categoria: "respiratorio",
    stock: 15,
    unidad: "tanques",
    stockMinimo: 5,
    ubicacion: "Almacén A",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    nombre: "Gasa",
    categoria: "curacion",
    stock: 200,
    unidad: "piezas",
    stockMinimo: 50,
    ubicacion: "Almacén B",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    nombre: "Camilla",
    categoria: "transporte",
    stock: 5,
    unidad: "piezas",
    stockMinimo: 2,
    ubicacion: "Garage",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    nombre: "Medicamentos",
    categoria: "farmacia",
    stock: 50,
    unidad: "dosis",
    stockMinimo: 20,
    ubicacion: "Farmacia",
    fechaVencimiento: new Date("2025-12-31"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5",
    nombre: "Desfibrilador",
    categoria: "equipo_medico",
    stock: 3,
    unidad: "equipos",
    stockMinimo: 1,
    ubicacion: "Ambulancias",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// ================================
// INSERT SAMPLE COMPREHENSIVE REPORTE
// ================================
db.reportes.insertOne({
  _id: ObjectId(),
  folio: "R-0001",
  fecha: new Date("2025-09-19T09:15:00"),
  hora: "09:15",
  colaboradorId: "1",
  colaboradorNombre: "Juan Manuel Rodríguez",
  turnoId: "1",

  // Unit Information
  numero_ambulancia: "AMB-01",
  operador: "Luis García Martínez",
  tum: "Dr. Roberto Silva",
  socorrista: "María López Vega",

  // Timing
  hora_llamada: new Date("2025-09-19T09:10:00"),
  hora_salida_base: new Date("2025-09-19T09:12:00"),
  hora_llegada_servicio: new Date("2025-09-19T09:22:00"),
  hora_salida_servicio: new Date("2025-09-19T09:45:00"),
  hora_llegada_hospital: new Date("2025-09-19T09:58:00"),
  hora_salida_hospital: new Date("2025-09-19T10:15:00"),
  hora_llegada_base: new Date("2025-09-19T10:30:00"),

  // Location
  calle: "Av. Santa Fe",
  entre_calles: "Vasco de Quiroga y Prolongación Paseo de la Reforma",
  colonia_comunidad: "Santa Fe",
  alcaldia_municipio: "Cuajimalpa de Morelos",
  lugar_ocurrencia: "via_publica",

  // Patient Information
  nombre_paciente: "Carlos Pérez Mendoza",
  sexo: "masculino",
  edad_anios: 34,
  edad_meses: 0,
  domicilio: "Calle Palmas #45, Col. Lomas de Chapultepec",
  ocupacion: "Ingeniero",
  derechohabiente: "imss",

  // Emergency Cause
  origen_probable: "musculo_esqueletico",
  agente_causal: "automotor",
  tipo_accidente_auto: "colision",
  vehiculos_involucrados: ["automotor", "motocicleta"],
  cinturon_seguridad: "colocado",
  paciente_eyectado: false,

  // Medical Evaluation
  nivel_consciencia: "alerta",
  via_aerea: "permeable",
  ventilacion: "automatismo_regular",
  pulsos: "radial",
  condicion_piel: "normal",
  glasgow_ocular: 4,
  glasgow_verbal: 5,
  glasgow_motora: 6,
  glasgow_total: 15,

  // Vital Signs
  signos_vitales: [
    {
      hora_lectura: new Date("2025-09-19T09:25:00"),
      tas: "120",
      tad: "80",
      frecuencia_cardiaca: 78,
      frecuencia_respiratoria: 18,
      saturacion_oxigeno: 98,
      temperatura: 36.5,
      glucosa: 95,
    },
    {
      hora_lectura: new Date("2025-09-19T09:40:00"),
      tas: "118",
      tad: "78",
      frecuencia_cardiaca: 75,
      frecuencia_respiratoria: 16,
      saturacion_oxigeno: 99,
      temperatura: 36.4,
      glucosa: 92,
    },
  ],

  // Procedures
  manejo_via_aerea: ["aspiracion"],
  asistencia_ventilatoria: ["puntas_nasales"],
  control_hemorragias: ["presion_directa", "vendaje_compresivo"],

  // Medications
  medicamentos: [
    {
      hora: new Date("2025-09-19T09:30:00"),
      medicamento: "Ketorolaco",
      dosis: "30mg",
      via_administracion: "IV",
    },
  ],

  // Transfer
  condicion_traslado: "estable",
  hospital_destino: "Hospital ABC Santa Fe",
  medico_recibe: "Dr. Patricia Hernández",
  negativa_traslado: false,

  // Legacy fields
  tipoEmergencia: "accidente vial",
  gravedad: "alta",
  ubicacion: "Av. Santa Fe y Vasco de Quiroga",
  ambulancia: {
    numero: "AMB-01",
    operador: "Luis García Martínez",
  },

  // Supplies used
  insumos: [
    {
      id: "1",
      nombre: "Oxígeno",
      cantidad: 1,
    },
    {
      id: "2",
      nombre: "Gasa",
      cantidad: 5,
    },
  ],

  observaciones:
    "Paciente masculino de 34 años, consciente y orientado. Colisión vehicular con traumatismo menor en pierna derecha. Signos vitales estables durante todo el traslado. Responde adecuadamente al tratamiento. Se realizó inmovilización preventiva y control del dolor.",
  estado: "cerrado",

  createdAt: new Date("2025-09-19T09:15:00"),
  updatedAt: new Date("2025-09-19T10:30:00"),
});

// ================================
// INSERT SAMPLE LOGS
// ================================
db.logs.insertMany([
  {
    _id: ObjectId(),
    accion: "crear_reporte",
    usuario: "Juan Manuel Rodríguez",
    usuarioId: "1",
    fecha: new Date("2025-09-19T09:20:00"),
    detalle: "Reporte folio R-0001 creado - Accidente vial",
    ip_address: "192.168.1.10",
  },
  {
    _id: ObjectId(),
    accion: "actualizar_stock",
    usuario: "Administrador del Sistema",
    usuarioId: "3",
    fecha: new Date("2025-09-22T08:00:00"),
    detalle: "Stock de oxígeno actualizado: +5 tanques",
    ip_address: "192.168.1.5",
  },
]);

console.log("Sample data inserted successfully!");
console.log("- Users: 3 records");
console.log("- Turnos: 3 records");
console.log("- Insumos: 5 records");
console.log("- Reportes: 1 comprehensive record");
console.log("- Logs: 2 records");
