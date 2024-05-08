'use client';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import ButtonBase from '@mui/material/ButtonBase';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AccessTime, ExitToApp, SupervisorAccount } from '@mui/icons-material';
import { functionLogout } from '@/redux/slices/userSlice';
import { FaStore } from 'react-icons/fa6';

const drawerWidth = 240;
const link = [
  { id: 1, route: '/admin', name: 'Dashboard', icon: <HomeIcon /> },
  {
    id: 2,
    route: '/admin/manage-user',
    name: 'Manage Users',
    icon: <SupervisorAccount />,
  },
  {
    id: 3,
    route: '/admin/stock-history',
    name: 'Stock History',
    icon: <AccessTime />,
  },
  {
    id: 4,
    route: '/admin/sales-report',
    name: 'Sales Report',
    icon: <TrendingUpIcon />,
  },
  {
    id: 5,
    route: '/admin/stores',
    name: 'Stores',
    icon: <FaStore />,
  },
];
export default function Sidebar({ handleDrawerToggle }) {
  // const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
  };
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={!isMobile || handleDrawerToggle}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      <div>
        <List>
          {link.map((val, index) => (
            <ButtonBase
              key={val.id}
              onClick={() => router.push(val.route)}
              style={{ display: 'block', textAlign: 'initial', width: '100%' }}
            >
              <ListItem>
                <ListItemIcon>{val.icon}</ListItemIcon>
                <ListItemText primary={val.name} />
              </ListItem>
            </ButtonBase>
          ))}
          <ButtonBase
            onClick={logout}
            style={{ display: 'block', textAlign: 'initial', width: '100%' }}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </ButtonBase>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}
