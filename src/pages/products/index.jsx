import DataTable from "@/components/DataTable";
import { useContext, useState, useEffect } from "react";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { Transition } from "@headlessui/react";
import Modal from "@/components/Modal";
import { deleteProduct } from "@/services/api/products"; 
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ProductList ({ products }) {
    let router = useRouter();
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Produtos Cadastrados");
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productId, setProductId] = useState();

    function handleDeletion(targetId) {
        setProductId(targetId);
        setShowDeleteModal(true);
    }

    function deletionConfirmation(response) {
        setShowDeleteModal(false);
        if(response) {
            console.log(response);
            proceedWithDeletion();
        }
    }

    function deleteModalBody() {
        return(
            <div className="flex justify-between px-24 py-3">
                <button onClick={() => {deletionConfirmation(true)}} className="text-white bg-green-500 py-2 px-4 rounded-md">Sim</button>
                <button onClick={() => {deletionConfirmation(false)}} className="text-white bg-red-600 py-2 px-4 rounded-md">Não</button>
            </div>
        );
    }

    async function proceedWithDeletion() {
        await deleteProduct(productId);
        toast.success("Produto deletado com sucesso!");
        setTimeout(() => {
            router.reload();
        },5000);
    }

    const columnNamesMock = ['Id', 'Nome Produto', 'Marca', 'Categoria', 'Quantidade atual', 'Quantidade minima permitida em estoque', 'Preço de venda', 'Ações'];
    const [productData, setProductData] = useState(products || []);

    return (
        <>
            <Transition
            show={showDeleteModal}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 scale-85"
            enterhref="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leavehref="opacity-0 scale-95"
            >
                {
                    showDeleteModal &&
                    <Modal 
                        primaryMessage="Tem certeza que deseja apagar esse produto ?"
                        secondaryMessage="Tenha em mente que essa ação não poderá ser desfeita."
                        body={deleteModalBody} 
                    />
                }
            </Transition>

            <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
                <Head>
                    <title>Lista de produtos</title>
                </Head>
                <DataTable data={productData} columns={columnNamesMock} onDelete={handleDeletion} />
            </div>
        </>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/products');
    
    return {
        props: {products: response.data.data}
    }
});