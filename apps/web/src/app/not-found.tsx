import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-green-100">
      <MdErrorOutline size="5em" className="text-green-600" />
      <h1 className="text-4xl font-bold text-green-800">
        Oops! Page not found.
      </h1>
      <p className="text-lg text-green-700">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className='className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200"'
      >
        {' '}
        Go Home
      </Link>
    </div>
  );
};

export default Custom404;
