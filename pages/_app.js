import '@/styles/globals.css';
import { AuthProvider } from '../context/AuthProvider';
import { UserProvider } from '../context/userContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>

      <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}
