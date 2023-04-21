import { api } from "./api";
import { toast } from "react-toastify";

export function categoryAutocomplete(input) {
    api().get(`categories/autocomplete?input=${input}`)
    .then((response => {
        const apiResponse = response.data;
        return {
            results: {
                ... apiResponse.results
            }
        }
    }))
    .catch(error => {
        console.log(error);
    })
}


