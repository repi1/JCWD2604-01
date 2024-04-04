import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  return (
    <nav className="flex flex-col p-2 bg-[#48744D]">
      <div className="flex justify-between p-2">
        <div className="flex">
          <IoLocationSharp color="white" className="mr-3 mt-3 " />
          <div className="flex flex-col text-white">
            <div className="flex">
              <p>Dikirimkan ke jakarta</p>
              <IoIosArrowDown className="ml-1 mt-1" />
            </div>
            <p>Hari ini 07:00-08:00</p>
          </div>
        </div>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
