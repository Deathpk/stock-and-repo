import DataTable from "@/components/DataTable";
import { useContext, useState } from "react";
import { getProducts } from "@/services/api/products";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";


export default function ProductList ({ products }) {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Produtos Cadastrados");

    const columnNamesMock = ['Id', 'Nome Produto', 'Marca', 'Categoria', 'Quantidade atual', 'Quantidade minima permitida em estoque', 'Preço de venda', 'Ações'];
    const [productData, setProductData] = useState(products || []);
    
    return (
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            <Head>
                <title>Lista de produtos</title>
            </Head>
            <DataTable data={productData} columns={columnNamesMock} />
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/products');
    
    return {
        props: {products: response.data.data}
    }
});