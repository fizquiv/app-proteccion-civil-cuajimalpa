import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  NumberInput,
  SelectInput,
  DateTimeInput,
  TimeInput,
  CheckboxGroupInput,
  ArrayInput,
  SimpleFormIterator,
  RadioButtonGroupInput,
  BooleanInput,
  required,
  useRecordContext,
} from "react-admin";

const lugarOcurrenciaChoices = [
  { id: "hogar", name: "Hogar" },
  { id: "transporte_publico", name: "Transporte Público" },
  { id: "escuela", name: "Escuela" },
  { id: "trabajo", name: "Trabajo" },
  { id: "recreacion_deporte", name: "Recreación/Deporte" },
  { id: "via_publica", name: "Vía Pública" },
  { id: "otro", name: "Otro" },
];

const sexoChoices = [
  { id: "masculino", name: "Masculino" },
  { id: "femenino", name: "Femenino" },
];

const derechohabienteChoices = [
  { id: "imss", name: "IMSS" },
  { id: "issste", name: "ISSSTE" },
  { id: "privado", name: "Privado" },
  { id: "otro", name: "Otro" },
];

const tipoEmergenciaChoices = [
  { id: "accidente vial", name: "Accidente Vial" },
  { id: "quemadura", name: "Quemadura" },
  { id: "paro cardiorrespiratorio", name: "Paro Cardiorrespiratorio" },
  { id: "enfermedad súbita", name: "Enfermedad Súbita" },
  { id: "traslado", name: "Traslado" },
  { id: "incendio", name: "Incendio" },
  { id: "fractura", name: "Fractura" },
  { id: "otros", name: "Otros" },
];

const gravedadChoices = [
  { id: "baja", name: "Baja" },
  { id: "media", name: "Media" },
  { id: "alta", name: "Alta" },
  { id: "critica", name: "Crítica" },
];

const origenProbableChoices = [
  { id: "neurologica", name: "Neurológica" },
  { id: "infecciosa", name: "Infecciosa" },
  { id: "musculo_esqueletico", name: "Músculo-Esquelético" },
  { id: "cardiovascular", name: "Cardiovascular" },
  { id: "digestiva", name: "Digestiva" },
  { id: "metabolica", name: "Metabólica" },
  { id: "respiratoria", name: "Respiratoria" },
  { id: "ginecoobstetrica", name: "Ginecoobstétrica" },
  { id: "cognitivo_emocional", name: "Cognitivo-Emocional" },
  { id: "otro", name: "Otro" },
];

const agenteCausalChoices = [
  { id: "arma", name: "Arma" },
  { id: "juguete", name: "Juguete" },
  { id: "caida", name: "Caída" },
  { id: "animal", name: "Animal" },
  { id: "automotor", name: "Automotor" },
  { id: "sustancia_caliente", name: "Sustancia Caliente" },
  { id: "sustancia_toxica", name: "Sustancia Tóxica" },
  { id: "producto_biologico", name: "Producto Biológico" },
  { id: "ser_humano", name: "Ser Humano" },
  { id: "otro", name: "Otro" },
];

const tipoAccidenteAutoChoices = [
  { id: "colision", name: "Colisión" },
  { id: "volcadura", name: "Volcadura" },
  { id: "atropellado", name: "Atropellado" },
  { id: "contra_objeto_fijo", name: "Contra Objeto Fijo" },
];

const vehiculosInvolucradosChoices = [
  { id: "automotor", name: "Automotor" },
  { id: "motocicleta", name: "Motocicleta" },
  { id: "bicicleta", name: "Bicicleta" },
  { id: "maquinaria", name: "Maquinaria" },
];

const cinturonSeguridadChoices = [
  { id: "colocado", name: "Colocado" },
  { id: "no_colocado", name: "No Colocado" },
];

const nivelConscienciaChoices = [
  { id: "alerta", name: "Alerta" },
  { id: "respuesta_verbal", name: "Respuesta Verbal" },
  { id: "respuesta_dolor", name: "Respuesta al Dolor" },
  { id: "inconsciente", name: "Inconsciente" },
];

const viaAereaChoices = [
  { id: "permeable", name: "Permeable" },
  { id: "comprometida", name: "Comprometida" },
];

