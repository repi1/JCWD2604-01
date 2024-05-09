/** @format */
'use client';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Heading,
  Flex,
  Button,
  useToast,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function NewPasswordChangerComponent() {
  const router = useRouter();

  YupPassword(Yup);
  const toast = useToast();
  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const inputFormik = () => {
    formik.setValues({
      oldPassword: document.getElementById('oldPassword').value,
      password: document.getElementById('password').value,
      confirmPassword: document.getElementById('confirmPassword').value,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required(),
      password: Yup.string().min(6).minNumbers(1).required().minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'password does not match'),
    }),
    async onSubmit(values) {
      try {
        const { oldPassword, password } = values;
        const res = await axiosInstance().patch('/users/v6', {
          oldPassword,
          password,
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          router.push('/');
        });
      } catch (error) {
        toast({
          title: 'Error',
          position: 'top',
          description: error?.response?.data?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    const { oldPassword, password, confirmPassword } = formik.values;
    if (oldPassword && password && confirmPassword) formik.handleSubmit();
  }, [formik.values]);
  return (
    <>
      <Flex className=" max-w-96 w-full flex-col gap-2 ">
        <Heading> Change Password</Heading>
        <FormControl className="flex flex-col gap-2">
          <div>
            <FormLabel>Old Password </FormLabel>
            <Input type="password" id="oldPassword" />
            <FormHelperText color={'red'}>
              {formik.errors.oldPassword}
            </FormHelperText>
          </div>
          <div>
            <FormLabel>Password </FormLabel>
            <Input type="password" id="password" />
            <FormHelperText color={'red'}>
              {formik.errors.password}
            </FormHelperText>
          </div>
          <div>
            <FormLabel>Confirm Password </FormLabel>
            <Input type="password" id="confirmPassword" />
            <FormHelperText color={'red'}>
              {formik.errors.confirmPassword}
            </FormHelperText>
          </div>
        </FormControl>
        <Button type="button" colorScheme={'facebook'} onClick={inputFormik}>
          Change Password
        </Button>
      </Flex>
    </>
  );
}
export default NewPasswordChangerComponent;
