'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import CartItem from './CartItem';
import Link from 'next/link';
import axios from 'axios';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { functionLogout } from '@/redux/slices/userSlice';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/cart/' + userSelector.id,
        );
        const cartData = response.data;
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCart();
  }, [cartItems]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/address/${userSelector?.id}`,
        );
        const addressData = response.data;
        setUserAddresses(addressData);

        if (addressData) {
          for (let i = 0; i < addressData.length; i++) {
            if (addressData[i].isActive === true) {
              setCurrentCity(addressData[i].city);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAddress();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorAddress, setAnchorAddress] = useState(null);

  const open = Boolean(anchorEl);
  const openAddress = Boolean(anchorAddress);
  const dispatch = useDispatch();

  const handleChooseAddress = async (address) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/address/${address.id}`,
      );
      Swal.fire({
        title: 'Update Success!',
        text: 'you successfully updated your current Address',
        icon: 'success',
      });
      setCurrentCity(address.city);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update address!',
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddressClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAddress(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(functionLogout());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddressClose = () => {
    setAnchorAddress(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <nav className="flex justify-between p-3 bg-[#48744D]">
      <div className="flex gap-5">
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} />
        </Link>
        <div className="flex flex-col text-white">
          <div className="flex">
            <p>{currentCity ? 'Dikirimkan ke ' + currentCity : 'No Address'}</p>
            <Box
              sx={{
                display: 'flex-end',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleAddressClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAddress ? 'address-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAddress ? 'true' : undefined}
                ></IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorAddress}
              id="address-menu"
              open={openAddress}
              onClose={handleAddressClose}
              onClick={handleAddressClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {userAddresses.map((address) => (
                <Link href="/" key={address.id}>
                  <MenuItem onClick={() => handleChooseAddress(address)}>
                    {address.streetName}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
            <IoIosArrowDown className="ml-1 mt-1" />
          </div>
        </div>
      </div>
      {!userSelector?.id ? (
        <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
          <FaRegUser />
          <Link className="" href={'/auth/login'}>
            Login or Register
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <Box
              sx={{
                display: 'flex-end',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={`http://localhost:8000/${userSelector?.avatarURL}`}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Link href="/profile">
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
              </Link>
              <Link href="/orders">
                <MenuItem onClick={handleClose}>
                  <Avatar /> My Orders
                </MenuItem>
              </Link>

              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <IconButton onClick={handleDrawerOpen} aria-label="Open drawer">
              <FaShoppingCart />
            </IconButton>
          </div>

          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
          >
            <div style={{ width: 250 }}>
              {/* Drawer content */}
              <h1 className="text-xl font-bold">Cart</h1>
              {cartItems ? (
                cartItems.map((item) => (
                  <CartItem key={item.products.id} item={item} />
                ))
              ) : (
                <h1>No Items on Your cart</h1>
              )}
              <IconButton
                onClick={handleDrawerClose}
                sx={{ position: 'absolute', top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {cartItems.length > 0 ? (
              <div>
                <Link href="http://localhost:3000/transaction">
                  <Button variant="contained">Go To Transaction</Button>
                </Link>
              </div>
            ) : (
              <h1>Add Product to Cart</h1>
            )}
          </Drawer>
        </div>
      )}
    </nav>
  );
}