const ventilacionChoices = [
  { id: "automatismo_regular", name: "Automatismo Regular" },
  { id: "automatismo_irregular", name: "Automatismo Irregular" },
  { id: "rapida", name: "Rápida" },
  { id: "superficial", name: "Superficial" },
  { id: "apnea", name: "Apnea" },
];

const pulsosChoices = [
  { id: "carotideo", name: "Carotídeo" },
  { id: "radial", name: "Radial" },
  { id: "paro_cardiorrespiratorio", name: "Paro Cardiorrespiratorio" },
];

const condicionPielChoices = [
  { id: "normal", name: "Normal" },
  { id: "palida", name: "Pálida" },
  { id: "cianotica", name: "Cianótica" },
  { id: "fria", name: "Fría" },
  { id: "caliente", name: "Caliente" },
  { id: "diaforetica", name: "Diaforética" },
];

const manejoViaAereaChoices = [
  { id: "aspiracion", name: "Aspiración" },
  { id: "canula_orofaringea", name: "Cánula Orofaríngea" },
  { id: "intubacion_orotraqueal", name: "Intubación Orotraqueal" },
  { id: "otro", name: "Otro" },
];

const asistenciaVentilatoriaChoices = [
  { id: "puntas_nasales", name: "Puntas Nasales" },
  { id: "mascarilla_simple", name: "Mascarilla Simple" },
  { id: "balon_valvula_mascarilla", name: "Balón Válvula Mascarilla" },
];

const controlHemorragiasChoices = [
  { id: "presion_directa", name: "Presión Directa" },
  { id: "vendaje_compresivo", name: "Vendaje Compresivo" },
  { id: "torniquete", name: "Torniquete" },
];

const condicionTrasladoChoices = [
  { id: "critico", name: "Crítico" },
  { id: "no_critico", name: "No Crítico" },
  { id: "estable", name: "Estable" },
  { id: "inestable", name: "Inestable" },
];

