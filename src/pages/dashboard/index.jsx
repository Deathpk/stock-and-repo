import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";

export default function Dashboard() {
    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    return {
        props: {}
    }
});