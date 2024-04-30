'use client';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Swal from 'sweetalert2';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [editClick, setEditClick] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/profile/1');
        const userData = response.data;
        setEmail(userData.email);
        setName(userData.name);
        setUser(userData);
        setImageUrl(userData.avatarURL);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    return () => {
      // Cleanup logic
    };
  }, [imageUrl]);

  const imageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.elements.image.files[0]);
    setImageUrl(e.target.elements.image.files[0]);

    try {
      const response = await axios.post(
        'http://localhost:8000/profile/1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Assuming the server responds with the URL of the uploaded image
      const uploadedImageUrl = response.data.imageUrl;

      // Update the imageUrl state with the URL of the uploaded image
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  function submitForm(e) {
    e.preventDefault();

    axios
      .patch('http://localhost:8000/profile/1', {
        name: name,
        email: email,
      })
      .then((response) => {
        Swal.fire({
          title: 'Update Success!',
          text: 'you successfully updated your profile',
          icon: 'success',
        });
        setEditClick(false);
      })
      .catch((error) => {
        console.error('Error updating user profile:', error.response.data);
        // Handle error
      });
  }

  return (
    <>
      {user && (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <Avatar
            alt="User Avatar"
            src={`http://localhost:8000/${imageUrl}`}
            sx={{ width: 250, height: 250 }}
          />
          <form encType="multipart/form-data" onSubmit={imageSubmit}>
            <input type="file" name="image" id="imageFile" />
            <input type="submit" value="Upload" />
          </form>
        </div>
      )}

      {/* Profile Filled */}
      <div>
        {user && !editClick && (
          <form className="m-4 mb-10">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <p>{name}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <p>{email}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="birthdate"
                className="block text-gray-700 font-bold mb-2"
              >
                Birthdate
              </label>
              <p>{user.birthDate}</p>
            </div>
            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <p>{user.gender}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditClick(!editClick)}
              >
                Edit Profile
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Editing Profile */}
      {user && editClick && (
        <div>
          <form onSubmit={submitForm} className="m-4 mb-10">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="birthdate"
                className="block text-gray-700 font-bold mb-2"
              >
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div> */}
            {/* <div className="mb-6">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div> */}
            <div className="flex items-center gap-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditClick(!editClick)}
              >
                Cancel edit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
