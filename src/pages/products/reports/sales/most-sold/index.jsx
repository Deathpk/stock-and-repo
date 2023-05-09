import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";

export default function MostSold() {
    return (
        <div>
            <h1>Eu sou o most sold</h1>
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    // const { params } = context;
    // const apiClient = setupAPIClient(context);
    // const response = await apiClient.get(`/products/${params.productId}`);
    return {
       props: { } //details: response.data.product 
    }
});