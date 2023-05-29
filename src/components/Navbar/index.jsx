import { useState, useRef, useContext } from "react";
import stockAndRepoLogo from "../../assets/images/stock-and-repo-logo.png";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { FaClipboardCheck, FaClipboardList, FaCog, FaRegTimesCircle, FaUpload, FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoIosAddCircle, IoIosListBox, IoMdPersonAdd, IoMdPeople, IoMdPricetag, IoMdPricetags } from 'react-icons/io';
import { HiDocumentReport, HiTrendingUp, HiCurrencyDollar, HiLogout } from 'react-icons/hi';

export default function NavBar() {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [showProductsDropDown, setShowProductsDropDown] = useState(false);
    const [showStockControlOptions, setShowStockControlOptions] = useState(false);
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const [showEmployeesOptions, setShowEmployeesOptions] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    const Menu = [
      {
        title: "Dashboard",
        subMenu: false,
        icon: <FaClipboardList/>,
        link: '/'
      },
      {
        title: "Funcionários",
        subMenu: true,
        icon: <IoMdPeople/>,
        active: showEmployeesOptions,
        setDropdown: setShowEmployeesOptions,
        subMenuItems: [
          { title: "Funcionários", link: "/", icon: <IoMdPeople className="inline mr-1" /> },
          { title: "Convidar funcionário", link: "/", icon: <IoMdPersonAdd className="inline mr-1"/> },
        ]
      },
      {
        title: "Produtos",
        subMenu: true,
        icon: <FaClipboardList/>,
        active: showProductsDropDown,
        setDropdown: setShowProductsDropDown,
        subMenuItems: [
          { title: "Listar", link: "/products", icon: <IoIosListBox className="inline mr-1" /> },
          { title: "Cadastrar", link: "/products/create", icon: <IoIosAddCircle className="inline mr-1"/> },
          { title: "Importar", link: "#", icon: <FaUpload className="inline mr-1"/> },
        ]
      },
      {
        title: "Lançamentos",
        subMenu: true,
        icon: <FaClipboardCheck/>,
        active: showStockControlOptions,
        setDropdown: setShowStockControlOptions,
        subMenuItems: [
          { title: "Lançar baixa", link: "/products/writedown" },
          { title: "Lançar adição", link: "#" },
        ]
      },
      {
        title: "Relatórios",
        subMenu: true,
        icon: <HiDocumentReport/>,
        active: showReportsOptions,
        setDropdown: setShowReportsOptions,
        subMenuItems: [
          { title: "Vendas", link: "/products/reports/sales", icon:<HiCurrencyDollar className="inline mr-1" /> },
          { title: "Mais vendidos", link: "/products/reports/sales/most-sold", icon:<HiTrendingUp className="inline mr-1" /> },
          { title: "Baixas em estoque", link: "/products/reports/inventory-writedown", icon:<HiTrendingUp className="inline mr-1" /> },

        ]
      },
      {
        title: "Lista de compras",
        subMenu: false,
        icon: <FaShoppingCart/>,
        link: '/'
      },
      {
        title: "Categorias",
        subMenu: false,
        icon: <IoMdPricetag/>,
        link: '/configs'
      },
      {
        title: "Marcas",
        subMenu: false,
        icon: <IoMdPricetags/>,
        link: '/configs'
      },
      {
        title: "Configurações",
        subMenu: false,
        icon: <FaCog/>,
        link: '/configs'
      },
      {
        title: "Logout",
        subMenu: false,
        handler: handleSignOut,
        icon: <HiLogout/>,
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
          <div 
            className="flex items-center p-2 
            text-gray-900 rounded-lg 
            dark:text-white cursor-pointer 
            hover:bg-gray-100 
            dark:hover:bg-gray-700"
            onClick={() => menu.setDropdown(!menu.active)}
            >
            <span>{menu.icon ?? ''}</span>
            <span className="ml-3 mr-5">{menu.title}</span>
            <IoMdArrowDropdown className={`${menu.active && 'rotate-180'}`}/>
          </div>
        );
      }

      if(menu.handler) {
        return(
          <button 
            className="flex px-2 py-2 
            hover:bg-gray-100 cursor-pointer 
            dark:hover:bg-gray-600 
            dark:hover:text-white"
            onClick={() => menu.handler()}
            >
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
  }