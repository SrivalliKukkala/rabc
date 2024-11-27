import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField } from "@mui/material";

const RolesPage = () => {
  const [roles, setRoles] = useState([
    { id: 1, roleName: "Admin", permissions: "All Access" },
    { id: 2, roleName: "User", permissions: "Limited Access" },
    { id: 3, roleName: "Guest", permissions: "Temporary Access" },
  ]);

  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState({ roleName: "", permissions: "" });
  const [currentRole, setCurrentRole] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewRole({ roleName: "", permissions: "" });
    setCurrentRole(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentRole) {
      setCurrentRole({ ...currentRole, [name]: value });
    } else {
      setNewRole({ ...newRole, [name]: value });
    }
  };

  const handleAddRole = () => {
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    setNewRole({ roleName: "", permissions: "" });
    handleClose();
  };

  const handleEditRole = (id) => {
    const roleToEdit = roles.find((role) => role.id === id);
    setCurrentRole(roleToEdit);
    setOpen(true);
  };

  const handleSaveEdit = () => {
    setRoles(roles.map((role) => (role.id === currentRole.id ? currentRole : role)));
    handleClose();
  };

  return (
    <div>
      <h2>Roles</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Role
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={roles}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "roleName", headerName: "Role Name", width: 200 },
            { field: "permissions", headerName: "Permissions", width: 300 },
            {
              field: "actions",
              headerName: "Actions",
              width: 200,
              renderCell: (params) => (
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleEditRole(params.row.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                </div>
              ),
            },
          ]}
          pageSize={5}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>{currentRole ? "Edit Role" : "Add Role"}</h3>
          <TextField
            label="Role Name"
            name="roleName"
            value={currentRole ? currentRole.roleName : newRole.roleName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Permissions"
            name="permissions"
            value={currentRole ? currentRole.permissions : newRole.permissions}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={currentRole ? handleSaveEdit : handleAddRole}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RolesPage;