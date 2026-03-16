'use client';

import { FC, useState } from 'react';
import { HiArrowRight, HiMenuAlt1 } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { ChevronDown, LogOut, Search, Settings, User } from 'lucide-react';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Input } from '../../components/ui/input';
import { AppState } from '../../state/store';
import { getInitials } from '../functions';
import { DarkThemeToggle } from '../ThemeToggle';

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface Notification {
  id: string;
  title: string;
  body: string;
  is_read: boolean;
}

const MainNavbar: FC<NavbarProps> = ({
  collapsed,
  setCollapsed,
  open,
  setOpen,
}) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { auth } = useSelector((state: AppState) => state.auth);

  console.log('auth xxx', auth);

  // --- Static notifications ---
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome',
      body: 'Welcome to your dashboard!',
      is_read: false,
    },
    {
      id: '2',
      title: 'Reminder',
      body: 'Your subscription renews soon.',
      is_read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const logout = () => {
    localStorage.removeItem('accessToken');
    router.replace('/');
  };

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="px-4 py-3 flex items-center justify-between lg:px-6">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <div className="flex md:hidden">
              {!open ? (
                <HiMenuAlt1
                  className="w-6 h-6 cursor-pointer text-teal-500 dark:text-teal-400"
                  onClick={() => setOpen(true)}
                />
              ) : (
                <HiArrowRight
                  className="w-6 h-6 cursor-pointer text-teal-500 dark:text-teal-400"
                  onClick={() => setOpen(false)}
                />
              )}
            </div>

            <div className="hidden md:block">
              {!collapsed ? (
                <HiMenuAlt1
                  className="w-6 h-6 cursor-pointer text-teal-500 dark:text-teal-400"
                  onClick={() => setCollapsed(true)}
                />
              ) : (
                <HiArrowRight
                  className="w-6 h-6 cursor-pointer text-teal-500 dark:text-teal-400"
                  onClick={() => setCollapsed(false)}
                />
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-50 border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <DarkThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDrawerOpen(true)}
              >
                {/* Static bell icon with unread count */}
                <span className="w-5 h-5 text-teal-500 dark:text-teal-400">
                  🔔
                </span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                      }
                    />
                    <AvatarFallback>
                      {getInitials(auth?.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-sm">
                    <p className="font-semibold flex gap-1 items-center text-gray-900 dark:text-white capitalize">
                      {auth?.username} <ChevronDown className="h-4 w-4" />
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-md">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium capitalize">
                      {auth?.username}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {auth?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  // onClick={() => router.push('/profile')}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  // onClick={() => router.push('/settings')}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Static Notification Drawer */}
    </>
  );
};

export default MainNavbar;
