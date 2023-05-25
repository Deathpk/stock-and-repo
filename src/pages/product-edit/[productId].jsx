import { useContext, useState } from "react";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { setupAPIClient } from "@/services/api/api";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { editProduct } from "@/services/api/products";
import { SwalAlert } from "../_app";
import { useRouter } from "next/router";
import SearchAbleSelect from "@/components/SearchAbleSelect";
import { categoryAutocomplete } from "@/services/api/category";
import { brandAutocomplete } from "@/services/api/brand";

export default function ProductEdit({ product }) {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Editar produto");
    let router = useRouter();

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [paidPrice, setPaidPrice] = useState(product.paid_price);
    const [sellingPrice, setSellingPrice] = useState(product.selling_price);
    const [categoryName, setCategoryName] = useState(product.category.name || '');
    const [categoryResults, setCategoryResults] = useState([]);
    const [brandName, setBrandName] = useState(product.brand.name || '');
    const [brandResults, setBrandResults] = useState([]);
    const [minimumQuantity, setMinimumQuantity] = useState(product.minimum_quantity);
    const [externalProductId, setExternalProductId] = useState(product.external_product_id || '');

    function handleCategoryChange(event) {
        const userInput = event.target.value;
        setCategoryName(userInput);
        
        setTimeout(async () => {
            await handleCategoryAutoComplete(userInput);
        }, 100);
    }

    async function handleCategoryAutoComplete(userInput) {
        let results;

        if(userInput) {
            results = await categoryAutocomplete(userInput);
        }
        
        if(results) {
            setCategoryResults(results.map((result) => {
                return { name: result.name }
            }));
        } else {
            setCategoryResults([]);
        }
    }


    function handleCategoryAutoCompleteSelectionResult(category) {
        console.log(category);
        setCategoryName(category.name);
        setCategoryResults([]);
    }

    async function handleBrandChange(event) {
        const userInput = event.target.value;
        setBrandName(userInput);
        
        setTimeout(async () => {
            await handleBrandAutoComplete(userInput);
        }, 100);
    }

    async function handleBrandAutoComplete(userInput) {
        let results;

        if(userInput) {
            results = await brandAutocomplete(userInput);
        }
        
        if(results) {
            setBrandResults(results.map((result) => {
                return { name: result.name }
            }));
        } else {
            setBrandResults([]);
        }
    }

    function handleBrandAutoCompleteSelectionResult(brand) {
        setBrandName(brand.name);
        setBrandResults([]);
    }

     async function submitHandler(event) {
        event.preventDefault();
        const data = {
            productId: product.id,
            name: name,
            description: description,
            quantity: quantity,
            paidPrice: paidPrice,
            sellingPrice: sellingPrice,
            categoryName: categoryName,
            brandName: brandName,
            minimumQuantity: minimumQuantity,
            externalProductId: externalProductId
        }
        await editProduct(data);
        SwalAlert.fire({
            title: "Produto atualizado com sucesso!",
            icon: "success"
        });
        setTimeout(() => {
            router.push('/products');
        },2000);
    }

    return(
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
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
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
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
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
                            value={quantity}
                            onChange={(e)=> setQuantity(e.target.value)}
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
                            value={minimumQuantity}
                            onChange={(e)=> setMinimumQuantity(e.target.value)}
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
                            value={paidPrice}
                            onChange={(e)=> setPaidPrice(e.target.value)}
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
                            value={sellingPrice}
                            onChange={(e)=> setSellingPrice(e.target.value)}
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
                        <SearchAbleSelect 
                            onChange={handleCategoryChange}
                            idForLabel="category"
                            isRequired={true}
                            value={categoryName}
                            searchResults={categoryResults}
                            displayableColumn={"name"}
                            onOptionSelect={handleCategoryAutoCompleteSelectionResult}
                        />
                        
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="brand"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Marca
                        </label>
                        <SearchAbleSelect 
                            onChange={handleBrandChange}
                            idForLabel="brand"
                            isRequired={true}
                            value={brandName}
                            searchResults={brandResults}
                            displayableColumn={"name"}
                            onOptionSelect={handleBrandAutoCompleteSelectionResult}
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
                            value={externalProductId}
                            onChange={(e)=> setExternalProductId(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>    
                
                    <div className="mt-6">
                        <button
                        type="submit" 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Concluir edição
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
     const { params } = context;

     const apiClient = setupAPIClient(context);
     const response = await apiClient.get(`/products/${params.productId}`);
     return {
        props: { product: response.data.product }
     }
});