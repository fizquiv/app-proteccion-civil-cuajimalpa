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
  PasswordInput,
  SelectInput,
  ReferenceInput,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

const roleChoices = [
  { id: "colaborador", name: "Colaborador" },
  { id: "jefe_turno", name: "Jefe de Turno" },
  { id: "administrador", name: "Administrador" },
];

export const UserList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List title="Lista de Usuarios">
      {isSmall ? (
        <SimpleList
          primaryText={(r) => r.fullName || r.username}
          secondaryText={(r) => r.username}
          tertiaryText={(r) => `Rol: ${r.role}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="fullName" label="Nombre Completo" />
          <TextField source="username" label="Usuario" />
          <TextField source="role" label="Rol" />
          <TextField source="turnoId" label="Turno ID" />
          <EditButton label="Editar" />
        </Datagrid>
      )}
    </List>
  );
};

export const UserEdit = () => (
  <Edit title="Editar Usuario">
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <TextInput source="fullName" label="Nombre Completo" />
      <TextInput source="username" label="Usuario" />
      <PasswordInput source="password" label="Contraseña" />
      <SelectInput source="role" label="Rol" choices={roleChoices} />
      <ReferenceInput source="turnoId" reference="turnos" label="Turno">
        <SelectInput optionText="nombre" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create title="Crear Usuario">
    <SimpleForm>
      <TextInput source="fullName" label="Nombre Completo" />
      <TextInput source="username" label="Usuario" />
      <PasswordInput source="password" label="Contraseña" />
      <SelectInput source="role" label="Rol" choices={roleChoices} />
      <ReferenceInput source="turnoId" reference="turnos" label="Turno">
        <SelectInput optionText="nombre" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const UserShow = () => (
  <Show title="Detalles del Usuario">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="fullName" label="Nombre Completo" />
      <TextField source="username" label="Usuario" />
      <TextField source="role" label="Rol" />
      <TextField source="turnoId" label="Turno ID" />
    </SimpleShowLayout>
  </Show>
);
