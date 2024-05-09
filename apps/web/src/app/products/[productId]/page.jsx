import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import Link from '@mui/material/Link';
import ProductDetailImage from '../../../components/ProductDetailImage';
import UserProductStock from '../../../components/userProductStock';

export const metadata = {
  title: 'Product Detail',
  description: 'tempat jualan :)',
};

async function Page({ params }) {
  const { productId } = params;
  const product = (await axiosInstanceSSR().get('/products/' + productId)).data
    .result;

  return (
    <>
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center">
        <div className="grid">
          <ProductDetailImage params={params} />
          <UserProductStock params={params} />
        </div>
      </div>
    </>
  );
}
export default Page;
