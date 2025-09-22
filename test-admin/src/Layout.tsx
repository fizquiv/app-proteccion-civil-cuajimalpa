import * as React from "react";
import { forwardRef } from "react";
import {
  AppBar,
  Layout,
  UserMenu,
  useLogout,
  type LayoutProps,
} from "react-admin";
import { MenuItem } from "@mui/material";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";

const MyLogoutButton = forwardRef<
  HTMLLIElement,
  React.ComponentProps<typeof MenuItem>
>((props, ref) => {
  const logout = useLogout();
  return (
    <MenuItem onClick={() => logout()} ref={ref} {...props}>
      <ExitIcon fontSize="small" style={{ marginRight: 8 }} />
      Logout
    </MenuItem>
  );
});
MyLogoutButton.displayName = "MyLogoutButton";

const MyUserMenu: React.FC = () => (
  <UserMenu>
    <MyLogoutButton />
  </UserMenu>
);

const MyAppBar: React.FC<React.ComponentProps<typeof AppBar>> = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />} />
);

const MyLayout: React.FC<LayoutProps> = (props) => (
  <Layout {...props} appBar={MyAppBar} />
);

export default MyLayout;