// Common styles for all form inputs to ensure visibility
const inputStyles = {
  "& .MuiInputBase-input": {
    color: "#1f2937 !important",
    backgroundColor: "#ffffff !important",
  },
  "& .MuiInputLabel-root": {
    color: "#1f2937 !important",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff !important",
    "& fieldset": {
      borderColor: "#d1d5db !important",
    },
    "&:hover fieldset": {
      borderColor: "#9ca3af !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6 !important",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#6b7280 !important",
  },
};

const selectStyles = {
  ...inputStyles,
  "& .MuiSelect-select": {
    color: "#1f2937 !important",
    backgroundColor: "#ffffff !important",
  },
  "& .MuiMenuItem-root": {
    color: "#1f2937 !important",
  },
};

const checkboxStyles = {
  "& .MuiFormControlLabel-label": {
    color: "#1f2937 !important",
  },
  "& .MuiCheckbox-root": {
    color: "#3b82f6 !important",
  },
};

// Component to calculate Glasgow total automatically
const GlasgowCalculator = () => {
  const record = useRecordContext();
  const total =
    (record?.glasgow_ocular || 0) +
    (record?.glasgow_verbal || 0) +
    (record?.glasgow_motora || 0);

  return (
    <NumberInput
      source="glasgow_total"
      label="Glasgow Total"
      defaultValue={total}
      helperText={`Calculado automáticamente: ${total}`}
      sx={inputStyles}
    />
  );
};

export const ReporteCreateAdvanced = () => (
  <Create title="Crear Reporte Completo">
    <TabbedForm
    //
    >
      {/* Tab 1: Información Básica */}
      <FormTab label="Información Básica" sx={{ color: "#1f2937 !important" }}>
        {/* Datos Básicos del Reporte */}
        <TextInput
          source="folio"
          label="Folio"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="fecha"
          label="Fecha del Reporte"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />
        <TimeInput
          source="hora"
          label="Hora del Reporte"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />

        {/* Datos de la Unidad */}
        <TextInput
          source="ambulancia.numero"
          label="Número de Ambulancia"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />
        <TextInput
          source="ambulancia.operador"
          label="Operador"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />
        <TextInput source="tum" label="T.U.M." fullWidth sx={inputStyles} />
        <TextInput
          source="socorrista"
          label="Socorrista"
          fullWidth
          sx={inputStyles}
        />

        {/* Tipo de Emergencia y Gravedad */}
        <SelectInput
          source="tipoEmergencia"
          label="Tipo de Emergencia"
          choices={tipoEmergenciaChoices}
          validate={required()}
          fullWidth
          sx={selectStyles}
        />
        <SelectInput
          source="gravedad"
          label="Gravedad"
          choices={gravedadChoices}
          validate={required()}
          fullWidth
          sx={selectStyles}
        />
        <TextInput
          source="ubicacion"
          label="Ubicación del Servicio"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />

        {/* Cronometría */}
        <DateTimeInput
          source="hora_llamada"
          label="Hora de Llamada"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_base"
          label="Hora Salida de Base"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_servicio"
          label="Hora Llegada al Servicio"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_servicio"
          label="Hora Salida del Servicio / Traslado"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_hospital"
          label="Hora Llegada al Hospital"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_hospital"
          label="Hora Salida del Hospital"
          fullWidth
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_base"
          label="Hora Llegada a Base"
          fullWidth
          sx={inputStyles}
        />

        {/* Ubicación del Servicio */}
        <TextInput source="calle" label="Calle" fullWidth sx={inputStyles} />
        <TextInput
          source="entre_calles"
          label="Entre Calles"
          fullWidth
          sx={inputStyles}
        />
        <TextInput
          source="colonia_comunidad"
          label="Colonia o Comunidad"
          fullWidth
          sx={inputStyles}
        />
        <TextInput
          source="alcaldia_municipio"
          label="Alcaldía o Municipio"
          fullWidth
          sx={inputStyles}
        />
        <SelectInput
          source="lugar_ocurrencia"
          label="Lugar de Ocurrencia"
          choices={lugarOcurrenciaChoices}
          fullWidth
          sx={selectStyles}
        />
      </FormTab>

      {/* Tab 2: Paciente y Causa */}
      <FormTab label="Paciente y Causa">
        {/* Datos del Paciente */}
        <TextInput
          source="nombre_paciente"
          label="Nombre del Paciente"
          validate={required()}
          fullWidth
          sx={inputStyles}
        />
        <RadioButtonGroupInput
          source="sexo"
          label="Sexo"
          choices={sexoChoices}
          sx={checkboxStyles}
        />
        <NumberInput
          source="edad_anios"
          label="Edad en Años"
          sx={inputStyles}
        />
        <NumberInput
          source="edad_meses"
          label="Edad en Meses"
          sx={inputStyles}
        />
        <TextInput
          source="domicilio"
          label="Domicilio"
          fullWidth
          sx={inputStyles}
        />
        <TextInput
          source="ocupacion"
          label="Ocupación"
          fullWidth
          sx={inputStyles}
        />
        <SelectInput
          source="derechohabiente"
          label="Derechohabiente"
          choices={derechohabienteChoices}
          fullWidth
          sx={selectStyles}
        />

        {/* Causa del Servicio */}
        <SelectInput
          source="origen_probable"
          label="Origen Probable"
          choices={origenProbableChoices}
          fullWidth
          sx={selectStyles}
        />
        <SelectInput
          source="agente_causal"
          label="Agente Causal"
          choices={agenteCausalChoices}
          fullWidth
          sx={selectStyles}
        />

        {/* Accidente Automovilístico */}
        <SelectInput
          source="tipo_accidente_auto"
          label="Tipo de Accidente"
          choices={tipoAccidenteAutoChoices}
          fullWidth
          sx={selectStyles}
        />
        <CheckboxGroupInput
          source="vehiculos_involucrados"
          label="Vehículos Involucrados"
          choices={vehiculosInvolucradosChoices}
          sx={checkboxStyles}
        />
        <RadioButtonGroupInput
          source="cinturon_seguridad"
          label="Cinturón de Seguridad"
          choices={cinturonSeguridadChoices}
          sx={checkboxStyles}
        />
        <BooleanInput
          source="paciente_eyectado"
          label="Paciente Eyectado"
          sx={checkboxStyles}
        />
      </FormTab>

      {/* Tab 3: Evaluación Inicial */}
      <FormTab label="Evaluación Inicial">
        {/* Evaluación Primaria */}
        <SelectInput
          source="nivel_consciencia"
          label="Nivel de Consciencia"
          choices={nivelConscienciaChoices}
          fullWidth
          sx={selectStyles}
        />
        <RadioButtonGroupInput
          source="via_aerea"
          label="Vía Aérea"
          choices={viaAereaChoices}
          sx={checkboxStyles}
        />
        <SelectInput
          source="ventilacion"
          label="Ventilación"
          choices={ventilacionChoices}
          fullWidth
          sx={selectStyles}
        />
        <SelectInput
          source="pulsos"
          label="Presencia de Pulsos"
          choices={pulsosChoices}
          fullWidth
          sx={selectStyles}
        />

        {/* Piel y Glasgow */}
        <SelectInput
          source="condicion_piel"
          label="Condición de la Piel"
          choices={condicionPielChoices}
          fullWidth
          sx={selectStyles}
        />
        <NumberInput
          source="glasgow_ocular"
          label="Apertura Ocular (Glasgow)"
          min={1}
          max={4}
          sx={inputStyles}
        />
        <NumberInput
          source="glasgow_verbal"
          label="Respuesta Verbal (Glasgow)"
          min={1}
          max={5}
          sx={inputStyles}
        />
        <NumberInput
          source="glasgow_motora"
          label="Respuesta Motora (Glasgow)"
          min={1}
          max={6}
          sx={inputStyles}
        />
        <GlasgowCalculator />

        {/* Signos Vitales */}
        <ArrayInput
          source="signos_vitales"
          label="Signos Vitales"
          sx={{
            "& .MuiFormLabel-root": { color: "#1f2937 !important" },
          }}
        >
          <SimpleFormIterator inline>
            <DateTimeInput
              source="hora_lectura"
              label="Hora"
              sx={inputStyles}
            />
            <TextInput source="tas" label="TAS" sx={inputStyles} />
            <TextInput source="tad" label="TAD" sx={inputStyles} />
            <NumberInput
              source="frecuencia_cardiaca"
              label="FC"
              sx={inputStyles}
            />
            <NumberInput
              source="frecuencia_respiratoria"
              label="FR"
              sx={inputStyles}
            />
            <NumberInput
              source="saturacion_oxigeno"
              label="SpO2"
              min={0}
              max={100}
              sx={inputStyles}
            />
            <NumberInput source="temperatura" label="Temp" sx={inputStyles} />
            <NumberInput source="glucosa" label="Gluc" sx={inputStyles} />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* Tab 4: Tratamiento y Traslado */}
      <FormTab label="Tratamiento y Traslado">
        {/* Procedimientos y Tratamiento */}
        <CheckboxGroupInput
          source="manejo_via_aerea"
          label="Manejo Vía Aérea"
          choices={manejoViaAereaChoices}
          sx={checkboxStyles}
        />
        <CheckboxGroupInput
          source="asistencia_ventilatoria"
          label="Asistencia Ventilatoria"
          choices={asistenciaVentilatoriaChoices}
          sx={checkboxStyles}
        />
        <CheckboxGroupInput
          source="control_hemorragias"
          label="Control de Hemorragias"
          choices={controlHemorragiasChoices}
          sx={checkboxStyles}
        />

        {/* Medicamentos */}
        <ArrayInput
          source="medicamentos"
          label="Medicamentos"
          sx={{
            "& .MuiFormLabel-root": { color: "#1f2937 !important" },
          }}
        >
          <SimpleFormIterator inline>
            <DateTimeInput source="hora" label="Hora" sx={inputStyles} />
            <TextInput
              source="medicamento"
              label="Medicamento"
              sx={inputStyles}
            />
            <TextInput source="dosis" label="Dosis" sx={inputStyles} />
            <TextInput
              source="via_administracion"
              label="Vía"
              sx={inputStyles}
            />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Traslado */}
        <SelectInput
          source="condicion_traslado"
          label="Condición del Paciente"
          choices={condicionTrasladoChoices}
          fullWidth
          sx={selectStyles}
        />
        <TextInput
          source="hospital_destino"
          label="Hospital de Destino"
          fullWidth
          sx={inputStyles}
        />
        <TextInput
          source="medico_recibe"
          label="Nombre de quien recibe"
          fullWidth
          sx={inputStyles}
        />
        <BooleanInput
          source="negativa_traslado"
          label="Negativa a Recibir Atención / Ser Trasladado"
          sx={checkboxStyles}
        />

        {/* Observaciones */}
        <TextInput
          source="observaciones"
          label="Observaciones Adicionales"
          multiline
          rows={4}
          fullWidth
          sx={inputStyles}
        />
      </FormTab>
    </TabbedForm>
  </Create>
);

export default ReporteCreateAdvanced;
