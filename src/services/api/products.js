import { api } from "./apiClient";
import { toast } from "react-toastify";

export async function getProducts() {
    try {
        const response = await api.get("products/");
        return {
            products: response.data.products,
            links: response.links,
            metadata: response.meta
        };
    } catch(error) {
        console.log(error);
    }
}

export async function deleteProduct(targetId) {
    try {
        await api.delete("products/delete",{
            params: {
                productId: targetId,
                isExternal: 0
            }
        });
    } catch(error) {
        console.log(error);
    }

}

export async function productAutocomplete (searchQuery) {
    try {
        const response = await api.get("products/autocomplete",{
            params: {
                input: searchQuery
            }
        });
        return response.data.results;

    } catch(error) {
        console.log(error);
    }
}

export async function removeSoldProducts(soldProducts) {
    try {
        await api.post("sales/sell",{
            soldProducts: soldProducts
        });
    } catch(error) {
        console.log(error);
    }
}

export async function productWriteDown(products) {
    try {
        await api.post("products/remove-quantity",{
            products: products
        });
    } catch(error) {
        console.log(error);
    }
}

export async function getSpecificProduct(productId, setProductData, setProcessingRequest) {
    await api.get(`products/${productId}`)
    .then(response => {
        const responseData = response.data;
        setProductData({
            product: responseData.product
        });
        setProcessingRequest(false);
    }).catch(error => {
        console.log("Aww fuck!");
        console.log(error);
    })
}

export async function createNewProduct(productData) {
    await api.post("/products/create", productData);
}

export async function editProduct(data) {
    console.log("meu amiigo")
    console.log(data);
    // const productData = {
    //     productId: data.productId,
    //     name: data.name,
    //     description: data.description,
    //     quantity: Number.parseInt(data.quantity),
    //     minimumQuantity: Number.parseInt(data.minimumQuantity),
    //     paidPrice: data.paidPrice,
    //     sellingPrice: data.sellingPrice
    // }
    await api.put("/products/edit", data)
    .then((response => {
        toast.success("Alterações feitas com sucesso!");
    }))
    .catch(error => {
        console.log(error);
    })

}