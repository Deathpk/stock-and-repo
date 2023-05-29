import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { setupAPIClient } from "@/services/api/api";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import Head from "next/head";
import { useContext, useState } from "react";

export default function InventoryWriteDown({ writedownData }) {
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

    function handleFilterType(event) {
        setFilterType(event.target.value);
        setFilterOptions(availableFilterOptions[event.target.value]);
        setSelectedOption(availableFilterOptions[event.target.value][0]);
    }

    function handleOptionValue(event) {
        setSelectedOption(event.target.value);
    }

    function handleFilterUpdate() {
        setFilterApplied(true);
    }

    function resolveDataTable() {
        if(writedownData.length > 0) {
            return(
                <DataTable
                    columns={columnNamesMock}
                    children={
                        salesData.map((data, index) => {
                            return (
                                <>
                                    <DataTableRow key={index} data={[
                                        new Date(data.sale_date).toLocaleDateString(),
                                        convert(data.total_price),
                                        convert(data.profit),
                                        ]} 
                                        actions={resolveActions(data.products)}
                                    />
                                </>
                            )
                        })
                    }
                />
            );
        } 
        
        return <span className="bg-slate-800 h-24 flex justify-center items-center text-2xl">Não foram encontradas baixas de produtos correspondentes ao filtro</span>
    }

    return(
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            <Head>
                <title>Relatório de baixas</title>
            </Head>
            <div>
                    <label className="ml-2" htmlFor="filterType">Filtrar por</label>
                    <select className="w-24 text-black mb-4 ml-2" id="filterType" onChange={handleFilterType}>
                        {
                            availableFilters.map((filter) => {
                                return (
                                    <option value={filter.value}>{filter.label}</option>
                                )
                            })
                        }
                    </select>

                    <label className="ml-2" htmlFor="filterOptions">Valor</label>
                    <select className="w-24 text-black mb-4 ml-2" id="filterOptions" onChange={handleOptionValue}>
                        {
                            filterOptions.map(option => {
                                return <option selected={option === selectedOption} value={option}>{option}</option>
                            })
                        }
                    </select>
                    <button className="bg-slate-700 rounded-sm px-2 mx-2" onClick={handleFilterUpdate}>Filtrar</button>
            </div>
            
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    let currentMonth = new Date;
    currentMonth = currentMonth.getMonth() + 1;
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get(`/reports/sales?filterType=monthly&value=${currentMonth}`);
    return {
        props: {}
    };
});