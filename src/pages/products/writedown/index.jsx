import SearchAbleSelect from "@/components/SearchAbleSelect";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { setupAPIClient } from "@/services/api/api";
import { productAutocomplete, productWriteDown, removeSoldProducts } from "@/services/api/products";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import convert from "@/utils/moneyMask";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { SwalAlert } from "../../_app";

export default function CreateSale() {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Lançar baixa de produtos");
    const [productIdentification, setProductIdentification] = useState('');
    const [productsSearchResult, setProductsSearchResult] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalOnCart, setTotalOnCart] = useState(0);
    const [processingRequest, setProcessingRequest] = useState(false);
    const [isSale, setIsSale] = useState(false);

    useEffect(()=> {
        updateTotalValue();
    }, [selectedProducts])

    async function handleSubmit(event) {
        event.preventDefault();
        const products = selectedProducts.map((selectedProduct) => {
            if(isSale) {
                return {
                    productId: selectedProduct.id,
                    soldQuantity: selectedProduct.qtd
                }
            }

            return {
                productId: selectedProduct.id,
                quantityToRemove: selectedProduct.qtd
            }
        });
        setProcessingRequest(true);
        isSale ? await removeSoldProducts(products) : await productWriteDown(products);
       
        SwalAlert.fire({
            title: "Baixa lançada com sucesso!",
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
                title: "O produto escolhido não possui unidades suficientes para venda.",
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

    function productHasEnoughQuantityForSelling(id, quantityForValidation = 1) {
        const canProceedWithSale = selectedProducts.some(product => product.id === id && quantityForValidation <= product.available_quantity);
        
        if(!canProceedWithSale) {
            SwalAlert.fire({
                title: "O produto escolhido não possui unidades suficientes para venda.",
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
        if( action === 'increase' && !productHasEnoughQuantityForSelling(id, currentProduct.qtd +1)) {
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

    function updateTotalValue() {
        let total = 0;
        selectedProducts.forEach(item => total += item.selling_price * item.qtd);
        setTotalOnCart(total);
    }

    function resolveSelectedProductsTable() {
        if(selectedProducts.length > 0) {
            return selectedProducts.map((selectedProduct, index) => {
                return (
                    <li className="bg-slate-400 my-4 px-2 h-full flex flex-col">
                        <span>ID: {selectedProduct.id}</span>
                        <span>ID Externo: {selectedProduct.external_product_id}</span>
                        <span>Produto: {selectedProduct.name}</span>
                        <span> Qtd: {selectedProduct.qtd}
                            <span className="cursor-pointer" onClick={() => updateSelectedProductQuantity(selectedProduct.id, 'increase')}> + </span>
                            <span className="cursor-pointer" onClick={() => updateSelectedProductQuantity(selectedProduct.id, 'decrease')}> - </span>
                        </span>
                        <span>Preço unitário: {convert(selectedProduct.selling_price)}</span>
                    </li>
                )
            })
        }

        return <li className="my-4 px-2 text-center text-2xl">Nenhum produto adicionado ainda...</li>
    }

    return(
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-2">
                <Head>
                    <title>Lançar baixa</title>
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
                                displayableColumn="name"
                                onOptionSelect={handleProductAutoCompleteResultSelection}
                            />
                        </div>
                        <div className="relative flex flex-wrap items-center">
                            <input
                            className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-emerald-200 checked:after:left-4 checked:after:bg-emerald-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-emerald-300 checked:after:hover:bg-emerald-600 focus:outline-none checked:focus:bg-emerald-400 checked:after:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
                            type="checkbox"
                            onChange={() => setIsSale(!isSale)}
                            id="id-c01"
                            />
                            <label
                            className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                            htmlFor="id-c01"
                            >
                                Baixa por meio de venda
                            </label>
                        </div> 

                        <div className="w-full bg-slate-200">
                            <h1 className="text-center text-2xl">Produtos adicionados</h1>
                            <ul className="flex-col py-2 mx-5">
                                { resolveSelectedProductsTable() }
                                <span className="flex justify-end">Total: {convert(totalOnCart)}</span> 
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
                                { processingRequest ? 'Aguarda enquanto lançamos a baixa...' : 'Lançar baixa' }
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