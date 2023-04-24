import '@/styles/globals.css'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/Navbar';
import { NavbarTitleContextProvider } from '@/contexts/NavbarTitleContext';

export default function App({ Component, pageProps }) {
  return(
    <>
      <AuthProvider>
        <ToastContainer outClose={5000} />
        <NavbarTitleContextProvider>
          <NavBar/>
          <Component {...pageProps} />
        </NavbarTitleContextProvider>
      </AuthProvider>
    </>
  );
}
