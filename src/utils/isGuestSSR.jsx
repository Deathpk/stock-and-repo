import { parseCookies } from "nookies";

export function isGuestSSR(callback) {
    return async (context) => {
        const cookies = parseCookies(context);
        const token = cookies['@stock_and_repo.token'];

        if(token) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
    
        return await callback();
    }
}