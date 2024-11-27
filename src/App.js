import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import PermissionsPage from "./pages/Permissions";
import { AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/roles">
            Roles
          </Button>
          <Button color="inherit" component={Link} to="/permissions">
            Permissions
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
