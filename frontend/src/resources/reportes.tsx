import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  Edit,
  Create,
  Show,
  TabbedShowLayout,
  Tab,
  TextInput,
  TimeInput,
  SelectInput,
  ReferenceInput,
  ReferenceField,
  FormTab,
  TabbedForm,
  ArrayField,
  SingleFieldList,
  ChipField,
  BooleanField,
  usePermissions,
  NumberInput,
  DateTimeInput,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  required,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

const sexoChoices = [
  { id: "masculino", name: "Masculino" },
  { id: "femenino", name: "Femenino" },
];

// Additional choice options for comprehensive form
const lugarOcurrenciaChoices = [
  { id: "hogar", name: "Hogar" },
  { id: "transporte_publico", name: "Transporte Público" },
  { id: "escuela", name: "Escuela" },
  { id: "trabajo", name: "Trabajo" },
  { id: "recreacion_deporte", name: "Recreación/Deporte" },
  { id: "via_publica", name: "Vía Pública" },
  { id: "otro", name: "Otro" },
];

const derechohabienteChoices = [
  { id: "imss", name: "IMSS" },
  { id: "issste", name: "ISSSTE" },
  { id: "privado", name: "Privado" },
  { id: "otro", name: "Otro" },
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

const condicionTrasladoChoices = [
  { id: "critico", name: "Crítico" },
  { id: "no_critico", name: "No Crítico" },
  { id: "estable", name: "Estable" },
  { id: "inestable", name: "Inestable" },
];

// Common styles for form inputs
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
  },
};

