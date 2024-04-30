/** @format */

import { axiosInstance } from '@/axios/axios';
import { functionLogin, functionLogout } from '../slices/userSlice';
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation';

export const userLogin = ({ email, password, social }, router) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = {};
        if (social == 'none') {
          res = await axiosInstance().get('/users', {
            params: { email, password },
          });
        } else if (social == 'google') {
          res = await axiosInstance().get('/users/google', {
            params: { email },
          });
        }
        if (res.data.result == 'none') {
          localStorage.setItem('user', res.data.token);
          router.push('/auth/registerSocial/' + res.data.token);
        }
        if (res.data.result?.id) {
          const userData = res.data.result;
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            willClose: async () => {
              await dispatch(functionLogin(res.data.result));
              if (
                userData.role == 'superAdmin' ||
                userData.role == 'storeAdmin'
              ) {
              //   router.push('/admin');
              // } else {
              //   router.back();
              }
              resolve();
            },
          });
          localStorage.setItem('user', res.data.token);
        }
        return;
      } catch (err) {
        localStorage.removeItem('auth');
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'ok',
        });

        return err.message;
      }
    });
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('user');
      const res = await axiosInstance().get('/users/v1', {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.result?.id) {
        // await axiosInstance().patch('userDetails/v1');
        dispatch(functionLogin(res.data.result));

        localStorage.setItem('user', res.data.token);
      } else {
        alert('user not found');
        throw Error('user not found');
      }
      return;
    } catch (err) {
      localStorage.removeItem('auth');
      dispatch(functionLogout);
      return err.message;
    }
  };
};
