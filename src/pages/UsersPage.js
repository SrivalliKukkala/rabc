import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField, MenuItem, Select } from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User", status: "Inactive" },
  ]);

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentUser) {
      setCurrentUser({ ...currentUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleRoleChange = (event) => {
    const roleValue = event.target.value;
    if (currentUser) {
      setCurrentUser({ ...currentUser, role: roleValue });
    } else {
      setNewUser({ ...newUser, role: roleValue });
    }
  };

  const handleStatusChange = (event) => {
    const statusValue = event.target.value;
    if (currentUser) {
      setCurrentUser({ ...currentUser, status: statusValue });
    } else {
      setNewUser({ ...newUser, status: statusValue });
    }
  };

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    handleClose();
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setCurrentUser(userToEdit);
    setOpen(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    handleClose();
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Users</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add User
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "name", headerName: "Name", width: 130 },
            { field: "email", headerName: "Email", width: 200 },
            { field: "role", headerName: "Role", width: 130 },
            { field: "status", headerName: "Status", width: 100 },
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
                    onClick={() => handleEditUser(params.row.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteUser(params.row.id)}
                  >
                    Delete
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
          <h3>{currentUser ? "Edit User" : "Add User"}</h3>
          <TextField
            label="Name"
            name="name"
            value={currentUser ? currentUser.name : newUser.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentUser ? currentUser.email : newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginBottom: "16px" }}>
            <label>Role</label>
            <Select
              value={currentUser ? currentUser.role : newUser.role}
              onChange={handleRoleChange}
              fullWidth
              displayEmpty
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Status</label>
            <Select
              value={currentUser ? currentUser.status : newUser.status}
              onChange={handleStatusChange}
              fullWidth
              displayEmpty
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={currentUser ? handleSaveEdit : handleAddUser}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPage;
