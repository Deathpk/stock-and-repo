import { api } from "./apiClient";

export async function categoryAutocomplete(input) {
    try {
        const {data} = await api.get(`categories/autocomplete?input=${input}`);
        return data.results;
    } catch(error) {
        console.log(error);
    }
}


