import DataTable from "@/components/DataTable";
import { useContext, useState, useEffect } from "react";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { deleteProduct } from "@/services/api/products"; 
import { useRouter } from "next/router";
import DataTableRow from "@/components/DataTableRow";
import { SwalAlert } from "../_app";
import Pagination from "@/components/Pagination";
import convert from "@/utils/moneyMask";
import DataTableActions from "@/components/DataTableActions";

export default function ProductList ({ products, currentPageData, lastPageData, totalItemsData  }) {
    
    let router = useRouter();
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Produtos Cadastrados");
    const [productData, setProductData] = useState(products || []);
    const [currentPage, setCurrentPage] = useState(currentPageData || 1);
    let lastPage = lastPageData;
    let totalItems = totalItemsData;

    useEffect(() => {
        async function fetchProducts () {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/products?page=${currentPage}`);
            setProductData(response.data.data);
        }
        
        fetchProducts();
    }, [currentPage])

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

    function resolveActions(targetId) {
       return(
            <DataTableActions actions={
                    <>
                        <a href={`/products/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Detalhes</a>
                        <a href={`/product-edit/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Editar</a>
                        <a onClick={() => {handleDeletion(targetId)}} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Deletar</a>
                    </>
                } 
            />
       )
    }

    const columnNamesMock = ['Id', 'Nome Produto', 'Marca', 'Categoria', 'Quantidade atual', 'Quantidade minima permitida em estoque', 'Preço de venda', 'Ações'];

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
                            <>
                                <DataTableRow key={index} data={[
                                    product.id,
                                    product.name,
                                    product.brand.name,
                                    product.category.name,
                                    product.quantity,
                                    product.minimum_quantity,
                                    convert(product.selling_price)
                                    ]} 
                                    actions={resolveActions(product.id)}
                                />
                            </>
                        )
                    })
                }
            />
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                totalItems={totalItems}
                onPageChange={(page) => {setCurrentPage(page)}}
            />
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/products');
    
    return {
        props: {
            products: response.data.data,
            currentPageData: response.data.meta.current_page,
            lastPageData: response.data.meta.last_page,
            totalItemsData: response.data.meta.total
        }
    }
});