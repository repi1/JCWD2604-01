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

function RegisterSocialComponent() {
  const [gender, setGender] = useState('male');
  const router = useRouter();

  YupPassword(Yup);
  const toast = useToast();
  const initialValues = {
    name: '',
    gender: 'male',
    birthDate: '',
    referralNum: '',
  };

  const inputFormik = () => {
    formik.setValues({
      name: document.getElementById('name').value,
      gender: gender,
      birthDate: document.getElementById('birthDate').value,
      referralNum: document.getElementById('referralNum').value,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required().min(4),
      gender: Yup.string(),
      birthDate: Yup.date().required(),
      referralNum: Yup.string(),
    }),
    async onSubmit(values) {
      try {
        const { name, referralNum, gender, birthDate } = values;
        const res = await axiosInstance().post('/users/google/', {
          name,
          gender,
          birthDate,
          referralNum,
        });
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          localStorage.setItem('user', res.data.token);
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
    const { name, birthDate } = formik.values;
    if (name && birthDate) formik.handleSubmit();
  }, [formik.values]);
  return (
    <>
      <Flex className=" max-w-96 w-full flex-col gap-2 ">
        <Heading> Complete Your Registeration</Heading>
        <FormControl className="flex flex-col gap-2">
          <div>
            <FormLabel>Name</FormLabel>
            <Input type="text" id="name" />
            <FormHelperText color={'red'}>{formik.errors.name}</FormHelperText>
          </div>
          <div>
            <FormLabel>Birth Date</FormLabel>
            <Input type="date" id="birthDate" />
            <FormHelperText color={'red'}>
              {formik.errors.birthDate}
            </FormHelperText>
          </div>
          <div>
            <FormLabel>Gender</FormLabel>
            <RadioGroup onChange={setGender} value={gender}>
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div>
            <FormLabel>Referral Number</FormLabel>
            <Input type="text" id="referralNum" />
          </div>
        </FormControl>
        <Button type="button" colorScheme={'facebook'} onClick={inputFormik}>
          Register
        </Button>
      </Flex>
    </>
  );
}
export default RegisterSocialComponent;
