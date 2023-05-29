import { setupAPIClient } from "@/services/api/api";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { useContext, useEffect, useState } from "react";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import Head from "next/head";
import { getSalesReport } from "@/services/api/reports";
import Modal from "@/components/Modal";
import convert from "@/utils/moneyMask";
import DataTable from "@/components/DataTable";
import DataTableRow from "@/components/DataTableRow";
import Pagination from "@/components/Pagination";
import { SwalAlert } from "@/pages/_app";

export default function SalesReport({ metadata, currentMonthIndex, sales, currentPageData, lastPageData, totalItemsData }) {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Relatório de vendas");
    const [currentPage, setCurrentPage] = useState(currentPageData || 1);
    const [lastPage, setLastPage] = useState(lastPageData || 0);
    const [totalItems, setTotalItems] = useState(totalItemsData || 0);

    const [salesData, setSalesData] = useState(sales.data || []);
    const [salesMetadata, setSalesMetadata] = useState(metadata || []);

    const columnNamesMock = ['Data', 'Total da venda', 'Lucro', 'Ações'];

    //TODO AS OPTIONS DEVEM SER TRAZIDAS DO BACKEND MAIS P FRENTE...
    const availableFilters = [{ label: 'Mês', value: 'monthly'}, {label: 'Ano', value: 'yearly'}];
    const availableFilterOptions = { monthly: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], yearly: ["2021", "2022", "2023"] }
    
    const [filterType, setFilterType] = useState('monthly');
    const [filterOptions, setFilterOptions] = useState(availableFilterOptions.monthly);
    const [selectedOption, setSelectedOption] = useState(availableFilterOptions.monthly[currentMonthIndex]);
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        async function fetchFilteredResults() {
            const response = await getSalesReport(
                {
                    filterType: filterType,
                    value: selectedOption,
                    currentPage: currentPage
                }
            );
            setSalesData(response.sales.data);
            setSalesMetadata(response.metadata);
            setCurrentPage(response.sales.current_page);
        }
        fetchFilteredResults();
    }, [filterApplied, currentPage]);

    function handleFilterType(event) {
        setFilterType(event.target.value);
        setFilterOptions(availableFilterOptions[event.target.value]);
        setSelectedOption(availableFilterOptions[event.target.value][0]);
    }

    function handleShowDetails(products) {

        const productsDataInHtml = products.map((product, index) => {
            return `<div><b>ID</b>: ${product.id} <b>Produto</b>: ${product.name}</div><br>`
        });

        SwalAlert.fire({
            title: "Produtos vendidos",
            html: new String(productsDataInHtml).replaceAll(',', ''),
            icon: "info"
        });
    }

    function handleOptionValue(event) {
        setSelectedOption(event.target.value);
    }

    function handleFilterUpdate() {
        setFilterApplied(true);
    }

    function resolveActions(soldProducts) {
        return(
            <>
                <button 
                    className="px-6 py-4 font-medium 
                    text-gray-900 
                    whitespace-nowrap 
                    dark:text-white" 
                    onClick={() => { handleShowDetails(soldProducts) }}
                >
                    VER DETALHE
                </button>
            </>
        )
    }
    

    function resolveDataTable() {
        if(salesData.length > 0) {
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
        
        return <span className="bg-slate-800 h-24 flex justify-center items-center text-2xl">Não foram encontradas vendas correspondentes ao filtro</span>
    }

    return (
        <>
            <div className="w-full relative flex flex-col justify-center overflow-hidden pb-12">
                <Head>
                    <title>Relatório de vendas</title>
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
                <div className="flex pb-1">
                    <span className="px-2">Lucro total de {convert(salesMetadata.overallProfit)}</span>
                    <span>Valor total de vendas {convert(salesMetadata.overallTotalPrice)}</span>
                </div>
                {
                    resolveDataTable()
                }
                <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                totalItems={totalItems}
                onPageChange={(page) => {setCurrentPage(page)}}
                />
            </div>
        </>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    let currentMonth = new Date;
    currentMonth = currentMonth.getMonth() + 1;

    const apiClient = setupAPIClient(context);
    const response = await apiClient.get(`/reports/sales?filterType=monthly&value=${currentMonth}`);
    return {
       props: { 
            metadata: response.data.metadata,
            currentMonthIndex: currentMonth - 1,
            sales: response.data.sales,
            currentPageData: response.data.sales.current_page,
            lastPageData: response.data.sales.last_page,
            totalItemsData: response.data.sales.total
        }
    }
});