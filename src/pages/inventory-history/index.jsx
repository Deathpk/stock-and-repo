import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import Head from "next/head";
import { useContext } from "react";

export default function InventoryHistory() {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Histórico de Lançamentos");

    return(
        <div className="">
            <Head>
                <title>Histórico de Lançamentos</title>
            </Head>
        </div>
    );
}