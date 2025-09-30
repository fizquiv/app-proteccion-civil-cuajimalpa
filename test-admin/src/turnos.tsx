import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  Edit,
  Create,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const TurnoList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List title="Lista de Turnos">
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.nombre}
          secondaryText={(r) => `ID: ${r.id}`}
          tertiaryText={(r) => `Colaboradores: ${r.colaboradores?.length || 0}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="nombre" label="Nombre del Turno" />
          <ReferenceArrayField
            source="colaboradores"
            reference="users"
            label="Colaboradores"
          >
            <SingleFieldList>
              <ChipField source="username" />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton label="Editar" />
        </Datagrid>
      )}
    </List>
  );
};

export const TurnoEdit = () => (
  <Edit title="Editar Turno">
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <TextInput source="nombre" label="Nombre del Turno" />
      <TextInput
        source="colaboradores"
        label="Colaboradores (IDs separados por coma)"
        parse={(value) =>
          value ? value.split(",").map((id: string) => parseInt(id.trim())) : []
        }
        format={(value) => (value ? value.join(", ") : "")}
      />
    </SimpleForm>
  </Edit>
);

export const TurnoCreate = () => (
  <Create title="Crear Turno">
    <SimpleForm>
      <TextInput source="nombre" label="Nombre del Turno" />
      <TextInput
        source="colaboradores"
        label="Colaboradores (IDs separados por coma)"
        parse={(value) =>
          value ? value.split(",").map((id: string) => parseInt(id.trim())) : []
        }
        format={(value) => (value ? value.join(", ") : "")}
      />
    </SimpleForm>
  </Create>
);

export const TurnoShow = () => (
  <Show title="Detalles del Turno">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="nombre" label="Nombre del Turno" />
      <ReferenceArrayField
        source="colaboradores"
        reference="users"
        label="Colaboradores"
      >
        <SingleFieldList>
          <ChipField source="username" />
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);
