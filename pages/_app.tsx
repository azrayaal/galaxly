import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../firebase/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../firebase/portectedauth';

const noAuthRequired = ['/', '/loginpage', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const route = useRouter();
  return (
    <AuthContextProvider>
      {noAuthRequired.includes(route.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
