import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { useContext, useState } from "react";

export default function InventoryWriteDown() {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle('Baixa de produtos');

    const availableFilters = [{ label: 'Mês', value: 'monthly'}, {label: 'Ano', value: 'yearly'}];
    const availableFilterOptions = { monthly: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], yearly: ["2021", "2022", "2023"] }

    const [filterType, setFilterType] = useState('monthly');
    const [filterOptions, setFilterOptions] = useState(availableFilterOptions.monthly);
    const [selectedOption, setSelectedOption] = useState(availableFilterOptions.monthly[0]);
    const [filterApplied, setFilterApplied] = useState(false);

    const columnNamesMock = ['Data', 'Id do produto', 'Nome do produto', 'Quantidade de baixas'];
    //TODO AS OPTIONS DEVEM SER TRAZIDAS DO BACKEND MAIS P FRENTE...

    return(
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            {/* TODO */}
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR((context) => {
    return {
        props: {}
    };
});