// MongoDB Collections for Protección Civil Cuajimalpa
// Run this in MongoDB Compass or mongosh to create your collections with proper schemas

// ================================
// 1. USERS COLLECTION
// ================================
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "fullName", "password", "role"],
      properties: {
        username: {
          bsonType: "string",
          description: "Unique username for login"
        },
        fullName: {
          bsonType: "string",
          description: "Full name of the user"
        },
        password: {
          bsonType: "string",
          description: "User password (should be hashed in production)"
        },
        role: {
          bsonType: "string",
          enum: ["administrador", "jefe_turno", "colaborador"],
          description: "User role in the system"
        },
        turnoId: {
          bsonType: "string",
          description: "ID of the assigned shift/turno"
        },
        createdAt: {
          bsonType: "date",
          description: "User creation timestamp"
        },
        updatedAt: {
          bsonType: "date", 
          description: "Last update timestamp"
        },
        isActive: {
          bsonType: "bool",
          description: "Whether the user account is active"
        }
      }
    }
  }
});

// Create indexes for users
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "turnoId": 1 });

// ================================
// 2. TURNOS (SHIFTS) COLLECTION  
// ================================
db.createCollection("turnos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "horario"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Name of the shift (e.g., Turno Matutino)"
        },
        horario: {
          bsonType: "string",
          description: "Shift schedule (e.g., 06:00 - 14:00)"
        },
        colaboradores: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Array of user IDs assigned to this shift"
        },
        isActive: {
          bsonType: "bool",
          description: "Whether this shift is currently active"
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Create indexes for turnos
db.turnos.createIndex({ "nombre": 1 });

// ================================
// 3. REPORTES (EMERGENCY REPORTS) COLLECTION
// ================================
db.createCollection("reportes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["folio", "fecha", "colaboradorId", "nombre_paciente"],
      properties: {
        folio: {
          bsonType: "string",
          description: "Unique report identifier (e.g., R-0001)"
        },
        fecha: {
          bsonType: "date",
          description: "Report date and time"
        },
        hora: {
          bsonType: "string",
          description: "Report time in HH:MM format"
        },
        colaboradorId: {
          bsonType: "string",
          description: "ID of the paramedic who created the report"
        },
        colaboradorNombre: {
          bsonType: "string",
          description: "Name of the paramedic"
        },
        turnoId: {
          bsonType: "string",
          description: "Shift ID when the emergency occurred"
        },
        
        // Unit Information
        numero_ambulancia: {
          bsonType: "string",
          description: "Ambulance number (e.g., AMB-01)"
        },
        operador: {
          bsonType: "string",
          description: "Ambulance operator name"
        },
        tum: {
          bsonType: "string",
          description: "T.U.M. (Técnico en Urgencias Médicas)"
        },
        socorrista: {
          bsonType: "string",
          description: "Paramedic/First responder name"
        },

        // Timing Information
        hora_llamada: {
          bsonType: "date",
          description: "Emergency call time"
        },
        hora_salida_base: {
          bsonType: "date",
          description: "Base departure time"
        },
        hora_llegada_servicio: {
          bsonType: "date",
          description: "Service arrival time"
        },
        hora_salida_servicio: {
          bsonType: "date",
          description: "Service departure time"
        },
        hora_llegada_hospital: {
          bsonType: "date",
          description: "Hospital arrival time"
        },
        hora_salida_hospital: {
          bsonType: "date",
          description: "Hospital departure time"
        },
        hora_llegada_base: {
          bsonType: "date",
          description: "Base return time"
        },

        // Location Information
        calle: {
          bsonType: "string",
          description: "Street address"
        },
        entre_calles: {
          bsonType: "string",
          description: "Between streets"
        },
        colonia_comunidad: {
          bsonType: "string",
          description: "Neighborhood or community"
        },
        alcaldia_municipio: {
          bsonType: "string",
          description: "Municipality or alcaldía"
        },
        lugar_ocurrencia: {
          bsonType: "string",
          enum: ["hogar", "transporte_publico", "escuela", "trabajo", "recreacion_deporte", "via_publica", "otro"],
          description: "Location type where emergency occurred"
        },

        // Patient Information
        nombre_paciente: {
          bsonType: "string",
          description: "Patient full name"
        },
        sexo: {
          bsonType: "string",
          enum: ["masculino", "femenino"],
          description: "Patient gender"
        },
        edad_anios: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "Patient age in years"
        },
        edad_meses: {
          bsonType: "int",
          minimum: 0,
          maximum: 11,
          description: "Patient age in months (for babies)"
        },
        domicilio: {
          bsonType: "string",
          description: "Patient address"
        },
        ocupacion: {
          bsonType: "string",
          description: "Patient occupation"
        },
        derechohabiente: {
          bsonType: "string",
          enum: ["imss", "issste", "privado", "otro"],
          description: "Insurance/healthcare provider"
        },

        // Emergency Cause
        origen_probable: {
          bsonType: "string",
          enum: ["neurologica", "infecciosa", "musculo_esqueletico", "cardiovascular", "digestiva", "metabolica", "respiratoria", "ginecoobstetrica", "cognitivo_emocional", "otro"],
          description: "Probable origin of emergency"
        },
        agente_causal: {
          bsonType: "string",
          enum: ["arma", "juguete", "caida", "animal", "automotor", "sustancia_caliente", "sustancia_toxica", "producto_biologico", "ser_humano", "otro"],
          description: "Causal agent of emergency"
        },

        // Accident Information (if applicable)
        tipo_accidente_auto: {
          bsonType: "string",
          enum: ["colision", "volcadura", "atropellado", "contra_objeto_fijo"],
          description: "Type of vehicle accident"
        },
        vehiculos_involucrados: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: ["automotor", "motocicleta", "bicicleta", "maquinaria"]
          },
          description: "Vehicles involved in accident"
        },
        cinturon_seguridad: {
          bsonType: "string",
          enum: ["colocado", "no_colocado"],
          description: "Seatbelt status"
        },
        paciente_eyectado: {
          bsonType: "bool",
          description: "Whether patient was ejected from vehicle"
        },

        // Medical Evaluation
        nivel_consciencia: {
          bsonType: "string",
          enum: ["alerta", "respuesta_verbal", "respuesta_dolor", "inconsciente"],
          description: "Patient consciousness level"
        },
        via_aerea: {
          bsonType: "string",
          enum: ["permeable", "comprometida"],
          description: "Airway status"
        },
        ventilacion: {
          bsonType: "string",
          enum: ["automatismo_regular", "automatismo_irregular", "rapida", "superficial", "apnea"],
          description: "Ventilation status"
        },
        pulsos: {
          bsonType: "string",
          enum: ["carotideo", "radial", "paro_cardiorrespiratorio"],
          description: "Pulse presence and type"
        },
        condicion_piel: {
          bsonType: "string",
          enum: ["normal", "palida", "cianotica", "fria", "caliente", "diaforetica"],
          description: "Skin condition"
        },

        // Glasgow Scale
        glasgow_ocular: {
          bsonType: "int",
          minimum: 1,
          maximum: 4,
          description: "Glasgow Coma Scale - Eye opening"
        },
        glasgow_verbal: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Glasgow Coma Scale - Verbal response"
        },
        glasgow_motora: {
          bsonType: "int",
          minimum: 1,
          maximum: 6,
          description: "Glasgow Coma Scale - Motor response"
        },
        glasgow_total: {
          bsonType: "int",
          minimum: 3,
          maximum: 15,
          description: "Total Glasgow Coma Scale score"
        },

        // Vital Signs (Array of readings)
        signos_vitales: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              hora_lectura: {
                bsonType: "date",
                description: "Time of vital signs reading"
              },
              tas: {
                bsonType: "string",
                description: "Systolic blood pressure"
              },
              tad: {
                bsonType: "string", 
                description: "Diastolic blood pressure"
              },
              frecuencia_cardiaca: {
                bsonType: "int",
                minimum: 0,
                maximum: 300,
                description: "Heart rate (BPM)"
              },
              frecuencia_respiratoria: {
                bsonType: "int",
                minimum: 0,
                maximum: 60,
                description: "Respiratory rate"
              },
              saturacion_oxigeno: {
                bsonType: "int",
                minimum: 0,
                maximum: 100,
                description: "Oxygen saturation (%)"
              },
              temperatura: {
                bsonType: "double",
                minimum: 30.0,
                maximum: 45.0,
                description: "Body temperature (°C)"
              },
              glucosa: {
                bsonType: "int",
                minimum: 0,
                maximum: 500,
                description: "Blood glucose (mg/dL)"
              }
            }
          },
          description: "Array of vital signs readings"
        },

        // Medical Procedures
        manejo_via_aerea: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: ["aspiracion", "canula_orofaringea", "intubacion_orotraqueal", "otro"]
          },
          description: "Airway management procedures"
        },
        asistencia_ventilatoria: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: ["puntas_nasales", "mascarilla_simple", "balon_valvula_mascarilla"]
          },
          description: "Ventilatory assistance methods"
        },
        control_hemorragias: {
          bsonType: "array",
          items: {
            bsonType: "string",
            enum: ["presion_directa", "vendaje_compresivo", "torniquete"]
          },
          description: "Hemorrhage control methods"
        },

        // Medications (Array)
        medicamentos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              hora: {
                bsonType: "date",
                description: "Medication administration time"
              },
              medicamento: {
                bsonType: "string",
                description: "Medication name"
              },
              dosis: {
                bsonType: "string",
                description: "Dose administered"
              },
              via_administracion: {
                bsonType: "string",
                description: "Route of administration"
              }
            }
          },
          description: "Medications administered"
        },

        // Transfer Information
        condicion_traslado: {
          bsonType: "string",
          enum: ["critico", "no_critico", "estable", "inestable"],
          description: "Patient condition during transfer"
        },
        hospital_destino: {
          bsonType: "string",
          description: "Destination hospital"
        },
        medico_recibe: {
          bsonType: "string",
          description: "Name of receiving physician"
        },
        negativa_traslado: {
          bsonType: "bool",
          description: "Patient refused treatment/transfer"
        },

        // Legacy fields for compatibility
        tipoEmergencia: {
          bsonType: "string",
          description: "Type of emergency (legacy field)"
        },
        gravedad: {
          bsonType: "string",
          enum: ["baja", "media", "alta", "critica"],
          description: "Emergency severity"
        },
        ubicacion: {
          bsonType: "string",
          description: "Emergency location (legacy field)"
        },
        ambulancia: {
          bsonType: "object",
          properties: {
            numero: {
              bsonType: "string"
            },
            operador: {
              bsonType: "string"
            }
          },
          description: "Ambulance information (legacy structure)"
        },

        // Supplies used
        insumos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              id: {
                bsonType: "string",
                description: "Supply item ID"
              },
              nombre: {
                bsonType: "string",
                description: "Supply item name"
              },
              cantidad: {
                bsonType: "int",
                minimum: 0,
                description: "Quantity used"
              }
            }
          },
          description: "Medical supplies used during emergency"
        },

        // Additional Information
        observaciones: {
          bsonType: "string",
          description: "Additional observations and notes"
        },
        estado: {
          bsonType: "string",
          enum: ["abierto", "en_proceso", "cerrado"],
          description: "Report status"
        },
        
        // Audit fields
        createdAt: {
          bsonType: "date",
          description: "Report creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});

// Create indexes for reportes
db.reportes.createIndex({ "folio": 1 }, { unique: true });
db.reportes.createIndex({ "fecha": -1 });
db.reportes.createIndex({ "colaboradorId": 1 });
db.reportes.createIndex({ "tipoEmergencia": 1 });
db.reportes.createIndex({ "gravedad": 1 });
db.reportes.createIndex({ "estado": 1 });
db.reportes.createIndex({ "turnoId": 1 });

// ================================
// 4. INSUMOS (MEDICAL SUPPLIES) COLLECTION
// ================================
db.createCollection("insumos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "categoria", "stock", "unidad"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Name of the medical supply"
        },
        categoria: {
          bsonType: "string",
          enum: ["respiratorio", "curacion", "transporte", "farmacia", "equipo_medico", "proteccion", "inmovilizacion"],
          description: "Supply category"
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          description: "Current stock quantity"
        },
        unidad: {
          bsonType: "string",
          enum: ["tanques", "piezas", "dosis", "bolsas", "pares", "equipos"],
          description: "Unit of measurement"
        },
        stockMinimo: {
          bsonType: "int",
          minimum: 0,
          description: "Minimum stock threshold for alerts"
        },
        proveedor: {
          bsonType: "string",
          description: "Supplier information"
        },
        fechaVencimiento: {
          bsonType: "date",
          description: "Expiration date (if applicable)"
        },
        ubicacion: {
          bsonType: "string",
          description: "Storage location"
        },
        isActive: {
          bsonType: "bool",
          description: "Whether the supply is currently active"
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Create indexes for insumos
db.insumos.createIndex({ "nombre": 1 });
db.insumos.createIndex({ "categoria": 1 });
db.insumos.createIndex({ "stock": 1 });

// ================================
// 5. LOGS (AUDIT TRAIL) COLLECTION
// ================================
db.createCollection("logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["accion", "usuario", "usuarioId", "fecha"],
      properties: {
        accion: {
          bsonType: "string",
          enum: ["crear_reporte", "editar_reporte", "eliminar_reporte", "actualizar_stock", "crear_usuario", "editar_usuario", "login", "logout"],
          description: "Action performed"
        },
        usuario: {
          bsonType: "string",
          description: "Full name of user who performed the action"
        },
        usuarioId: {
          bsonType: "string",
          description: "ID of user who performed the action"
        },
        fecha: {
          bsonType: "date",
          description: "Timestamp when action was performed"
        },
        detalle: {
          bsonType: "string",
          description: "Detailed description of the action"
        },
        ip_address: {
          bsonType: "string",
          description: "IP address from where action was performed"
        },
        user_agent: {
          bsonType: "string",
          description: "Browser/client information"
        },
        metadata: {
          bsonType: "object",
          description: "Additional metadata about the action"
        }
      }
    }
  }
});

// Create indexes for logs
db.logs.createIndex({ "fecha": -1 });
db.logs.createIndex({ "usuarioId": 1 });
db.logs.createIndex({ "accion": 1 });

// ================================
// 6. COUNTERS COLLECTION (for auto-incrementing IDs)
// ================================
db.createCollection("counters");
db.counters.insertMany([
  { _id: "reportes", sequence_value: 0 },
  { _id: "users", sequence_value: 0 },
  { _id: "turnos", sequence_value: 0 },
  { _id: "insumos", sequence_value: 0 },
  { _id: "logs", sequence_value: 0 }
]);

// Function to get next sequence number
function getNextSequence(name) {
  var ret = db.counters.findAndModify({
    query: { _id: name },
    update: { $inc: { sequence_value: 1 } },
    new: true
  });
  return ret.sequence_value;
}

console.log("MongoDB collections created successfully!");
console.log("Collections: users, turnos, reportes, insumos, logs, counters");
console.log("All indexes and validation schemas have been applied.");