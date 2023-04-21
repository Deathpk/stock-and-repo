import '@/styles/globals.css'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from '@/contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return(
    <>
      <AuthProvider>
        <ToastContainer outClose={5000} />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
