'use client';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import ModalUserEdit from './ModalUserEdit';
import { User } from './UserManage';
interface UserEditProps extends User {
  index: number;
  renderRoleIndicator: (role: User['role']) => JSX.Element;
}
const UserEditMobileComponent: React.FC<UserEditProps> = (user) => {
  return (
    <Paper key={user.id} className="mb-4 p-4">
      <div className=" flex flex-col bg-green-100 p-5 rounded-lg">
        <div>
          <Typography variant="body1" className="font-bold text-green-800">
            No:{' '}
            <span className="font-normal text-green-600">{user.index + 1}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Name:{' '}
            <span className="font-normal text-green-600">{user.name}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Email:{' '}
            <span className="font-normal text-green-600">{user.email}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800 flex">
            Role:&nbsp;
            <span className="font-normal text-green-600">
              {user.renderRoleIndicator(user.role)}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Store:{' '}
            <span className="font-normal text-green-600">
              {user.store ? user.store.name : ''}
            </span>
          </Typography>
        </div>
        <div className="flex justify-end items-center gap-2 mt-2">
          <ModalUserEdit userId={user.id} />
          {/* <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: '#ef4444',
                    '&:hover': {
                      backgroundColor: '#dc2626',
                    },
                    color: 'white',
                  }}
                >
                  Delete
                </Button> */}
        </div>
      </div>
    </Paper>
  );
};
export default UserEditMobileComponent;
