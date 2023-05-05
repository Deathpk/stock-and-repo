import '@/styles/globals.css'
import { ToastContainer } from "react-toastify";
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/Navbar';
import { NavbarTitleContextProvider } from '@/contexts/NavbarTitleContext';
import { useContext, useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const [navbarTitle, setNavbarTitle] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  return(
    <>
      <AuthProvider>
        <ToastContainer outClose={5000} />
        <NavbarTitleContextProvider>
          <NavBar/>
          <Component {...pageProps}/>
        </NavbarTitleContextProvider>
      </AuthProvider>
    </>
  );
}
