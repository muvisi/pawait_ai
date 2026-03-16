import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import Layout from '../Layouts/Dashboard';
import { ThemeProvider } from '../contexts/ThemeContext';
import { store } from '../state/store';
import '../styles/globals.css';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <NextNProgress
                color="#0694a2"
                startPosition={0.3}
                stopDelayMs={200}
                height={4}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />
              <Toaster
                position="bottom-right"
                containerStyle={{
                  zIndex: 99999, // Ensure it’s above all overlays/modals
                }}
              />
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}
