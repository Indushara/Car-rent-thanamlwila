'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Button from '@/components/Button';
import { isAdminLoggedIn, logoutAdmin } from '@/utils/admin';

export default function AdminSettings() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your admin account and preferences</p>
        </div>

        <div className="space-y-6 max-w-2xl">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="admin@thanamlwila.com"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Security</h2>
            <div className="space-y-4">
              <Button variant="outline" size="md">
                Change Password
              </Button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <Button variant="danger" size="md" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
