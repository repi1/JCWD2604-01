'use client';
import { data } from './data/categoryData';
import { data2 } from './data/category-data2';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Image from 'next/image';

const CategorySlider = () => {
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="relative flex items-center">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="lg:flex  w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          <div>
            {data.map((item) => (
              <div
                className="w-[75px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 mr-4"
                key={item.id}
              >
                <div className="flex flex-col items-center ">
                  <Image
                    src={`/category-icons/${item.img}`}
                    alt="/"
                    key={item.id}
                    width={50}
                    height={50}
                  />
                  <h1 className="whitespace-normal text-sm text-center">
                    {item.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div>
            {data2.map((item) => (
              <div
                className="w-[75px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 mr-4"
                key={item.id}
              >
                <div className="flex flex-col items-center ">
                  <Image
                    src={`/category-icons/${item.img}`}
                    alt="/"
                    key={item.id}
                    width={50}
                    height={50}
                  />
                  <h1 className="whitespace-normal text-sm text-center">
                    {item.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
};

export default CategorySlider;
