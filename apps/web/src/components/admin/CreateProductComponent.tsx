'use client';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useState, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { axiosInstance } from '../../axios/axios';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export function CreateProductModal({ categ, open, handleClose }) {
  const [name1, setName1] = useState('');
  const [valname] = useDebounce(name1, 500);

  const [price1, setPrice1] = useState('');
  const [valprice] = useDebounce(price1, 500);

  const [weight1, setWeight1] = useState('');
  const [valweight] = useDebounce(weight1, 500);

  const [stock1, setStock1] = useState('');
  const [valuestock] = useDebounce(stock1, 500);

  const [category1, setCategory1] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  console.log(imageUrl.name);

  const userSelector = useSelector((state) => state.auth);

  const post = async (e) => {
    if (confirm('Are you sure you want to create this product?')) {
      try {
        const response = await axiosInstance().post(`/products`, {
          name: name1,
          price: price1,
          weight: weight1,
          categoryId: category1,
        });

        alert('Produk berhasil dibuat');

        const productId = response.data.productId;
        await axiosInstance().post(`/stocks`, {
          productId: productId,
          storeId: userSelector.storeId,
          stock: stock1,
        });

        // const formData = new FormData();
        // formData.append('image', e.target.elements.image.files[0]);
        // setImageUrl(e.target.elements.image.files[0]);
        // const res = await axiosInstance().post(
        //   `/productPhotos/${productId}/upload`,
        //   formData,
        // );

        // const uploadedImageUrl = res.data;

        // setImageUrl(uploadedImageUrl);

        location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex">
          <div className="flex flex-col w-2/3">
            <button
              className="absolute top-1 right-1 text-red-600"
              type="button"
              variant="contained"
              onClick={handleClose}
            >
              X
            </button>
            <h1 className="text-2xl font-bold pb-2">Create Product</h1>
            <div>
              <form
                className="w-full h-full p-3 flex flex-col justify-between gap-2 "
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="text-2xl font-bold w-full"
                  type="text"
                  id="name"
                  placeholder={'Product Name'}
                  required
                  onChange={(event) => setName1(event.target.value)}
                />
                <div className="text-sm text-black font-normal flex gap-1">
                  Price:
                  <input
                    className="text-sm text-black font-normal w-full"
                    type="number"
                    id="price"
                    placeholder={'Price'}
                    required
                    onChange={(event) => setPrice1(event.target.value)}
                  />
                </div>
                <div className="text-sm text-black font-normal flex gap-1">
                  Weight:
                  <input
                    className="text-sm text-black font-normal w-full"
                    type="number"
                    id="weight"
                    placeholder={'Weight'}
                    required
                    onChange={(event) => setWeight1(event.target.value)}
                  />
                </div>
                <div className="text-sm text-black font-normal flex gap-1">
                  Stocks:{' '}
                  <input
                    className="text-sm text-black font-normal w-full"
                    type="number"
                    id="weight"
                    placeholder={'Stock'}
                    required
                    onChange={(event) => setStock1(event.target.value)}
                  />
                </div>
                <select
                  id="category"
                  required
                  value={category1}
                  onChange={(event) => setCategory1(event.target.value)}
                >
                  <option value="">Select Category</option>
                  {categ.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="file"
                  name="image"
                  id="imageFile"
                  multiple
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setImageUrl(file);
                  }}
                /> */}
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  onClick={post}
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
          <div>
            <Image
              src={
                imageUrl
                  ? `/product-image/${imageUrl?.name}`
                  : '/product-image/default-image.jpg'
              }
              className="h-full w-[256px] object-cover rounded-xl"
              alt=""
              width={30}
              height={30}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default function CreateProductComponent({ categ }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className=" items-center">
        <button
          type="button"
          className="h-[40px] mt-1 text-[12.5px] border w-[216px] bg-green-500 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded-lg"
          variant="contained"
          onClick={handleOpen}
        >
          Create Product
        </button>
        <CreateProductModal
          categ={categ}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
