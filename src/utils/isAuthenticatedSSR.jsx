import { parseCookies, destroyCookie} from "nookies";

export function isAuthenticatedSSR(callback) {
    return async (context) => {
        const cookies = parseCookies(context);
        const token = cookies['@stock_and_repo.token']

        if(!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    
        try {
            return await callback(context);
        } catch(error) {
            console.log(error);
            // TODO checar se o status é unauthenticated.e se for destruir o cookie.
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}