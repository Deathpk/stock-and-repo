import { createContext, useState } from "react";

export const NavbarTitleContext = createContext({
    title: '',
    updateNavbarTitle: (title) => {},
});

export function NavbarTitleContextProvider(props) {
    const [navbarTitle, setNavbarTitle] = useState();

    function updateNavbarTitleHandler(title) {
        setNavbarTitle(title);
    }

    const context = {
        title: navbarTitle,
        updateNavbarTitle: updateNavbarTitleHandler
    };

    return (
        <NavbarTitleContext.Provider value={context}>
            {props.children}
        </NavbarTitleContext.Provider>
    )
}