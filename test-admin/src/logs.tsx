import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  Show,
  SimpleShowLayout,
  DateField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const LogList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List title="Lista de Logs del Sistema">
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.accion}
          secondaryText={(r) => `Usuario: ${r.usuario}`}
          tertiaryText={(r) => r.fecha}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="accion" label="Acción" />
          <TextField source="usuario" label="Usuario" />
          <DateField source="fecha" label="Fecha" showTime />
          <TextField source="detalle" label="Detalle" />
        </Datagrid>
      )}
    </List>
  );
};

export const LogShow = () => (
  <Show title="Detalles del Log">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="accion" label="Acción" />
      <TextField source="usuario" label="Usuario" />
      <DateField source="fecha" label="Fecha" showTime />
      <TextField source="detalle" label="Detalle" />
    </SimpleShowLayout>
  </Show>
);
