'use client';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { axiosInstance } from '../../../axios/axios';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import CreateProductComponent from '../../../components/admin/CreateProductComponent';

export function Page() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
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
    <div className="w-full bg-green-100">
      <div className=" pt-5 px-7 max-w-screen-2xl w-full">
        <div className="lg:flex grid justify-between">
          <div className="flex items-center gap-3  border-gray-300 border-b">
            <input
              type="search"
              placeholder="Search any products"
              className=" outline-none bg-green-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="my-3 lg:mt-0 lg:ml-10 flex gap-5 items-start">
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
          <CreateProductComponent categ={categ} />
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
  const [name1, setName1] = useState(name);
  const [valname] = useDebounce(name1, 500);

  const [price1, setPrice1] = useState(price);
  const [valprice] = useDebounce(price1, 500);

  const [weight1, setWeight1] = useState(weight);
  const [valweight] = useDebounce(weight1, 500);

  const [stock1, setStock1] = useState(stocks[0].stock);
  const [valuestock] = useDebounce(stock1, 500);

  const [category1, setCategory1] = useState(categories.id);

  const edit = () => {
    if (confirm('Are you sure you want to edit this product?')) {
      axiosInstance()
        .patch(`/products/${id}`, {
          name: name1,
          price: price1,
          weight: weight1,
          categoryId: category1,
        }) // Update product information
        .then(() => {
          alert('Produk berhasil diedit');
          axiosInstance()
            .patch(`/stocks/${stocks[0].id}`, { stock: stock1 })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const remove = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      axiosInstance()
        .delete(`/stocks/${stocks[0].id}`)
        .then(() => {
          axiosInstance()
            .delete(`/products/${id}`)
            .then(() => {
              alert('Produk berhasil didelete');
              axiosInstance()
                .patch(`/stocks/${stocks[0].id}`, { stock: stock1 })
                .then(() => {
                  location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex h-60 bg-gray-100 rounded-xl shadow-lg">
        <div className="">
          <Image
            src={
              productPhotos?.[0]?.photoURL
                ? `/product-image/${productPhotos[0].photoURL}`
                : '/product-image/default-image.jpg'
            }
            className="h-full w-[256px] object-cover rounded-xl"
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div>
          <form
            className="w-full h-full p-3 flex flex-col justify-between gap-2 "
            onSubmit={(e) => e.preventDefault()}
          >
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
                placeholder={price}
                onChange={(event) => setPrice1(event.target.value)}
              />
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              Weight:
              <input
                className="text-sm text-black font-normal w-full"
                type="number"
                id="weight"
                placeholder={weight}
                onChange={(event) => setWeight1(event.target.value)}
              />
            </div>
            <div className="text-sm text-black font-normal flex gap-1">
              Stocks:{' '}
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
            <div className="flex w-full justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 mr-4 rounded w-1/2"
                onClick={edit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 ml-4 rounded w-1/2"
                onClick={remove}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
