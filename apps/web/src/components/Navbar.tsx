'use client';
import { useState, React, useEffect } from 'react';
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

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cart/1');
        const cartData = response.data;
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCart();

    return () => {
      // Cleanup logic
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Image src="/vercel.svg" width={50} height={50} />{' '}
        <div className="flex flex-col text-white">
          <div className="flex">
            <p>Dikirimkan ke jakarta</p>
            <IoIosArrowDown className="ml-1 mt-1" />
          </div>
          <p>Hari ini 07:00-08:00</p>
        </div>
      </div>

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
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
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

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 250 }}>
          {/* Drawer content */}
          <h2>Cart</h2>
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
        <div>
          <Link href="http://localhost:3000/transaction">
            <Button variant="contained">Go To Transaction</Button>
          </Link>
        </div>
      </Drawer>
    </nav>
  );
}
