'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAdminLoggedIn } from '@/utils/admin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      if (pathname !== '/admin/login') {
        if (!isAdminLoggedIn()) {
          router.push('/admin/login');
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (pathname !== '/admin/login' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
}
