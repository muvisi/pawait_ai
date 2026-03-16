import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { FC, ReactNode, useContext, useRef, useState } from 'react';

import FloatingChatWidget from '../../components/askai';
import MainNavbar from '../../components/Navbar';
import MainSidebar from '../../components/Sidebar';
import { ThemeContext } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      primary: { main: '#009688' },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {router.asPath.startsWith('/dashboard') ? (
        <div className="flex h-screen w-full overflow-hidden text-black dark:text-white relative">
          {/* Sidebar */}
          <div className="relative z-60">
            <div
              className={`hidden md:block h-full transition-all duration-300 bg-gray-100 dark:bg-gray-900 ${
                collapsed ? 'w-[64px]' : 'w-[250px]'
              }`}
            >
              <MainSidebar
                collapsed={collapsed}
                open={open}
                setOpen={setOpen}
              />
            </div>

            {open && (
              <div className="md:hidden h-full w-[250px] bg-gray-900 shadow-lg">
                <MainSidebar collapsed={false} open={open} setOpen={setOpen} />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full">
            <div className="z-50">
              <MainNavbar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <main
              ref={mainRef}
              className="relative bg-gray-50 dark:bg-gray-900 h-full w-full overflow-x-hidden overflow-y-scroll p-4 md:p-6"
            >
              <div className="relative z-10 w-full text-[#0d1718] dark:text-white">
                {children}
                <div style={{ height: 90 }} />
              </div>
              <FloatingChatWidget />
            </main>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen">{children}</div>
      )}
    </ThemeProvider>
  );
};

export default Layout;
