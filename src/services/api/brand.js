import { api } from "./apiClient";

export async function brandAutocomplete(input) {
    try {
        const {data} = await api.get(`brands/autocomplete?input=${input}`);
        return data.results;
    } catch(error) {
        console.log(error);
    }
}