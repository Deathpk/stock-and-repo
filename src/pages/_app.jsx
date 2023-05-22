import '@/styles/globals.css'
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import NavBar from '@/components/Navbar';
import { NavbarTitleContextProvider } from '@/contexts/NavbarTitleContext';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const SwalAlert = withReactContent(Swal);

export default function App({ Component, pageProps }) {
  const [navbarTitle, setNavbarTitle] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  return(
    <>
      <AuthProvider>
        <NavbarTitleContextProvider>
          <NavBar/>
          <Component {...pageProps}/>
        </NavbarTitleContextProvider>
      </AuthProvider>
    </>
  );
}
