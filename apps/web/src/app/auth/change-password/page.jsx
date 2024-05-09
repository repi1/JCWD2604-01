/** @format */
import { Center } from '@chakra-ui/react';
import NewPasswordChangerComponent from '../../../components/auth/changePass';

async function Page() {
  return (
    <Center className=" min-h-screen ">
      <NewPasswordChangerComponent />
    </Center>
  );
}
export default Page;
