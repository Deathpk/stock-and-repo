import SearchAbleSelect from "@/components/SearchAbleSelect";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { productAutocomplete, productWriteDown } from "@/services/api/products";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import convert from "@/utils/moneyMask";
import Head from "next/head";
import { useContext, useState } from "react";
import { SwalAlert } from "../_app";

export default function ProductWritedown () {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Lançar baixa de estoque");
    const [productIdentification, setProductIdentification] = useState('');
    const [productsSearchResult, setProductsSearchResult] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [processingRequest, setProcessingRequest] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const products = selectedProducts.map((product) => {
            return {
                productId: product.id,
                quantityToRemove: product.qtd
            }
        });
        setProcessingRequest(true);
        await productWriteDown(products);
        SwalAlert.fire({
            title: "Baixa de estoque registrada com sucesso!",
            icon: "success"
        });
        resetFormStates();
        setProcessingRequest(false);
    }

    function resetFormStates() {
        setProductIdentification('');
        setSelectedProducts([]);
    }

    function handleProductInput(event) {
        const userInput = event.target.value;
        setProductIdentification(userInput);
        
        setTimeout(async () => {
            await handleProductAutoComplete(userInput);
        }, 100);
    }

    async function handleProductAutoComplete(userInput) {
        let results;

        if(userInput) {
            results = await productAutocomplete(userInput);
        }
        
        if(results) {
            setProductsSearchResult(results.map((result) => {
                return {
                    id: result.id, 
                    name: result.name,
                    external_product_id: result.external_product_id,
                    qtd: 1,
                    available_quantity: result.quantity,
                    selling_price: result.selling_price
                }
            }));
        } else {
            setProductsSearchResult([]);
        }
    }

    function handleProductAutoCompleteResultSelection(product) {
        if(product.available_quantity === 0) {
            SwalAlert.fire({
                title: "O produto escolhido não possui unidades suficientes para baixa.",
                icon: "warning"
            });
            return;
        }

        setSelectedProducts((previousSelectedProducts) => {
            const hasAlreadyBeenAdded = previousSelectedProducts.find((addedProduct) => addedProduct.id === product.id);
            if(hasAlreadyBeenAdded) {
                return previousSelectedProducts;
            }

            return previousSelectedProducts.concat(product);
        });
        setProductIdentification('');
        setProductsSearchResult([]);
    }

    function productHasEnoughQuantityForWritedown(id, quantityForValidation = 1) {
        const canProceedWithWritedown = selectedProducts.some(product => product.id === id && quantityForValidation <= product.available_quantity);
        
        if(!canProceedWithWritedown) {
            SwalAlert.fire({
                title: "O produto escolhido não possui unidades suficientes para baixa.",
                icon: "warning"
            });
            return false;
        }

        return true;
    }

    function updateSelectedProductQuantity(id, action) {
        if(action === 'decrease') {
            let shouldRemove = selectedProducts.some(item => item.id === id && item.qtd === 1);
            if(shouldRemove) {
                setSelectedProducts(selectedProducts => {
                    return selectedProducts.filter(item => item.id !== id);
                });
                return;
            }
        }

        const currentProduct = selectedProducts.find(product => product.id === id);
        if( action === 'increase' && !productHasEnoughQuantityForWritedown(id, currentProduct.qtd +1)) {
            return;
        }

        setSelectedProducts(selectedProducts =>
            selectedProducts.map(product => {
                if(product.id === id) {
                    return { 
                        ...product, 
                        qtd: action === 'increase' 
                        ? product.qtd +1 
                        : product.qtd -1 
                    };
                }
                return product;
            })
        )
    }

    function resolveSelectedProductsTable() {
        if(selectedProducts.length > 0) {
            return selectedProducts.map((selectedProduct, index) => {
                return (
                    <li className="bg-slate-400 my-4 px-2 h-full">
                        <li>ID: {selectedProduct.id}</li>
                        <li>ID Externo: {selectedProduct.external_product_id}</li>
                        <li>Produto: {selectedProduct.name}</li>
                        <li> Qtd: {selectedProduct.qtd}
                         <span className="cursor-pointer" onClick={() => updateSelectedProductQuantity(selectedProduct.id, 'increase')}> + </span>
                         <span className="cursor-pointer" onClick={() => updateSelectedProductQuantity(selectedProduct.id, 'decrease')}> - </span>
                        </li>
                        <li>Preço unitário: {convert(selectedProduct.selling_price)}</li>
                    </li>
                )
            })
        }

        return <li className="my-4 px-2 text-center text-2xl">Nenhum produto adicionado ainda...</li>
    }

    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-2">
                <Head>
                    <title>Lançar baixa de estoque</title>
                </Head>
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                    <form className="mt-2" onSubmit={ handleSubmit }>

                        <div className="mb-2">
                            <label
                                htmlFor="productIdentification"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Insira a identificação ou nome do produto
                            </label>
                            <SearchAbleSelect 
                                onChange={handleProductInput}
                                idForLabel="productIdentification"
                                isRequired={false}
                                value={productIdentification}
                                searchResults={productsSearchResult}
                                onOptionSelect={handleProductAutoCompleteResultSelection}
                            />
                        </div> 

                        <div className="w-full bg-slate-200">
                            <h1 className="text-center text-2xl">Produtos para baixa</h1>
                            <ul className="flex-col py-2 mx-5">
                                { resolveSelectedProductsTable() }
                            </ul>
                        </div>
                        
                        <div className="mt-6">
                            <button
                            type="submit"
                            disabled={processingRequest || selectedProducts.length === 0 } 
                            className="w-full px-4 py-2 
                                tracking-wide text-white 
                                transition-colors duration-200 
                                transform bg-purple-700 rounded-md 
                                hover:bg-purple-600 
                                focus:outline-none focus:bg-purple-600
                                disabled:bg-slate-400">
                                { processingRequest ? 'Aguarda enquanto lançamos as baixas...' : 'Lançar baixa' }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    return {
        props: {}
    }
});