'use client';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { useFormik } from 'formik';
import { axiosInstance } from '../../../axios/axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

export function Page() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [value] = useDebounce(search, 500);
  const userSelector = useSelector((state) => state.auth);

  function fetchProducts() {
    axiosInstance()
      .get('/products', {
        params: {
          name: search,
          category_name: category,
          storeId: userSelector.storeId,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchProducts();
  }, [value, category]);

  const [categ, setCateg] = useState([]);

  function fetchCategories() {
    axiosInstance()
      .get('/categories')
      .then((res) => {
        setCateg(res.data.result);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-orange-100">
      <div className=" pt-5 px-7 max-w-screen-2xl w-full">
        <div className="lg:flex grid justify-between">
          <div className="flex items-center gap-3  border-gray-300 border-b">
            <input
              type="search"
              placeholder="Search any products"
              className=" outline-none bg-orange-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mt-3 lg:mt-0 lg:ml-10 flex gap-5 items-start">
            <button
              onClick={(e) => setCategory(e.target.value)}
              value="Sayur"
              className={`px-1 transition duration-100 transform hover:scale-110 ${
                category == 'Sayur'
                  ? 'border-b-4 border-green-400'
                  : `text-gray-400`
              }`}
            >
              Sayur
            </button>
            <button
              onClick={(e) => setCategory(e.target.value)}
              value="Buah"
              className={`px-1 transition duration-100 transform hover:scale-110 ${
                category == 'Buah'
                  ? 'border-b-4 border-green-400'
                  : `text-gray-400`
              }`}
            >
              Buah
            </button>
            <button
              onClick={(e) => setCategory(e.target.value)}
              value=""
              className={`px-1 transition duration-100 transform hover:scale-110 ${
                category == '' ? 'border-b-4 border-green-400' : `text-gray-400`
              }`}
            >
              All Category
            </button>
          </div>
        </div>
      </div>
      <div className="grid max-w-screen-2xl w-full grid-cols-1 p-7 gap-3">
        {products.map((product, key) => (
          <ProductCard categ={categ} {...product} key={key} />
        ))}
      </div>
    </div>
  );
}
export default Page;

export function ProductCard({
  id,
  categ,
  name,
  price,
  weight,
  productPhotos,
  categories,
  stocks,
}) {
  const [name1, setName1] = useState('');
  const [price1, setPrice1] = useState('');
  const [weight1, setWeight1] = useState('');
  const [stock1, setStock1] = useState('');
  const [category1, setCategory1] = useState('');

  const save = () => {
    const patchData = {
      name: name1,
      price: price1,
      weight: weight1,
      stock: stock1,
      category: category1,
    };
    axiosInstance()
      .patch('/products/' + id, patchData)
      .then(() => {
        alert('data berhasil diedit');
        // fetchEvents();
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex h-48 bg-gray-100 rounded-xl shadow-lg">
        <div className="">
          <Image
            src={`/product-image/${productPhotos[0].photoURL}`}
            className="h-full w-[200px] object-cover rounded-xl"
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div>
          {/* <form className="w-full h-full p-3 flex flex-col justify-between gap-2 ">
            <div className="text-2xl font-bold w-full" type="text" id="name">
              {name}
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              Price: {price}
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              Weight: {weight}
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              Stock: {stocks[0].stock}
            </div>
            <div>{category.name}</div>
          </form> */}
          <form className="w-full h-full p-3 flex flex-col justify-between gap-2 ">
            <input
              className="text-2xl font-bold w-full"
              type="text"
              id="name"
              placeholder={name}
              onChange={(event) => setName1(event.target.value)}
            />
            <div className="text-sm text-black font-normal flex gap-1">
              Price:
              <input
                className="text-sm text-black font-normal w-full"
                type="number"
                id="price"
                placeholder={`Price: ${price}`}
                onChange={(event) => setPrice1(event.target.value)}
              />
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              <div>Weight:</div>
              <input
                className="text-sm text-black font-normal w-full"
                type="number"
                id="weight"
                placeholder={`Weight: ${weight}`}
                onChange={(event) => setWeight1(event.target.value)}
              />
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              <input
                className="text-sm text-black font-normal w-full"
                type="number"
                id="weight"
                placeholder={stocks[0].stock}
                onChange={(event) => setStock1(event.target.value)}
              />
            </div>
            <select
              id="category"
              onChange={(event) => setCategory1(event.target.value)}
            >
              {categ.map((category) => (
                <option
                  value={category.id}
                  selected={category.id === categories.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </>
  );
}
