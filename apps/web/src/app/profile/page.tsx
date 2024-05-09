import React from 'react';
import ProfilePage from './components/ProfilePage';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div>
      <Navbar />
      <ProfilePage />
    </div>
  );
};

export default page;
