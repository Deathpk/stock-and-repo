import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { setupAPIClient } from "@/services/api/api";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import Head from "next/head";
import { useContext } from "react";

export default function ProductDetails ({ details }) {
    console.log(details);
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Detalhes do produto");

    return(
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl text-black">
            <Head>
                <title>Detalhes do produto</title>
            </Head>
            <div className="flex-col">
                <h1 className="text-center text-3xl">{details.name}</h1>
                <div>
                    <div className="text-2xl pt-5">Marca: {details.brand.name}</div>
                    <div className="text-2xl py-2">Categoria: {details.category.name}</div>
                    <div className="py-5 text-2xl">Descrição: {details.description}</div>
                    <div className="text-2xl py-2">Quantidade em estoque: {details.quantity}</div>
                    <div className="text-2xl py-2">Quantidade mínima para reposição: {details.minimum_quantity}</div>
                    <div className="text-2xl py-2">Preço de custo: {details.paid_price} $</div>
                    <div className="text-2xl py-2">Preço de venda: {details.selling_price} $</div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    const { params } = context;
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get(`/products/${params.productId}`);
    console.log(response);
    return {
       props: { details: response.data.product }
    }
});