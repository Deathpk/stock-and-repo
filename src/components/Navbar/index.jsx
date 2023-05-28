import { useState, useRef, useContext } from "react";
import stockAndRepoLogo from "../../assets/images/stock-and-repo-logo.png";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { FaClipboardCheck, FaClipboardList, FaCog, FaRegTimesCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoIosAddCircle, IoIosListBox } from 'react-icons/io';
import { HiDocumentReport, HiTrendingUp, HiCurrencyDollar } from 'react-icons/hi';

export default function NavBar() {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [showProductsDropDown, setShowProductsDropDown] = useState(false);
    const [showStockControlOptions, setShowStockControlOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    const Menu = [
      {
        title: "Dashboard",
        subMenu: false,
        icon: <FaClipboardList/>,
        link: '/'
      },
      {
        title: "Produtos",
        subMenu: true,
        icon: <FaClipboardList/>,
        active: showProductsDropDown,
        setDropdown: setShowProductsDropDown,
        subMenuItems: [
          { title: "Listar", link: "/products", icon: <IoIosListBox className="inline mr-1" /> },
          { title: "Cadastrar", link: "/product-create", icon: <IoIosAddCircle className="inline mr-1"/> },
        ]
      },
      {
        title: "Lançamentos",
        subMenu: true,
        icon: <FaClipboardCheck/>,
        active: showStockControlOptions,
        setDropdown: setShowStockControlOptions,
        subMenuItems: [
          { title: "Lançar venda", link: "#" },
          { title: "Lançar baixa", link: "#" },
        ]
      },
      {
        title: "Relatórios",
        subMenu: true,
        icon: <HiDocumentReport/>,
        active: showReportsOptions,
        setDropdown: setShowReportsOptions,
        subMenuItems: [
          { title: "Relatório de vendas", link: "/products/reports/sales", icon:<HiCurrencyDollar className="inline mr-1" /> },
          { title: "Mais vendidos", link: "#", icon:<HiTrendingUp className="inline mr-1" /> },
        ]
      },
      {
        title: "Categorias",
        subMenu: false,
        icon: <FaCog/>,
        link: '/configs'
      },
      {
        title: "Marcas",
        subMenu: false,
        icon: <FaCog/>,
        link: '/configs'
      },
      {
        title: "Logout",
        subMenu: false,
        handler: handleSignOut,
        icon: <FaClipboardList/>,
      },
      {
        title: "Configurações",
        subMenu: false,
        icon: <FaCog/>,
        link: '/configs'
      },
    ]

    function getNavbarTitle() {
      return(
        <>
          <header className="bg-white shadow p-4 sm:ml-64">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">{navbarTitleContext.title}</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8"/>
          </main>
        </>
      );
    }

    function handleSignOut() {
      signOut();
    }

    function resolveMenu(menu) {
      if(menu.subMenu) {
        return(
          <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span>{menu.icon ?? ''}</span>
            <span className="ml-3 mr-5">{menu.title}</span>
            <IoMdArrowDropdown className={`cursor-pointer ${menu.active && 'rotate-180'}`}onClick={() => menu.setDropdown(!menu.active)} />
          </div>
        );
      }

      if(menu.handler) {
        return(
          <button onClick={() => menu.handler()} className=" flex px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <span>{menu.icon ?? ''}</span>
            <span className="ml-3 mr-5">{menu.title}</span>
          </button>
        );
      }

      return(
        <Link
        href={menu.link ?? '/'}
        className=" flex px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span>{menu.icon ?? ''}</span>
          <span className="ml-3 mr-5">{menu.title}</span>
        </Link>
      );
    }

    function resolveSubMenus(subItems) {
      return(
        <ul className="transition-all">
          {
            subItems.map((subMenu, index) => {
              return(
                <li key={index}>
                  <Link href={subMenu.link} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{subMenu.icon ?? ''}{subMenu.title}</Link>
                </li>
              )
            })
          }
        </ul>
      )
    }

    return (
      <div>
        {
          isAuthenticated ? getNavbarTitle() : ''
        }
        <button type="button" onClick={() => setMobileMenuActive(!mobileMenuActive)}  className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-black rounded-lg sm:hidden hover:text-slate-700">
          <span className="sr-only">Abrir o menu lateral</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        {
          mobileMenuActive && (
            <button type="button" onClick={() => setMobileMenuActive(false)}  className="inline-flex items-center text-sm text-black rounded-lg sm:hidden hover:text-slate-700 focus:outline-none focus:ring-2  float-right mr-5">
            <span className="sr-only">Fechar o menu lateral</span>
              <FaRegTimesCircle size={20}/>
            </button>
          )
        }
        
        <aside id="sidebar-multi-level-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!mobileMenuActive && '-translate-x-full sm:translate-x-0'}`} aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center pl-2.5 mb-5">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Stock && Repo</span>
              </div>
              <ul className="space-y-2 font-medium">
                {
                  Menu.map((menu, index) => {
                    return(
                      <>
                        <li key={index} className="transition-transform">
                          { resolveMenu(menu) }
                        </li>
                        {
                          menu.subMenu && menu.active && 
                          (
                            resolveSubMenus(menu.subMenuItems)
                          )
                        }
                      </>
                    )
                  })
                }
              </ul>
          </div>
        </aside>
      </div>
    )



    // function handleSignOut() {
    //   signOut();
    // }

  
    // return (
    //   <div className={`${isAuthenticated ? '' : 'hidden'}`}>
    //     <Head>
    //       <title>Cadastrar produto</title>
    //     </Head>
    //     <nav className="bg-gray-800">
    //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //         <div className="flex items-center justify-between h-16">
    //           <div className="flex items-center">
    //             <div className="flex-shrink-0 mt-6">
                  // <Image
                  //   className="h-[180px] w-full"
                  //   src={stockAndRepoLogo}
                  //   alt="stock and repo logo"
                  // />
    //             </div>
    //             <div className="hidden md:block">
    //                 <ul className="ml-10 flex items-baseline space-x-4">
    //                   {
    //                     !isAuthenticated ?
    //                     <li onClick={() => {}}>
    //                       <Link
    //                           href="/"
    //                           className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                       >
    //                         Registre-se
    //                       </Link>
    //                       <Link
    //                         href="/"
    //                           className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                       >
    //                           Login
    //                       </Link>
    //                     </li>
    //                     : <li></li>
    //                   }
    //                     <li>
    //                         <a
    //                             href="/"
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Dashboard
    //                         </a>
    //                     </li>

    //                     <li onClick={handleProductDropDown}>
    //                         <button
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2  rounded-md text-sm font-medium"
    //                         >
    //                             Produtos
    //                         </button>
    //                         {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" className={`${showDropdownOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                               <li>
    //                                   <Link href="/products" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Produtos Cadastrados</Link>
    //                               </li>
    //                               <li>
    //                                   <Link href="/product-create" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cadastrar produto</Link>
    //                               </li>
    //                           </ul>
    //                         </div>
    //                     </li>


    //                     <li onClick={handleStockControlDropDown}>
    //                         <button
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Lançamentos
    //                         </button>
    //                             {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" className={`${showStockControlOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                                 <li>
    //                                     <Link href="/create-sale" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar venda</Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link href="/product-writedown" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar baixa de estoque</Link>
    //                                 </li>
    //                             </ul>
    //                         </div>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Configurações
    //                         </Link>
    //                     </li>


    //                     <li onClick={handleReportsDropDown}>
    //                         <button
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Relatórios
    //                         </button>
    //                             {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" className={`${showReportsOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                                 <li>
    //                                     <Link href="/products/reports/sales" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Relatório de vendas</Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Produtos com mais saída</Link>
    //                                 </li>
    //                             </ul>
    //                         </div>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Categorias
    //                         </Link>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Marcas Cadastradas
    //                         </Link>
    //                     </li>
    //                     {
    //                       isAuthenticated ?
    //                       <li onClick={handleSignOut}>
    //                         <button
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Logout
    //                         </button>
    //                       </li>
    //                       : <li></li>
    //                     }
    //                 </ul>
    //             </div>
    //           </div>
    //           <div className="-mr-2 flex md:hidden">
    //             <button
    //               onClick={() => setIsOpen(!isOpen)}
    //               type="button"
    //               className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    //               aria-controls="mobile-menu"
    //               aria-expanded="false"
    //             >
    //               <span className="sr-only">Open main menu</span>
    //               {!isOpen ? (
    //                 <svg
    //                   className="block h-6 w-6"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M4 6h16M4 12h16M4 18h16"
    //                   />
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   className="block h-6 w-6"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M6 18L18 6M6 6l12 12"
    //                   />
    //                 </svg>
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
          // <Transition
          //   show={isOpen}
          //   enter="transition ease-out duration-100 transform"
          //   enterFrom="opacity-0 scale-95"
          //   enterhref="opacity-100 scale-100"
          //   leave="transition ease-in duration-75 transform"
          //   leaveFrom="opacity-100 scale-100"
          //   leavehref="opacity-0 scale-95"
    //       >
    //         {/* Mobile Menu */}
    //           <div className="md:hidden" id="mobile-menu">
    //               <ul ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    //                   <li>
    //                       <Link
    //                       href="#"
    //                       className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
    //                       >
    //                       Dashboard
    //                       </Link>
    //                   </li>
  
    //                   <li onClick={() =>setShowDropdownOptions(!showDropdownOptions) }>
    //                       <Link
    //                       href="#"
    //                       className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                       >
    //                       Produtos
    //                       </Link>
    //                       <div id="dropdown" className={`${showDropdownOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    //                             <li>
    //                                 <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
    //                             </li>
    //                           </ul>
    //                       </div>
    //                   </li>
                      
    //                   <li onClick={() => {setShowStockControlOptions(!showStockControlOptions)}}>
    //                           <Link
    //                               href="#"
    //                               className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                           >
    //                               Controle de estoque
    //                           </Link>
    //                               {/* <!-- Dropdown menu --> */}
    //                           <div id="dropdown" className={`${showStockControlOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                               <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    //                                   <li>
    //                                       <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar venda</Link>
    //                                   </li>
    //                                   <li>
    //                                       <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar baixa de estoque</Link>
    //                                   </li>
    //                               </ul>
    //                           </div>
    //                       </li>
  
    //                   <Link
    //                   href="#"
    //                   className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Configurações
    //                   </Link>
  
    //                   <Link
    //                   href="#"
    //                   className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Relatórios
    //                   </Link>
  
    //                   <Link
    //                   href="#"
    //                   className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Marcas cadastradas
    //                   </Link>
    //                   <Link
    //                   href="#"
    //                   className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Categorias
    //                   </Link>
    //                   {
    //                     isAuthenticated ?
    //                     <li onClick={() => {handleSignOut}}>
    //                         <button
    //                             className=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Logout
    //                         </button>
    //                     </li>
    //                     : <li></li>
    //                   }
    //               </ul>
    //           </div>
    //       </Transition>
    //     </nav>
    //   </div>
    // );
  }