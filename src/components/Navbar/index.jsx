import { useState, useRef, useContext } from "react";
import stockAndRepoLogo from "../../assets/images/stock-and-repo-logo.png";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { FaClipboardCheck, FaClipboardList } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlinePlusCircle, AiOutlineOrderedList } from 'react-icons/ai';

export default function NavBar() {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [showProductsDropDown, setShowProductsDropDown] = useState(false);
    const [showStockControlOptions, setShowStockControlOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    const Menu = [
      {
        title: "Dashboard"
      },
      {
        title: "Produtos",
        subMenu: true,
        icon: <FaClipboardList/>,
        active: showProductsDropDown,
        setDropdown: setShowProductsDropDown,
        subMenuItems: [
          { title: "Listar", link: "/products", icon: <AiOutlineOrderedList className="inline mr-1" /> },
          { title: "Cadastrar", link: "/product-create", icon: <AiOutlinePlusCircle className="inline mr-1"/> },
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
        icon: <FaClipboardCheck/>,
        active: showReportsOptions,
        setDropdown: setShowReportsOptions,
        subMenuItems: [
          { title: "Relatório de vendas", link: "/products/reports/sales" },
          { title: "Produtos com mais saída", link: "#" },
        ]
      }
    ]

    function getNavbarTitle() {
      return(
        <>
          <header classNameName="bg-white shadow">
            <div classNameName="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 classNameName="text-3xl font-bold text-gray-900">{navbarTitleContext.title}</h1>
            </div>
          </header>
          <main>
            <div classNameName="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8"/>
          </main>
        </>
      );
    }

    function handleSignOut() {
      signOut();
    }

    return (
      <div>
        {
          isAuthenticated ? getNavbarTitle() : ''
        }
        <button type="button" onClick={() => setMobileMenuActive(!mobileMenuActive)}  className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        
        <aside id="sidebar-multi-level-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!mobileMenuActive && '-translate-x-full sm:translate-x-0'}`} aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                {
                  Menu.map((menu, index) => {
                    return(
                    <>
                      <li key={index} className="transition-transform">
                        {
                          menu.subMenu && 
                          (
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                              <span>{menu.icon ?? ''}</span>
                              <span className="ml-3 mr-5">{menu.title}</span>
                              <IoMdArrowDropdown className={`cursor-pointer ${menu.active && 'rotate-180'}`}onClick={() => menu.setDropdown(!menu.active)} />
                            </div>
                          ) 
                          ||
                          (
                            <Link
                                href="#"
                                classNameName="flex -translate-y-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <span>{menu.icon ?? ''}</span>
                              <span className="ml-3 mr-5">{menu.title}</span>
                            </Link>
                          )
                        }
                      </li>
                      {
                        menu.subMenu && menu.active && 
                        (
                          <ul className="transition-all">
                            {
                              menu.subMenuItems.map((subMenu, index) => {
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
                    </>
                  )
                })}
              </ul>
          </div>
        </aside>
    </div>
    )



    // function handleSignOut() {
    //   signOut();
    // }

  
    // return (
    //   <div classNameName={`${isAuthenticated ? '' : 'hidden'}`}>
    //     <Head>
    //       <title>Cadastrar produto</title>
    //     </Head>
    //     <nav classNameName="bg-gray-800">
    //       <div classNameName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //         <div classNameName="flex items-center justify-between h-16">
    //           <div classNameName="flex items-center">
    //             <div classNameName="flex-shrink-0 mt-6">
    //               <Image
    //                 classNameName="h-[180px] w-full"
    //                 src={stockAndRepoLogo}
    //                 alt="stock and repo logo"
    //               />
    //             </div>
    //             <div classNameName="hidden md:block">
    //                 <ul classNameName="ml-10 flex items-baseline space-x-4">
    //                   {
    //                     !isAuthenticated ?
    //                     <li onClick={() => {}}>
    //                       <Link
    //                           href="/"
    //                           classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                       >
    //                         Registre-se
    //                       </Link>
    //                       <Link
    //                         href="/"
    //                           classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                       >
    //                           Login
    //                       </Link>
    //                     </li>
    //                     : <li></li>
    //                   }
    //                     <li>
    //                         <a
    //                             href="/"
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Dashboard
    //                         </a>
    //                     </li>

    //                     <li onClick={handleProductDropDown}>
    //                         <button
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2  rounded-md text-sm font-medium"
    //                         >
    //                             Produtos
    //                         </button>
    //                         {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" classNameName={`${showDropdownOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                           <ul classNameName="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                               <li>
    //                                   <Link href="/products" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Produtos Cadastrados</Link>
    //                               </li>
    //                               <li>
    //                                   <Link href="/product-create" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cadastrar produto</Link>
    //                               </li>
    //                           </ul>
    //                         </div>
    //                     </li>


    //                     <li onClick={handleStockControlDropDown}>
    //                         <button
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Lançamentos
    //                         </button>
    //                             {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" classNameName={`${showStockControlOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                             <ul classNameName="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                                 <li>
    //                                     <Link href="/create-sale" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar venda</Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link href="/product-writedown" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar baixa de estoque</Link>
    //                                 </li>
    //                             </ul>
    //                         </div>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Configurações
    //                         </Link>
    //                     </li>


    //                     <li onClick={handleReportsDropDown}>
    //                         <button
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Relatórios
    //                         </button>
    //                             {/* <!-- Dropdown menu --> */}
    //                         <div id="dropdown" classNameName={`${showReportsOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                             <ul classNameName="py-2 text-sm text-gray-700 dark:text-gray-200">
    //                                 <li>
    //                                     <Link href="/products/reports/sales" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Relatório de vendas</Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Produtos com mais saída</Link>
    //                                 </li>
    //                             </ul>
    //                         </div>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Categorias
    //                         </Link>
    //                     </li>

    //                     <li>
    //                         <Link
    //                             href="#"
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Marcas Cadastradas
    //                         </Link>
    //                     </li>
    //                     {
    //                       isAuthenticated ?
    //                       <li onClick={handleSignOut}>
    //                         <button
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                         >
    //                             Logout
    //                         </button>
    //                       </li>
    //                       : <li></li>
    //                     }
    //                 </ul>
    //             </div>
    //           </div>
    //           <div classNameName="-mr-2 flex md:hidden">
    //             <button
    //               onClick={() => setIsOpen(!isOpen)}
    //               type="button"
    //               classNameName="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    //               aria-controls="mobile-menu"
    //               aria-expanded="false"
    //             >
    //               <span classNameName="sr-only">Open main menu</span>
    //               {!isOpen ? (
    //                 <svg
    //                   classNameName="block h-6 w-6"
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
    //                   classNameName="block h-6 w-6"
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
    //           <div classNameName="md:hidden" id="mobile-menu">
    //               <ul ref={ref} classNameName="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    //                   <li>
    //                       <Link
    //                       href="#"
    //                       classNameName="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
    //                       >
    //                       Dashboard
    //                       </Link>
    //                   </li>
  
    //                   <li onClick={() =>setShowDropdownOptions(!showDropdownOptions) }>
    //                       <Link
    //                       href="#"
    //                       classNameName="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                       >
    //                       Produtos
    //                       </Link>
    //                       <div id="dropdown" classNameName={`${showDropdownOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                           <ul classNameName="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    //                             <li>
    //                                 <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
    //                             </li>
    //                             <li>
    //                                 <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
    //                             </li>
    //                           </ul>
    //                       </div>
    //                   </li>
                      
    //                   <li onClick={() => {setShowStockControlOptions(!showStockControlOptions)}}>
    //                           <Link
    //                               href="#"
    //                               classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
    //                           >
    //                               Controle de estoque
    //                           </Link>
    //                               {/* <!-- Dropdown menu --> */}
    //                           <div id="dropdown" classNameName={`${showStockControlOptions ? '' : 'hidden'} z-10 absolute mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //                               <ul classNameName="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    //                                   <li>
    //                                       <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar venda</Link>
    //                                   </li>
    //                                   <li>
    //                                       <Link href="#" classNameName="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lançar baixa de estoque</Link>
    //                                   </li>
    //                               </ul>
    //                           </div>
    //                       </li>
  
    //                   <Link
    //                   href="#"
    //                   classNameName="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Configurações
    //                   </Link>
  
    //                   <Link
    //                   href="#"
    //                   classNameName="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Relatórios
    //                   </Link>
  
    //                   <Link
    //                   href="#"
    //                   classNameName="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Marcas cadastradas
    //                   </Link>
    //                   <Link
    //                   href="#"
    //                   classNameName="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    //                   >
    //                   Categorias
    //                   </Link>
    //                   {
    //                     isAuthenticated ?
    //                     <li onClick={() => {handleSignOut}}>
    //                         <button
    //                             classNameName=" hover:bg-gray-700 hover:text-white text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
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