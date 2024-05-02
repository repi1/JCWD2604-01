import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import Link from '@mui/material/Link';

export const metadata = {
  title: 'Product Detail',
  description: 'tempat jualan :)',
};

async function Page() {
  return (
    <>
      <form>
        <label for="fn">First Name</label>
        <input type="text" name="fn" id="fn" /> <br />
        <label for="ln">Last Name</label>
        <input type="text" name="ln" id="ln" /> <br />
        <input type="file" name="file" id="files" multiple /> <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default Page;
