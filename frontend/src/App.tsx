import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { i18nProvider } from "./providers/i18nProvider";
import Home from "./pages/home/Home.tsx";

import { UserCreate, UserEdit, UserList, UserShow } from "./resources/users";
import {
  TurnoList,
  TurnoEdit,
  TurnoCreate,
  TurnoShow,
} from "./resources/turnos";
import { ReporteList, ReporteEdit, ReporteShow } from "./resources/reportes";
import ReporteCreateAdvanced from "./resources/ReporteCreateAdvanced.tsx";
import {
  InsumoList,
  InsumoEdit,
  InsumoCreate,
  InsumoShow,
} from "./resources/insumos";
import { LogList, LogShow } from "./resources/logs";

import MyLayout from "./components/Layout.tsx";

// Icons for resources
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InventoryIcon from "@mui/icons-material/Inventory";
import HistoryIcon from "@mui/icons-material/History";

export const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={MyLayout}
      i18nProvider={i18nProvider}
    >
      {(permissions) => (
        <>
          {/* Reportes - available to all authenticated users */}
          <Resource
            name="reportes"
            list={ReporteList}
            edit={ReporteEdit}
            create={ReporteCreateAdvanced}
            show={ReporteShow}
            icon={AssessmentIcon}
          />

          {/* Admin and Jefe de Turno resources */}
          {permissions?.role !== "colaborador" && (
            <>
              <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                show={UserShow}
                icon={PeopleIcon}
              />
              <Resource
                name="turnos"
                list={TurnoList}
                edit={TurnoEdit}
                create={TurnoCreate}
                show={TurnoShow}
                icon={ScheduleIcon}
              />
            </>
          )}

          {permissions?.role !== "colaborador" &&
            permissions?.role !== "jefe de turno" && (
              <>
                <Resource
                  name="insumos"
                  list={InsumoList}
                  edit={InsumoEdit}
                  create={InsumoCreate}
                  show={InsumoShow}
                  icon={InventoryIcon}
                />
                <Resource
                  name="logs"
                  list={LogList}
                  show={LogShow}
                  icon={HistoryIcon}
                />
              </>
            )}

          <CustomRoutes>
            <Route path="/home" element={<Home />} />
          </CustomRoutes>
        </>
      )}
    </Admin>
  );
};
