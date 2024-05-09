'use client';
import { axiosInstance } from '@/axios/axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { Providers } from '../Chakra-provider';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { store } from '@/redux/store';
import { UserContext } from './UserManage';
interface ModalUserEditProps {
  userId: string;
}
type Store = {
  id: string;
  name: string;
};

function ModalUserEdit({ userId }: ModalUserEditProps) {
  const [email, setEmail] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const { fetchUsers } = useContext(UserContext);
  let userRole: { email: string; role: string; storeId: string } = {
    email: '',
    role: '',
    storeId: '',
  };
  const toast = useToast();
  const initialRole = {
    role: '',
    storeId: '',
  };
  const formik = useFormik({
    initialValues: initialRole,
    onSubmit: (values) => {
      save(values);
    },
  });
  const edit = async (userId: string) => {
    const res = await axiosInstance().get('/users/v7/' + userId);
    userRole = res.data.result;
    setEmail(userRole.email);
    formik.setFieldValue('role', userRole.role);
    formik.setFieldValue('storeId', userRole.storeId);
  };
  const save = async (values: { role: string; storeId: string }) => {
    const { role, storeId } = values;
    axiosInstance()
      .patch('/users/v8/' + userId, {
        role,
        storeId,
      })
      .then(() => {
        onClose();
        fetchUsers();
      })
      .catch((err) => {
        toast({
          title: 'Error',
          position: 'top',
          description: err?.response?.data?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const fetchStores = () => {
    axiosInstance()
      .get('summaries/v0')
      .then((res) => {
        setStores(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetchStores();
    edit(userId);
  }, [userId]);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        className="text-sm bg-blue-500 hover:bg-blue-600"
        onClick={onOpen}
      >
        Edit Role
      </Button>
      <Providers>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w={'24rem'}>
            <ModalHeader>Edit User Role</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className=" py-3">
                <form id="form" action="" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col gap-1 ">
                    <table>
                      <tbody>
                        <tr>
                          <td>Email</td>
                          <td>: {email}</td>
                        </tr>
                        <tr>
                          <td>Role</td>
                          <td>
                            <Select
                              defaultValue={formik.values.role}
                              id="role"
                              onChange={(e) =>
                                formik.setFieldValue('role', e.target.value)
                              }
                            >
                              <option value="user">User</option>
                              <option value="storeAdmin">Store Admin</option>
                              <option value="superAdmin">Super Admin</option>
                            </Select>
                          </td>
                        </tr>
                        <tr>
                          <td>Store</td>
                          <td>
                            <Select
                              defaultValue={formik.values.storeId}
                              id="store"
                              onChange={(e) =>
                                formik.setFieldValue('storeId', e.target.value)
                              }
                            >
                              <option value="">None</option>
                              {stores.map((store) => (
                                <option key={store.id} value={store.id}>
                                  {store.name}
                                </option>
                              ))}
                            </Select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex mt-6 items-center justify-center">
                    <button
                      className="bg-green-600 text-white p-1 px-2 rounded-md w-24 "
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Providers>
    </>
  );
}
export default ModalUserEdit;
