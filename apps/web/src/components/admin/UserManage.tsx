'use client';
import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Pagination } from '@mui/material';
import { axiosInstance } from '@/axios/axios';
import UserEditMobileComponent from './UserEditMobile';
import UserEditPCComponent from './UserEditPC';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  store: { name: string };
}
interface UserStore {
  email: string;
  storeId: string;
}
interface UserContextType {
  fetchUsers: () => void;
}
export const UserContext = createContext<UserContextType>({
  fetchUsers: () => {},
});

const UserManageComponent: React.FC<UserStore> = ({ email, storeId }) => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const fetchUsers = () => {
    axiosInstance()
      .get('/summaries/v7/page/' + page, {
        params: { email, storeId },
      })
      .then((res) => {
        setUsers(res.data.result);
        setPageCount(res.data.pageCount);
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
          willClose: () => {
            router.push('/admin');
          },
        }),
      );
  };

  useEffect(() => {
    fetchUsers();
  }, [email, storeId, page]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const renderRoleIndicator = (role: User['role']) => {
    switch (role) {
      case 'user':
        return <div className=" text-green-600">User</div>;
      case 'storeAdmin':
        return <div className=" text-blue-600">Store Admin</div>;
      case 'superAdmin':
        return <div className=" text-red-600">Super Admin</div>;
      default:
        return <div>-</div>;
    }
  };

  if (isSmallScreen) {
    return (
      <UserContext.Provider value={{ fetchUsers }}>
        <Box>
          {users.map((user, index) => (
            <UserEditMobileComponent
              {...user}
              key={user.id}
              index={index}
              renderRoleIndicator={renderRoleIndicator}
            />
          ))}
          <Pagination
            count={pageCount}
            page={page}
            color="primary"
            className=" flex justify-center my-4"
            onChange={handleChange}
          />
        </Box>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ fetchUsers }}>
      <UserEditPCComponent
        users={users}
        renderRoleIndicator={renderRoleIndicator}
      />
      <Pagination
        count={pageCount}
        page={page}
        color="primary"
        className=" flex justify-center my-4"
        onChange={handleChange}
      />
    </UserContext.Provider>
  );
};
export default UserManageComponent;
