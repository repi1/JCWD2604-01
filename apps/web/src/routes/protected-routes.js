/** @format */
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import LoadingPage from '@/components/loading';

const guestOnly = 'guestOnly';
const needLogin = 'needLogin';
const adminOnly = 'adminOnly';

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
// routes.push(new Route("/"));
routes.push(new Route('/auth/login', guestOnly));
routes.push(new Route('/auth/register', guestOnly));
routes.push(new Route('/auth/forgot-password', guestOnly));
routes.push(new Route('/auth/change-password', needLogin));
routes.push(new Route('/admin', adminOnly));
routes.push(new Route('/transaction', needLogin));
routes.push(new Route('/profile', needLogin));
routes.push(new Route('/history', needLogin));
routes.push(new Route('/orders', needLogin));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoute = routes.find((route) => pathname.includes(route.path));
    if (
      checkRoute?.type == adminOnly &&
      userSelector.role != 'storeAdmin' &&
      userSelector.role != 'superAdmin'
    ) {
      localStorage.setItem('path', pathname);

      return redirect('/auth/login');
    } else if (checkRoute?.type == needLogin && !userSelector.email) {
      localStorage.setItem('path', pathname);
      return redirect('/auth/login');
    } else if (checkRoute?.type == guestOnly && userSelector.email) {
      const path = localStorage.getItem('path');
      if (!userSelector.role.includes('Admin')) {
        if (path) {
          localStorage.removeItem('path');
          return redirect(path);
        }
        return redirect('/');
      }

      return redirect('/admin');
    } else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [children, userSelector.id, pathname]);

  return <div>{isLoading ? <LoadingPage /> : children}</div>;
}
