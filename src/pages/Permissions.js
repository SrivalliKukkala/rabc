import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, Checkbox, FormControlLabel } from "@mui/material";

const PermissionsPage = () => {
  const [roles, setRoles] = useState([
    { id: 1, PermissionName: "All Access", permissions: ["Read", "Write", "Delete"] },
    { id: 2, PermissionName: "Limited Access", permissions: ["Read"]},
    { id: 3, PermissionName: "Temporary", permissions: ["Read"] },
    
  ]);

  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const availablePermissions = ["Read", "Write", "Delete"];

  const handleOpen = (role) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole(null);
  };

  const handlePermissionChange = (permission) => {
    if (currentRole.permissions.includes(permission)) {
      // Remove permission
      setCurrentRole({
        ...currentRole,
        permissions: currentRole.permissions.filter((perm) => perm !== permission),
      });
    } else {
      // Add permission
      setCurrentRole({
        ...currentRole,
        permissions: [...currentRole.permissions, permission],
      });
    }
  };

  const handleSavePermissions = () => {
    setRoles(roles.map((role) => (role.id === currentRole.id ? currentRole : role)));
    handleClose();
  };

  return (
    <div>
      <h2>Permissions</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={roles}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "PermissionName", headerName: "Permission Name", width: 200 },
            {
              field: "permissions",
              headerName: "Permissions",
              width: 300,
              renderCell: (params) => params.row.permissions.join(", "),
            },
            {
              field: "actions",
              headerName: "Actions",
              width: 200,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleOpen(params.row)}
                >
                  Edit Permissions
                </Button>
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
          <h3>Edit Permissions for {currentRole?.roleName}</h3>
          {availablePermissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={currentRole?.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
              }
              label={permission}
            />
          ))}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePermissions}
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PermissionsPage;