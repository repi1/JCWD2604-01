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

function RegisterComponent() {
  const [gender, setGender] = useState('male');
  const router = useRouter();

  YupPassword(Yup);
  const toast = useToast();
  const initialValues = {
    email: '',
    name: '',
    // gender: "male",
    referralNum: '',
  };

  const inputFormik = () => {
    formik.setValues({
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      // gender: gender,
      referralNum: document.getElementById('referralNum').value,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      name: Yup.string().required().min(4),
      // gender: Yup.string(),
      referralNum: Yup.string(),
    }),
    async onSubmit(values) {
      try {
        const { email, name, referralNum } = values;
        const res = await axiosInstance().post('/users/', {
          email,
          name,
          // gender,
          referralNum,
        });
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          router.push('/auth/login');
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
    const { email, name } = formik.values;
    if (email && name) formik.handleSubmit();
  }, [formik.values]);
  return (
    <>
      <Flex className=" max-w-96 w-full flex-col gap-2 ">
        <Heading> Register</Heading>
        <FormControl className="flex flex-col gap-2">
          <div>
            <FormLabel>Name</FormLabel>
            <Input type="text" id="name" />
            <FormHelperText color={'red'}>{formik.errors.name}</FormHelperText>
          </div>
          <div>
            <FormLabel>Email address</FormLabel>
            <Input type="email" id="email" />
            <FormHelperText color={'red'}>{formik.errors.email}</FormHelperText>
          </div>
          {/* <div>
            <FormLabel>Gender</FormLabel>
            <RadioGroup onChange={setGender} value={gender}>
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </div> */}
          <div>
            <FormLabel>Referral Number</FormLabel>
            <Input type="text" id="referralNum" />
          </div>
        </FormControl>
        <div>
          Have an account ?{' '}
          <Link href="/auth/login" className="text-[#4F46E5] font-bold">
            Login
          </Link>
        </div>
        <Button type="button" colorScheme={'facebook'} onClick={inputFormik}>
          Register
        </Button>
      </Flex>
    </>
  );
}
export default RegisterComponent;
