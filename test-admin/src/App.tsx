import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";

import { UserCreate, UserEdit, UserList, UserShow } from "./users";
import { TurnoList, TurnoEdit, TurnoCreate, TurnoShow } from "./turnos";
import {
  ReporteList,
  ReporteEdit,
  ReporteCreate,
  ReporteShow,
} from "./reportes";
import { InsumoList, InsumoEdit, InsumoCreate, InsumoShow } from "./insumos";
import { LogList, LogShow } from "./logs";

import MyLayout from "./Layout";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={MyLayout}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      show={UserShow}
      options={{ label: "Usuarios" }}
    />
    <Resource
      name="turnos"
      list={TurnoList}
      edit={TurnoEdit}
      create={TurnoCreate}
      show={TurnoShow}
      options={{ label: "Turnos" }}
    />
    <Resource
      name="reportes"
      list={ReporteList}
      edit={ReporteEdit}
      create={ReporteCreate}
      show={ReporteShow}
      options={{ label: "Reportes" }}
    />
    <Resource
      name="insumos"
      list={InsumoList}
      edit={InsumoEdit}
      create={InsumoCreate}
      show={InsumoShow}
      options={{ label: "Insumos" }}
    />
    <Resource
      name="logs"
      list={LogList}
      show={LogShow}
      options={{ label: "Logs" }}
    />
  </Admin>
);
