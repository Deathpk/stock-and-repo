import axios from "axios";
import { signOut } from "@/contexts/AuthContext";
import { AuthTokenError } from "../errors/authTokenError";
import { parseCookies } from "nookies";

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers:{
            Authorization: `Bearer ${cookies['@stock_and_repo.token']}`
        }
    });

    api
    .interceptors
    .response
    .use(response => {
        return response;
    }, (error) => {
        console.log(error);
        if(error.response === 401) {
            //deslogar.
            if(typeof window !== undefined) { // Caso seja no lado cliente.
                signOut();
            } else {
                return Promise.reject(new AuthTokenError()); // Caso seja no lado servidor.
            }
        }
        return Promise.reject(error);
    });

    return api;
}