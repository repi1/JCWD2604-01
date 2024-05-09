'use client';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { axiosInstance } from '../axios/axios';
import Link from 'next/link';
import Image from 'next/image';

export function ProductList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [value] = useDebounce(search, 500);

  function fetchProducts() {
    axiosInstance()
      .get('/products', {
        params: {
          name: search,
          category_name: category,
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
      <div className="grid max-w-screen-2xl w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-7 gap-3">
        {products.map((product, key) => (
          <ProductCard {...product} key={key} />
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ id, name, price, productPhotos, categories }) {
  return (
    <>
      <Link
        className="flex flex-col bg-gray-100 rounded-xl shadow-lg"
        href={'/products/' + id}
      >
        <div className="">
          <Image
            src={
              productPhotos?.[0]?.photoURL
                ? `/product-image/${productPhotos[0].photoURL}`
                : '/product-image/default-image.jpg'
            }
            className="h-[200px] w-full object-cover rounded-xl"
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div>
          <div className="w-full h-full p-3 flex flex-col justify-between gap-2 ">
            <div className="text-2xl font-bold w-full"> {name}</div>
            <div className="text-sm text-black font-semibold">{price}</div>
            <div className="text-[#249C58]">Category: {categories.name}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
