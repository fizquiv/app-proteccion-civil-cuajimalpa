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
      // Add AppBar styling back here with !important to override theme
      background:
        "linear-gradient(135deg, #dee9ffff 0%, #e3edffff 50%, #dfeaffff 100%) !important",
      minHeight: "56px",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      "& .RaAppBar-toolbar": {
        minHeight: "56px",
        background: "transparent",
        color: "#ffffff", // Ensure white text on colored background
      },
      // Override any default AppBar colors
      "& .MuiAppBar-root": {
        backgroundColor: "transparent !important",
      },
      // Ensure user menu text is white
      "& .MuiButton-root": {
        color: "#ffffff",
      },
      "& .MuiIconButton-root": {
        color: "#ffffff",
      },
    }}
  />
);

const MyLayout: React.FC<LayoutProps> = (props) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    sx={{
      // Force light theme colors
      color: "#1f2937",

      // Main content area - light gradients
      "& .RaLayout-content": {
        background:
          "linear-gradient(135deg, #d4eeffff 0%, #e0f2fe 50%, #e0efffff 100%)",
        minHeight: "100vh",
        color: "#1f2937",
      },

      // Main content container
      "& main.RaLayout-main": {
        background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
        padding: "24px",
        borderRadius: "16px",
        margin: "8px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        color: "#1f2937",
      },

      // Cards - white with dark text
      "& .MuiCard-root": {
        background: "linear-gradient(145deg, #ffffff 0%, #fefefe 100%)",
        margin: "16px",
        borderRadius: "16px",
        border: "none",
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        color: "#1f2937",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)",
        },
      },

      // Sidebar styling
      "& .RaLayout-sidebar": {
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        borderRight: "1px solid rgba(226, 232, 240, 0.6)",
        boxShadow: "4px 0 16px rgba(0, 0, 0, 0.04)",
      },

      "& .MuiInputBase-input": {
        color: "#1f2937",
      },

      // Typography
      "& .MuiTypography-root": {
        color: "#1f2937",
      },
    }}
  />
);

export default MyLayout;
