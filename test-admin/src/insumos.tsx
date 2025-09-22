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
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const InsumoList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List title="Lista de Insumos">
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.nombre}
          secondaryText={(r) => `ID: ${r.id}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="nombre" label="Nombre del Insumo" />
          <EditButton label="Editar" />
        </Datagrid>
      )}
    </List>
  );
};

export const InsumoEdit = () => (
  <Edit title="Editar Insumo">
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <TextInput source="nombre" label="Nombre del Insumo" />
    </SimpleForm>
  </Edit>
);

export const InsumoCreate = () => (
  <Create title="Crear Insumo">
    <SimpleForm>
      <TextInput source="nombre" label="Nombre del Insumo" />
    </SimpleForm>
  </Create>
);

export const InsumoShow = () => (
  <Show title="Detalles del Insumo">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="nombre" label="Nombre del Insumo" />
    </SimpleShowLayout>
  </Show>
);