export const ReporteList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { permissions } = usePermissions();
  const filter = permissions?.canViewAllReports
    ? {}
    : { colaboradorId: permissions?.userId };

  return (
    <List title="Lista de Reportes" filter={filter}>
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.folio}
          secondaryText={(r) => `${r.fecha} - ${r.nombre_paciente}`}
          tertiaryText={(r) => `${r.origen_probable || "Sin clasificar"}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="folio" label="Folio" />
          <TextField source="fecha" label="Fecha" />
          <TextField source="hora" label="Hora" />
          <TextField source="nombre_paciente" label="Paciente" />
          <TextField source="origen_probable" label="Origen Probable" />
          <TextField source="estado" label="Estado" />
          {permissions?.canEdit && <EditButton label="Editar" />}
        </Datagrid>
      )}
    </List>
  );
};

export const ReporteEdit = () => (
  <Edit title="Editar Reporte">
    <TabbedForm>
      {/* Tab 1: Información General y Ubicación */}
      <FormTab label="General y Ubicación">
        <TextInput disabled source="id" label="ID" />
        <TextInput source="folio" label="Folio" sx={inputStyles} />
        <DateTimeInput source="fecha" label="Fecha" sx={inputStyles} />
        <TimeInput source="hora" label="Hora" sx={inputStyles} />
        <ReferenceInput
          source="colaboradorId"
          reference="users"
          label="Colaborador"
        >
          <SelectInput optionText="username" />
        </ReferenceInput>
        <ReferenceInput source="turnoId" reference="turnos" label="Turno">
          <SelectInput optionText="nombre" />
        </ReferenceInput>

        {/* Datos de la Unidad */}
        <TextInput
          source="numero_ambulancia"
          label="Número de Ambulancia"
          sx={inputStyles}
        />
        <TextInput source="operador" label="Operador" sx={inputStyles} />
        <TextInput source="tum" label="T.U.M." sx={inputStyles} />
        <TextInput source="socorrista" label="Socorrista" sx={inputStyles} />

        {/* Ubicación del Servicio */}
        <TextInput source="calle" label="Calle" sx={inputStyles} />
        <TextInput
          source="entre_calles"
          label="Entre Calles"
          sx={inputStyles}
        />
        <TextInput
          source="colonia_comunidad"
          label="Colonia o Comunidad"
          sx={inputStyles}
        />
        <TextInput
          source="alcaldia_municipio"
          label="Alcaldía o Municipio"
          sx={inputStyles}
        />
        <SelectInput
          source="lugar_ocurrencia"
          label="Lugar de Ocurrencia"
          choices={lugarOcurrenciaChoices}
        />
      </FormTab>

      {/* Tab 2: Paciente y Causa */}
      <FormTab label="Paciente y Causa">
        {/* Datos del Paciente */}
        <TextInput
          source="nombre_paciente"
          label="Nombre del Paciente"
          sx={inputStyles}
        />
        <SelectInput source="sexo" label="Sexo" choices={sexoChoices} />
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
        <TextInput source="domicilio" label="Domicilio" sx={inputStyles} />
        <TextInput source="ocupacion" label="Ocupación" sx={inputStyles} />
        <SelectInput
          source="derechohabiente"
          label="Derechohabiente"
          choices={derechohabienteChoices}
        />

        {/* Causa del Servicio */}
        <SelectInput
          source="origen_probable"
          label="Origen Probable"
          choices={origenProbableChoices}
        />
        <SelectInput
          source="agente_causal"
          label="Agente Causal"
          choices={agenteCausalChoices}
        />
      </FormTab>

      {/* Tab 3: Evaluación Inicial */}
      <FormTab label="Evaluación Inicial">
        {/* Evaluación Primaria */}
        <SelectInput
          source="nivel_consciencia"
          label="Nivel de Consciencia"
          choices={nivelConscienciaChoices}
        />
        <SelectInput
          source="via_aerea"
          label="Vía Aérea"
          choices={viaAereaChoices}
        />
        <SelectInput
          source="ventilacion"
          label="Ventilación"
          choices={ventilacionChoices}
        />

        {/* Glasgow */}
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
        <NumberInput
          source="glasgow_total"
          label="Glasgow Total"
          min={3}
          max={15}
          sx={inputStyles}
        />
      </FormTab>

      {/* Tab 4: Tratamiento y Traslado */}
      <FormTab label="Tratamiento y Traslado">
        {/* Traslado */}
        <SelectInput
          source="condicion_traslado"
          label="Condición del Paciente"
          choices={condicionTrasladoChoices}
        />
        <TextInput
          source="hospital_destino"
          label="Hospital de Destino"
          sx={inputStyles}
        />
        <TextInput
          source="medico_recibe"
          label="Nombre de quien recibe"
          sx={inputStyles}
        />
        <BooleanInput
          source="negativa_traslado"
          label="Negativa a Recibir Atención"
        />

        {/* Observaciones */}
        <TextInput
          source="observaciones"
          label="Observaciones"
          multiline
          rows={4}
          sx={inputStyles}
        />

        {/* Estado del Reporte */}
        <TextInput
          source="estado"
          label="Estado del Reporte"
          sx={inputStyles}
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ReporteCreate = () => (
  <Create
    title="Crear Reporte"
    transform={(data) => {
      // Auto-assign current user as colaborador
      const userId = localStorage.getItem("userId");
      const userFullName = localStorage.getItem("userFullName");

      return {
        ...data,
        colaboradorId: userId,
        colaboradorNombre: userFullName,
        estado: "borrador", // Default state
      };
    }}
  >
    <TabbedForm>
      {/* Tab 1: Información General y Ubicación */}
      <FormTab label="General y Ubicación">
        <TextInput
          source="folio"
          label="Folio"
          validate={required()}
          sx={inputStyles}
        />
        <DateTimeInput
          source="fecha"
          label="Fecha"
          validate={required()}
          sx={inputStyles}
        />
        <TimeInput
          source="hora"
          label="Hora"
          validate={required()}
          sx={inputStyles}
        />
        <ReferenceInput source="turnoId" reference="turnos" label="Turno">
          <SelectInput optionText="nombre" />
        </ReferenceInput>

        {/* Datos de la Unidad */}
        <TextInput
          source="numero_ambulancia"
          label="Número de Ambulancia"
          validate={required()}
          sx={inputStyles}
        />
        <TextInput
          source="operador"
          label="Operador"
          validate={required()}
          sx={inputStyles}
        />
        <TextInput source="tum" label="T.U.M." sx={inputStyles} />
        <TextInput source="socorrista" label="Socorrista" sx={inputStyles} />

        {/* Cronometría */}
        <DateTimeInput
          source="hora_llamada"
          label="Hora de Llamada"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_base"
          label="Hora Salida de Base"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_servicio"
          label="Hora Llegada al Servicio"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_servicio"
          label="Hora Salida del Servicio"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_hospital"
          label="Hora Llegada al Hospital"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_salida_hospital"
          label="Hora Salida del Hospital"
          sx={inputStyles}
        />
        <DateTimeInput
          source="hora_llegada_base"
          label="Hora Llegada a Base"
          sx={inputStyles}
        />

        {/* Ubicación del Servicio */}
        <TextInput source="calle" label="Calle" sx={inputStyles} />
        <TextInput
          source="entre_calles"
          label="Entre Calles"
          sx={inputStyles}
        />
        <TextInput
          source="colonia_comunidad"
          label="Colonia o Comunidad"
          sx={inputStyles}
        />
        <TextInput
          source="alcaldia_municipio"
          label="Alcaldía o Municipio"
          sx={inputStyles}
        />
        <SelectInput
          source="lugar_ocurrencia"
          label="Lugar de Ocurrencia"
          choices={lugarOcurrenciaChoices}
        />
      </FormTab>

      {/* Tab 2: Paciente y Causa */}
      <FormTab label="Paciente y Causa">
        {/* Datos del Paciente */}
        <TextInput
          source="nombre_paciente"
          label="Nombre del Paciente"
          validate={required()}
          sx={inputStyles}
        />
        <SelectInput
          source="sexo"
          label="Sexo"
          choices={sexoChoices}
          validate={required()}
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
        <TextInput source="domicilio" label="Domicilio" sx={inputStyles} />
        <TextInput source="ocupacion" label="Ocupación" sx={inputStyles} />
        <SelectInput
          source="derechohabiente"
          label="Derechohabiente"
          choices={derechohabienteChoices}
        />

        {/* Causa del Servicio */}
        <SelectInput
          source="origen_probable"
          label="Origen Probable"
          choices={origenProbableChoices}
          validate={required()}
        />
        <SelectInput
          source="agente_causal"
          label="Agente Causal"
          choices={agenteCausalChoices}
        />
      </FormTab>

      {/* Tab 3: Evaluación Inicial */}
      <FormTab label="Evaluación Inicial">
        {/* Evaluación Primaria */}
        <SelectInput
          source="nivel_consciencia"
          label="Nivel de Consciencia"
          choices={nivelConscienciaChoices}
        />
        <SelectInput
          source="via_aerea"
          label="Vía Aérea"
          choices={viaAereaChoices}
        />
        <SelectInput
          source="ventilacion"
          label="Ventilación"
          choices={ventilacionChoices}
        />

        {/* Glasgow */}
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
        <NumberInput
          source="glasgow_total"
          label="Glasgow Total"
          min={3}
          max={15}
          sx={inputStyles}
        />

        {/* Signos Vitales */}
        <ArrayInput source="signos_vitales" label="Signos Vitales">
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
        {/* Medicamentos */}
        <ArrayInput source="medicamentos" label="Medicamentos">
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
        />
        <TextInput
          source="hospital_destino"
          label="Hospital de Destino"
          sx={inputStyles}
        />
        <TextInput
          source="medico_recibe"
          label="Nombre de quien recibe"
          sx={inputStyles}
        />
        <BooleanInput
          source="negativa_traslado"
          label="Negativa a Recibir Atención"
        />

        {/* Observaciones */}
        <TextInput
          source="observaciones"
          label="Observaciones"
          multiline
          rows={4}
          sx={inputStyles}
        />
      </FormTab>
    </TabbedForm>
  </Create>
);

export const ReporteShow = () => (
  <Show title="Detalles del Reporte">
    <TabbedShowLayout>
      {/* Tab 1: Información General y Ubicación */}
      <Tab label="General y Ubicación">
        <TextField source="id" label="ID" />
        <TextField source="folio" label="Folio" />
        <TextField source="fecha" label="Fecha" />
        <TextField source="hora" label="Hora" />
        <ReferenceField
          source="colaboradorId"
          reference="users"
          label="Colaborador"
        >
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField source="turnoId" reference="turnos" label="Turno">
          <TextField source="nombre" />
        </ReferenceField>

        {/* Datos de la Unidad */}
        <TextField source="numero_ambulancia" label="Número de Ambulancia" />
        <TextField source="operador" label="Operador" />
        <TextField source="tum" label="T.U.M." />
        <TextField source="socorrista" label="Socorrista" />

        {/* Cronometría */}
        <TextField source="hora_llamada" label="Hora de Llamada" />
        <TextField source="hora_salida_base" label="Hora Salida de Base" />
        <TextField
          source="hora_llegada_servicio"
          label="Hora Llegada al Servicio"
        />
        <TextField
          source="hora_salida_servicio"
          label="Hora Salida del Servicio"
        />
        <TextField
          source="hora_llegada_hospital"
          label="Hora Llegada al Hospital"
        />
        <TextField
          source="hora_salida_hospital"
          label="Hora Salida del Hospital"
        />
        <TextField source="hora_llegada_base" label="Hora Llegada a Base" />

        {/* Ubicación del Servicio */}
        <TextField source="calle" label="Calle" />
        <TextField source="entre_calles" label="Entre Calles" />
        <TextField source="colonia_comunidad" label="Colonia o Comunidad" />
        <TextField source="alcaldia_municipio" label="Alcaldía o Municipio" />
        <TextField source="lugar_ocurrencia" label="Lugar de Ocurrencia" />
      </Tab>

      {/* Tab 2: Paciente y Causa */}
      <Tab label="Paciente y Causa">
        {/* Datos del Paciente */}
        <TextField source="nombre_paciente" label="Nombre del Paciente" />
        <TextField source="sexo" label="Sexo" />
        <TextField source="edad_anios" label="Edad en Años" />
        <TextField source="edad_meses" label="Edad en Meses" />
        <TextField source="domicilio" label="Domicilio" />
        <TextField source="ocupacion" label="Ocupación" />
        <TextField source="derechohabiente" label="Derechohabiente" />

        {/* Causa del Servicio */}
        <TextField source="origen_probable" label="Origen Probable" />
        <TextField source="agente_causal" label="Agente Causal" />

        {/* Accidente Automovilístico */}
        <TextField source="tipo_accidente_auto" label="Tipo de Accidente" />
        <ArrayField
          source="vehiculos_involucrados"
          label="Vehículos Involucrados"
        >
          <SingleFieldList>
            <ChipField source="." />
          </SingleFieldList>
        </ArrayField>
        <TextField source="cinturon_seguridad" label="Cinturón de Seguridad" />
        <BooleanField source="paciente_eyectado" label="Paciente Eyectado" />
      </Tab>

      {/* Tab 3: Evaluación Inicial */}
      <Tab label="Evaluación Inicial">
        {/* Evaluación Primaria */}
        <TextField source="nivel_consciencia" label="Nivel de Consciencia" />
        <TextField source="via_aerea" label="Vía Aérea" />
        <TextField source="ventilacion" label="Ventilación" />
        <TextField source="pulsos" label="Presencia de Pulsos" />

        {/* Piel y Glasgow */}
        <TextField source="condicion_piel" label="Condición de la Piel" />
        <TextField source="glasgow_ocular" label="Apertura Ocular (Glasgow)" />
        <TextField source="glasgow_verbal" label="Respuesta Verbal (Glasgow)" />
        <TextField source="glasgow_motora" label="Respuesta Motora (Glasgow)" />
        <TextField source="glasgow_total" label="Glasgow Total" />

        {/* Signos Vitales */}
        <ArrayField source="signos_vitales" label="Signos Vitales">
          <Datagrid>
            <TextField source="hora_lectura" label="Hora" />
            <TextField source="tas" label="TAS" />
            <TextField source="tad" label="TAD" />
            <TextField source="frecuencia_cardiaca" label="FC" />
            <TextField source="frecuencia_respiratoria" label="FR" />
            <TextField source="saturacion_oxigeno" label="SpO2" />
            <TextField source="temperatura" label="Temp" />
            <TextField source="glucosa" label="Gluc" />
          </Datagrid>
        </ArrayField>
      </Tab>

      {/* Tab 4: Tratamiento y Traslado */}
      <Tab label="Tratamiento y Traslado">
        {/* Procedimientos y Tratamiento */}
        <ArrayField source="manejo_via_aerea" label="Manejo Vía Aérea">
          <SingleFieldList>
            <ChipField source="." />
          </SingleFieldList>
        </ArrayField>
        <ArrayField
          source="asistencia_ventilatoria"
          label="Asistencia Ventilatoria"
        >
          <SingleFieldList>
            <ChipField source="." />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="control_hemorragias" label="Control de Hemorragias">
          <SingleFieldList>
            <ChipField source="." />
          </SingleFieldList>
        </ArrayField>

        {/* Medicamentos */}
        <ArrayField source="medicamentos" label="Medicamentos Administrados">
          <Datagrid>
            <TextField source="hora" label="Hora" />
            <TextField source="medicamento" label="Medicamento" />
            <TextField source="dosis" label="Dosis" />
            <TextField source="via_administracion" label="Vía" />
          </Datagrid>
        </ArrayField>

        {/* Traslado */}
        <TextField source="condicion_traslado" label="Condición del Paciente" />
        <TextField source="hospital_destino" label="Hospital de Destino" />
        <TextField source="medico_recibe" label="Nombre de quien recibe" />
        <BooleanField
          source="negativa_traslado"
          label="Negativa a Recibir Atención"
        />

        {/* Observaciones */}
        <TextField source="observaciones" label="Observaciones Adicionales" />

        {/* Estado del Reporte */}
        <TextField source="estado" label="Estado del Reporte" />
      </Tab>

      {/* Tab 5: Insumos y Auditoría */}
      <Tab label="Insumos y Auditoría">
        <ArrayField source="insumos" label="Insumos Utilizados">
          <Datagrid>
            <TextField source="nombre" label="Insumo" />
            <TextField source="cantidad" label="Cantidad" />
          </Datagrid>
        </ArrayField>

        <TextField source="createdAt" label="Fecha de Creación" />
        <TextField source="updatedAt" label="Última Modificación" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
