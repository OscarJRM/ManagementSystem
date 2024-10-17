"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package, BarChart2, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';

const menuItems = [
  { href: '/orders', label: 'Manage Orders', icon: Package },
  { href: '/reports', label: 'View Reports', icon: BarChart2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="flex h-screen bg-background">
      <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4`}>
        <h1 className={`text-2xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Order Management</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}