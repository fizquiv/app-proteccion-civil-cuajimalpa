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
  <AppBar
    {...props}
    userMenu={<MyUserMenu />}
    sx={{
      // Civil Protection gradient - red to orange
      background: "linear-gradient(135deg, #c0ebffff 0%, #b7cdffff 100%)",
      minHeight: "56px",
      marginBottom: "16px",
      borderRadius: "8px",
      "& .RaAppBar-toolbar": {
        minHeight: "56px",
        background: "transparent", // Let the parent gradient show
      },
    }}
  />
);

const MyLayout: React.FC<LayoutProps> = (props) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    sx={{
      // Main content area - soft blue gradient
      "& .RaLayout-content": {
        background:
          "linear-gradient(135deg, #e5f6ffff 0%, #e0f2fe 50%, #f8fafc 100%)",
        minHeight: "100vh",
      },

      // Sidebar content area - subtle gray gradient
      "& .RaLayout-contentWithSidebar": {
        background:
          "linear-gradient(135deg, #ffffffff 0%, #ffffffff 50%, #ffffffff 100%)",
      },

      // Main content container - clean white with subtle gradient
      "& main.RaLayout-main": {
        background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
        padding: "24px",
        borderRadius: "16px",
        margin: "8px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        color: "#1f2937", // Dark gray text
      },

      // Cards - elegant white gradient with soft shadows
      "& .MuiCard-root": {
        background: "linear-gradient(145deg, #ffffff 0%, #fefefe 100%)",
        margin: "16px",
        borderRadius: "16px",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        color: "#374151", // Dark gray text for cards
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)",
        },
      },

      // General text elements
      "& .MuiTypography-root": {
        color: "#374151",
      },

      // Table text
      "& .MuiTableCell-root": {
        color: "#374151",
      },

      // Form labels and inputs
      "& .MuiInputLabel-root": {
        color: "#6b7280 !important",
      },

      "& .MuiInputBase-input": {
        color: "#374151",
      },

      // Button text
      "& .MuiButton-root": {
        color: "#374151",
      },
    }}
  />
);

export default MyLayout;
