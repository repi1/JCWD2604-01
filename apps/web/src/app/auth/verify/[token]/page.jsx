/** @format */
import { axiosInstanceSSR } from '@/axios/axios';
import PasswordChangerComponent from '@/components/auth/setPass';
import { Center } from '@chakra-ui/react';

async function Page({ params }) {
  const token = String(params.token);
  let isError = true;
  let message = '';
  await axiosInstanceSSR()
    .get('/users/v3', {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      isError = false;
    })
    .catch((error) => {
      message = error?.response?.data?.message;
    });
  return (
    <Center className=" min-h-screen ">
      <PasswordChangerComponent
        token={token}
        message={message}
        isError={isError}
      />
    </Center>
  );
}
export default Page;
