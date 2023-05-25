import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { getMostSoldProductsReport } from "@/services/api/reports";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "@/services/api/api";
import Head from "next/head";
import DataTableRow from "@/components/DataTableRow";
import DataTable from "@/components/DataTable";

export default function MostSold({ products }) {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle('Mais vendidos');

    const availableFilters = [{ label: 'Mês', value: 'monthly'}, {label: 'Ano', value: 'yearly'}];
    const availableFilterOptions = { monthly: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], yearly: ["2021", "2022", "2023"] }

    const [mostSoldProducts, setMostSoldProducts] = useState(products || []);
    const [filterType, setFilterType] = useState('monthly');
    const [filterOptions, setFilterOptions] = useState(availableFilterOptions.monthly);
    const [selectedOption, setSelectedOption] = useState(availableFilterOptions.monthly[0]);
    const [filterApplied, setFilterApplied] = useState(false);

    //TODO AS OPTIONS DEVEM SER TRAZIDAS DO BACKEND MAIS P FRENTE...
    const columnNamesMock = ['Produto', 'Quantidade de vendas'];

    useEffect(() => {
        async function fetchFilteredResults() {
            const response = await getMostSoldProductsReport(
                {
                    filterType: filterType,
                    value: selectedOption
                }
            );
            setMostSoldProducts(response.mostSold);
        }

        fetchFilteredResults();
        return () => setFilterApplied(false);
    }, [filterApplied]);

    function handleFilterUpdate() {
        setFilterApplied(true);
    }

    function handleFilterType(event) {
        setFilterType(event.target.value);
        setFilterOptions(availableFilterOptions[event.target.value]);
        setSelectedOption(availableFilterOptions[event.target.value][0]);
    }

    function handleOptionValue(event) {
        setSelectedOption(event.target.value);
    }

    function resolveDataTable() {
        if(mostSoldProducts.length > 0) {
            return (
                <DataTable 
                    columns={columnNamesMock} 
                    children=
                    {
                        mostSoldProducts.map((product, index) => {
                            return (
                                <DataTableRow key={index} data={[
                                    product.product_name,
                                    product.sold_quantity
                                    ]} 
                                />
                            )
                        })
                    }
                />
            );
        } 
        
        return <span className="bg-slate-800 h-24 flex justify-center items-center text-2xl">Não foram encontradas vendas correspondentes ao filtro</span>
    }

    return(
        <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
            <Head>
                <title>Mais vendidos</title>
            </Head>
            {/* ESSE FILTRO PODE SER UM COMPONENT... */}
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
            {
                resolveDataTable()
            }
        </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    const apiClient = setupAPIClient(context);
    const currentMonth = new Date().getMonth();
    const response = await apiClient.get(`/reports/sales/most-sold?filterType=monthly&value=${currentMonth}`);
    return {
       props: { 
            products: response.data.mostSold
       }
    }
});