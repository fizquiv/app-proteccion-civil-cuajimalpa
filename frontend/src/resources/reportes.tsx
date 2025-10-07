import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  Edit,
  Create,
  Show,
  SimpleShowLayout,
  TextInput,
  DateInput,
  TimeInput,
  SelectInput,
  ReferenceInput,
  FormTab,
  TabbedForm,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

const sexoChoices = [
  { id: "masculino", name: "Masculino" },
  { id: "femenino", name: "Femenino" },
];

const tipoEmergenciaChoices = [
  { id: "accidente vial", name: "Accidente Vial" },
  { id: "infarto", name: "Infarto" },
  { id: "fractura", name: "Fractura" },
  { id: "quemadura", name: "Quemadura" },
  { id: "otros", name: "Otros" },
];

const gravedadChoices = [
  { id: "baja", name: "Baja" },
  { id: "media", name: "Media" },
  { id: "alta", name: "Alta" },
  { id: "critica", name: "Crítica" },
];

export const ReporteList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List title="Lista de Reportes">
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.folio}
          secondaryText={(r) => `${r.fecha} - ${r.paciente?.nombre}`}
          tertiaryText={(r) => `Gravedad: ${r.gravedad}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="folio" label="Folio" />
          <TextField source="fecha" label="Fecha" />
          <TextField source="hora" label="Hora" />
          <TextField source="paciente.nombre" label="Paciente" />
          <TextField source="tipoEmergencia" label="Tipo de Emergencia" />
          <TextField source="gravedad" label="Gravedad" />
          <EditButton label="Editar" />
        </Datagrid>
      )}
    </List>
  );
};

export const ReporteEdit = () => (
  <Edit title="Editar Reporte">
    <TabbedForm>
      <FormTab label="Información General">
        <TextInput disabled source="id" label="ID" />
        <TextInput source="folio" label="Folio" />
        <DateInput source="fecha" label="Fecha" />
        <TimeInput source="hora" label="Hora" />
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
      </FormTab>
      <FormTab label="Paciente">
        <TextInput source="paciente.nombre" label="Nombre del Paciente" />
        <SelectInput
          source="paciente.sexo"
          label="Sexo"
          choices={sexoChoices}
        />
        <TextInput source="paciente.edad" label="Edad" type="number" />
      </FormTab>
      <FormTab label="Emergencia">
        <SelectInput
          source="tipoEmergencia"
          label="Tipo de Emergencia"
          choices={tipoEmergenciaChoices}
        />
        <SelectInput
          source="gravedad"
          label="Gravedad"
          choices={gravedadChoices}
        />
        <TextInput source="ubicacion" label="Ubicación" multiline />
      </FormTab>
      <FormTab label="Ambulancia">
        <TextInput source="ambulancia.numero" label="Número de Ambulancia" />
        <TextInput source="ambulancia.operador" label="Operador" />
      </FormTab>
      <FormTab label="Observaciones">
        <TextInput source="observaciones" label="Observaciones" multiline />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ReporteCreate = () => (
  <Create title="Crear Reporte">
    <TabbedForm>
      <FormTab label="Información General">
        <TextInput source="folio" label="Folio" />
        <DateInput source="fecha" label="Fecha" />
        <TimeInput source="hora" label="Hora" />
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
      </FormTab>
      <FormTab label="Paciente">
        <TextInput source="paciente.nombre" label="Nombre del Paciente" />
        <SelectInput
          source="paciente.sexo"
          label="Sexo"
          choices={sexoChoices}
        />
        <TextInput source="paciente.edad" label="Edad" type="number" />
      </FormTab>
      <FormTab label="Emergencia">
        <SelectInput
          source="tipoEmergencia"
          label="Tipo de Emergencia"
          choices={tipoEmergenciaChoices}
        />
        <SelectInput
          source="gravedad"
          label="Gravedad"
          choices={gravedadChoices}
        />
        <TextInput source="ubicacion" label="Ubicación" multiline />
      </FormTab>
      <FormTab label="Ambulancia">
        <TextInput source="ambulancia.numero" label="Número de Ambulancia" />
        <TextInput source="ambulancia.operador" label="Operador" />
      </FormTab>
      <FormTab label="Observaciones">
        <TextInput source="observaciones" label="Observaciones" multiline />
      </FormTab>
    </TabbedForm>
  </Create>
);

export const ReporteShow = () => (
  <Show title="Detalles del Reporte">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="folio" label="Folio" />
      <TextField source="fecha" label="Fecha" />
      <TextField source="hora" label="Hora" />
      <TextField source="colaboradorId" label="Colaborador ID" />
      <TextField source="turnoId" label="Turno ID" />
      <TextField source="paciente.nombre" label="Nombre del Paciente" />
      <TextField source="paciente.sexo" label="Sexo" />
      <TextField source="paciente.edad" label="Edad" />
      <TextField source="tipoEmergencia" label="Tipo de Emergencia" />
      <TextField source="gravedad" label="Gravedad" />
      <TextField source="ubicacion" label="Ubicación" />
      <TextField source="ambulancia.numero" label="Número de Ambulancia" />
      <TextField source="ambulancia.operador" label="Operador" />
      <ArrayField source="insumos" label="Insumos Utilizados">
        <SingleFieldList>
          <ChipField source="nombre" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="observaciones" label="Observaciones" />
    </SimpleShowLayout>
  </Show>
);
