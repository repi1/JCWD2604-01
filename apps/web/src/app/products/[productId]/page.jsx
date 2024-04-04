import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import Link from '@mui/material/Link';
import ProductDetailImage from '../../../components/ProductDetailImage';

export const metadata = {
  title: 'Product Detail',
  description: 'tempat jualan :)',
};

async function Page({ params }) {
  const { productId } = params;
  const product = (await axiosInstanceSSR().get('/products/' + productId)).data
    .result;
  console.log(product);

  return (
    <>
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center">
        <div className="grid max-w-screen-2xl sm:w-full lg:w-auto lg:grid-cols-2 pt-4 lg:pt-12 sm:gap-2 lg:gap-10 sm:grid-cols-1">
          <ProductDetailImage params={params} />
          <div className="flex flex-col w-4/5">
            <div id="productName" className=" font-bold text-3xl mb-5">
              Name: {product.name}
            </div>
            <div className=" font-bold text-3xl">
              Category: {product.categories.name}
            </div>
            <div className="my-2">
              <div className="font-bold text-2xl flex">
                Price:
                <div className="font-bold text-2xl text-green-600 pl-2">
                  {product.price}
                </div>
              </div>
            </div>
            {/* <form
              // ref={formRef}
              className="flex flex-col gap-3 pb-5"
              id="form"
              action=""
              // onSubmit={save}
              // {(e) => {
              //   e.preventDefault();
              //   save();
              // }}
            >
              <div className="flex gap-3">
                <div className="text-2xl font-bold flex items-center">
                  Stock:
                </div>
                <input
                  className="h-[49px] border max-w-32 p-5 rounded-lg text-center"
                  type="number"
                  min={1}
                  placeholder="Quantity"
                  disabled
                  id="qty"
                  value={event.availability}
                />
              </div>
              <PaymentComponent event={event} />
              <div className="font-semibold mt-5">
                {event.locations.location_name}
              </div>
              <hr />
              <div className="font-semibold">{event.address}</div>

              <div className=" text-justify text-sm">
                {event.description ||
                  "We thoroughly check every purchase you make and applies our company's guarantee to the product's legitimacy. The guarantee is valid for 2 days after receiving the product from the delivery service. Should you have any concern about the product you purchase, kindly reach out to our Customer Service and Specialist on Monday - Saturday 10.00 - 21.00 (GMT+7 / WIB).\n"}
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
