'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ModalUserEdit from './ModalUserEdit';
import { User } from './UserManage';

interface UserEditProps {
  users: User[];
  renderRoleIndicator: (role: User['role']) => JSX.Element;
}
const UserEditPCComponent: React.FC<UserEditProps> = ({
  users,
  renderRoleIndicator,
}) => {
  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-[650px]" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-green-500">
            <TableCell className="text-white">No</TableCell>
            <TableCell className="text-white">Name</TableCell>
            <TableCell className="text-white">Email</TableCell>
            <TableCell className="text-white">Role</TableCell>
            <TableCell className="text-white">Store</TableCell>
            <TableCell className="text-white">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{renderRoleIndicator(user.role)}</TableCell>
              <TableCell>{user.store ? user.store.name : ''}</TableCell>
              <TableCell>
                <ModalUserEdit userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UserEditPCComponent;
