'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Button } from '../../components/ui/button';
type SidebarIcon = (props: any) => React.ReactElement;

interface SidebarProps {
  collapsed: boolean;
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NavItem {
  tab: string;
  label: string;
  path: string;
  icon: SidebarIcon;
}

const navItems: NavItem[] = [
  {
    tab: 'dashboard',
    icon: TbLayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
  },
];

export default function MainSidebar({
  collapsed,
  className = '',
  open,
  setOpen,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const current = navItems.find((i) => i.path === pathname);
    if (current) setActiveTab(current.tab);
  }, [pathname]);

  const handleClick = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
    setOpen(false);
  };

  if (collapsed) {
    return (
      <div
        className={`fixed top-0 left-0 h-full w-16 px-2 bg-white dark:bg-gray-800 border-r shadow-sm flex flex-col items-center py-4 space-y-4 z-50 ${className}`}
      >
        <div className="flex pb-2 border-b items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img className="w-full h-full object-cover" src="/favicon.png" />
          </div>
        </div>

        {navItems.map(({ tab, icon: Icon, label, path }) => (
          <div key={tab} className="relative group">
            <Button
              onClick={() => handleClick(tab, path)}
              className={`p-2 w-12 h-12 flex items-center justify-center rounded-md
                ${
                  activeTab === tab
                    ? 'bg-teal-500 text-white border-l-2 border-amber-300 hover:bg-teal-400'
                    : 'text-gray-500 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </Button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Expanded Sidebar
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r shadow-sm transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${className}`}
      >
        <nav className="p-6 space-y-6 h-full overflow-y-auto">
          <div className="flex pb-5 border-b items-center gap-2">
            <div className=" h-12 rounded-xl flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="/images/logo2.png"
              />
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map(({ tab, icon: Icon, label, path }) => (
              <Button
                key={tab}
                onClick={() => handleClick(tab, path)}
                className={`w-full justify-start
                  ${
                    activeTab === tab
                      ? 'bg-teal-500 text-white hover:bg-teal-400 !border-l-4 !border-amber-300'
                      : 'text-gray-500 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
