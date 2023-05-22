import { api } from "./apiClient";

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
    await api.put("/products/edit", data)
    .catch(error => {
        console.log(error);
    });
}