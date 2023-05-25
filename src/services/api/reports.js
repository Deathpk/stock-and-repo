import { api } from "./apiClient";

export async function getSalesReport({filterType, value, currentPage}) {
    try {
        const response = await api.get(`/reports/sales`, {
            params: {
                filterType: filterType,
                value: value,
                page: currentPage
            }
        });
        return response.data;

    } catch(error) {
        console.log(error);
    }
}

export async function getMostSoldProductsReport({filterType, value}) {
    try {
        const response = await api.get(`/reports/sales/most-sold`, {
            params: {
                filterType: filterType,
                value: value
            }
        });
        return response.data;

    } catch(error) {
        console.log(error);
    }
}