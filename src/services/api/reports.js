import { api } from "./apiClient";

export async function getSalesReport({filterType, value}) {
    console.log(filterType, value);
    try {
        const response = await api.get(`/reports/sales`, {
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