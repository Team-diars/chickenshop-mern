import React from "react";
import { Button, Table } from "react-bootstrap";
import { useUsers } from "../../hooks/users/useUsers";

export const UsersScreen = () => {
  const { users, loading } = useUsers();
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <Button variant="success">
        <i className="fas fa-plus" />
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Avatar</th>
            <th>
              <Button variant="primary">
                <i className="fas fa-pen" />
              </Button>
              <Button variant="danger">
                <i className="fas fa-trash" />
              </Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
