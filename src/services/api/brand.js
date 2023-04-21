import { api } from "./apiClient";
import { toast } from "react-toastify";

export async function brandAutocomplete(input) {
    await api.get(`brands/autocomplete?input=${input}`)
    .then((response => {
        return {
            results: {
                ... response.data.results
            }
        }
    }))
    .catch(error => {
        console.log(error);
    })
}