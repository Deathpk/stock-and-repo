import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { createNewProduct } from "@/services/api/products";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ProductCreate() {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Cadastrar novo produto");
    const nameRef = useRef();
    const descriptionRef = useRef();
    const quantityRef = useRef();
    const minimumQuantityRef = useRef();
    const paidPriceRef = useRef();
    const sellingPriceRef = useRef();
    const externalProductIdRef = useRef();
    const [categoryName, setCategoryName] = useState();
    const [brandName, setBrandName] = useState();

    function handleCategoryChange(event) {
        //TODO QUANDO ADICIONAR O SEARCHABLE SELECT DESCOMENTAR E IMPLEMENTAR...
        // const userInput = event.target.value;
        // const autocompleteResult = categoryAutocomplete(userInput);
        setCategoryName(event.target.value);
    }

    function handleBrandChange(event) {
        //TODO QUANDO ADICIONAR O SEARCHABLE SELECT DESCOMENTAR E IMPLEMENTAR...
        // const userInput = event.target.value;
        // const autocompleteResult = brandAutocomplete(userInput);
        setBrandName(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        let productData = {
            name: nameRef.current.value,
            quantity: quantityRef.current.value,
            minimumQuantity: minimumQuantityRef.current.value,
            paidPrice: paidPriceRef.current.value,
            sellingPrice: sellingPriceRef.current.value,
            categoryName: categoryName,
            brandName: brandName,
        }
        setOptionalFieldsIfRequired(productData);
        createNewProduct(productData);
        toast.success("Produto cadastrado com sucesso!");
    }

    function setOptionalFieldsIfRequired(productData) {
        if(descriptionRef.current.value) {
            Object.assign(productData, {description: descriptionRef.current.value});
       }

       if(externalProductIdRef.current.value) {
           Object.assign(productData, {externalProductId: externalProductIdRef.current.value})
       }
    }

    return (
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-5">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                    <form className="mt-6" onSubmit={submitHandler}>
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nome do Produto
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                ref={nameRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Descrição
                            </label>
                            <input
                                type="text"
                                id="description"
                                ref={descriptionRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Quantidade em estoque atual
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                required
                                ref={quantityRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="minimumQuantity"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Quantidade Mínima em estoque
                            </label>
                            <input
                                type="number"
                                id="minimumQuantity"
                                required
                                ref={minimumQuantityRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="paidPrice"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Preço de custo
                            </label>
                            <input
                                type="number"
                                id="paidPrice"
                                required
                                ref={paidPriceRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="sellingPrice"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Preço de venda
                            </label>
                            <input
                                type="number"
                                id="sellingPrice"
                                required
                                ref={sellingPriceRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="category"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Categoria
                            </label>
                            {/* <SearchableSelect /> */}
                            <input
                                type="text"
                                onChange={handleCategoryChange}
                                id="category"
                                required
                                value={categoryName}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="brand"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Marca
                            </label>
                            <input
                                type="text"
                                onChange={handleBrandChange}
                                id="brand"
                                required
                                value={brandName}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>  

                        <div className="mb-2">
                            <label
                                htmlFor="externalProductId"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Identificação externa do produto
                            </label>
                            <input
                                type="text"
                                id="externalProductId"
                                ref={externalProductIdRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>    
                    
                        <div className="mt-6">
                            <button
                            type="submit" 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Cadastrar produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    return {
       props: { }
    }
});