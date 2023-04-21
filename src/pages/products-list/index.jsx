import DataTable from "@/components/DataTable";
import { useState } from "react";
import { getProducts } from "@/services/api/products";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";


export default function ProductList ({ products }) {
    const columnNamesMock = ['Id', 'Nome Produto', 'Marca', 'Categoria', 'Quantidade atual', 'Quantidade minima permitida em estoque', 'Preço de venda', 'Ações'];
    const [productData, setProductData] = useState(products || []);
    return (
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            <Head>
                <title>Lista de produtos</title>
            </Head>
            <h1 className="text-3xl font-semibold text-center text-white mt-12 mb-6">
                Lista de produtos
            </h1>
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