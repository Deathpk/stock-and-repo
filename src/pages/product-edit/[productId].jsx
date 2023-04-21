import { useState } from "react";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { useRouter } from "next/router";
import { setupAPIClient } from "@/services/api/api";

export default function ProductEdit({ product }) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [paidPrice, setPaidPrice] = useState(product.paid_price);
    const [sellingPrice, setSellingPrice] = useState(product.selling_price);
    const [category, setCategory] = useState(product.category.name);
    const [brand, setBrand] = useState(product.brand.name);
    const [minimumQuantity, setMinimumQuantity] = useState(product.minimum_quantity);
    const [externalProductId, setExternalProductId] = useState(product.external_product_id);

    function submitHandler(productData) {
        // editProduct(productData);
        // navigate(0);
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
                        {/* <SearchableSelect /> */}
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
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
                            id="brand"
                            value={brand}
                            onChange={(e)=> setBrand(e.target.value)}
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
     console.log(response);
     return {
        props: { product: response.data.product }
     }
});