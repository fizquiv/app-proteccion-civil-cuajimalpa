import { Admin, Resource } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import theme from "./theme";

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

// Icons for resources
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InventoryIcon from "@mui/icons-material/Inventory";
import HistoryIcon from "@mui/icons-material/History";

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
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
      <Resource
        name="reportes"
        list={ReporteList}
        edit={ReporteEdit}
        create={ReporteCreate}
        show={ReporteShow}
        icon={AssessmentIcon}
      />
      <Resource
        name="insumos"
        list={InsumoList}
        edit={InsumoEdit}
        create={InsumoCreate}
        show={InsumoShow}
        icon={InventoryIcon}
      />
      <Resource name="logs" list={LogList} show={LogShow} icon={HistoryIcon} />
    </Admin>
  </ThemeProvider>
);
