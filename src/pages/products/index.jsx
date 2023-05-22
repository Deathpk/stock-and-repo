import DataTable from "@/components/DataTable";
import { useContext, useState, useEffect } from "react";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { Transition } from "@headlessui/react";
import Modal from "@/components/Modal";
import { deleteProduct } from "@/services/api/products"; 
import { useRouter } from "next/router";
import DataTableRow from "@/components/DataTableRow";
import { SwalAlert } from "../_app";

export default function ProductList ({ products }) {
    
    let router = useRouter();
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Produtos Cadastrados");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function handleDeletion(targetId) {
        SwalAlert.fire({
            title: "Tem certeza que deseja apagar esse produto ?",
            text: "Tenha em mente que essa ação não poderá ser desfeita.",
            confirmButtonText: "Sim, remover produto",
            confirmButtonColor: "green",
            cancelButtonText: "Não, cancelar",
            cancelButtonColor: "red",
            showCancelButton: true,
            reverseButtons: true
        }).then(response => {
            if(response.isConfirmed) {
                proceedWithDeletion(targetId);
            }
        });
    }

    async function proceedWithDeletion(targetId) {
        await deleteProduct(targetId);
        SwalAlert.fire({
            title: "Produto deletado com sucesso!",
            icon: "success",
            timer: 3000
        });
        setTimeout(() => {
            router.reload();
        },5000);
    }

    const columnNamesMock = ['Id', 'Nome Produto', 'Marca', 'Categoria', 'Quantidade atual', 'Quantidade minima permitida em estoque', 'Preço de venda', 'Ações'];
    const [productData, setProductData] = useState(products || []);

    return (
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            <Head>
                <title>Lista de produtos</title>
            </Head>
            <DataTable 
                columns={columnNamesMock} 
                children=
                {
                    productData.products.map((product, index) => {
                        return (
                        <DataTableRow key={index} product={product} onDelete={handleDeletion}/>
                        )
                    })
                }
            />
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