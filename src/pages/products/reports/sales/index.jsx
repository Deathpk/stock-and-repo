import { setupAPIClient } from "@/services/api/api";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { useContext, useEffect, useState } from "react";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
import Head from "next/head";
import ReportDataTable from "@/components/ReportDataTable";
import { getSalesReport } from "@/services/api/reports";
import { Transition } from "@headlessui/react";
import Modal from "@/components/Modal";
import convert from "@/utils/moneyMask";

export default function SalesReport({ metadata, sales }) {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Relatório de vendas");

    const [salesData, setSalesData] = useState(sales.data || []);
    const [salesMetadata, setSalesMetadata] = useState(metadata || []);

    const columnNamesMock = ['Data', 'Total da venda', 'Lucro', 'Detalhes'];

    //TODO AS OPTIONS DEVEM SER TRAZIDAS DO BACKEND MAIS P FRENTE...
    const availableFilters = [{ label: 'Mês', value: 'monthly'}, {label: 'Ano', value: 'yearly'}];
    const availableFilterOptions = { monthly: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], yearly: ["2021", "2022", "2023"] }
    
    const [filterType, setFilterType] = useState('monthly');
    const [filterOptions, setFilterOptions] = useState(availableFilterOptions.monthly);
    const [selectedOption, setSelectedOption] = useState(availableFilterOptions.monthly[0]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [saleDetails, setSaleDetails] = useState([]);

    useEffect(() => {
        async function fetchFilteredResults() {
            const response = await getSalesReport(
                {
                    filterType: filterType,
                    value: selectedOption
                }
            );
            setSalesData(response.sales.data);
            setSalesMetadata(response.metadata);
        }
        fetchFilteredResults();

        return () => setFilterApplied(false);
    }, [filterApplied]);

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
        if(salesData.length > 0) {
            return <ReportDataTable data={salesData} columns={columnNamesMock} onShowDetails={handleShowDetails} />
        } 
        
        return <span className="bg-slate-800 h-24 flex justify-center items-center text-2xl">Não foram encontradas vendas correspondentes ao filtro</span>
    }

    function handleShowDetails(products) {
        setSaleDetails(products);
        setShowDetailsModal(true);
    }

    function detailsModalBody() {
        return(
            <div className="flex-col justify-between px-52 py-3 text-black max-h-52 overflow-y-scroll">
                {
                    saleDetails.map((detail, key) => {
                        return (
                            <div className="flex flex-col" key={key}>
                                <span className="flex flex-row">{detail.name}</span>
                                <span className="mb-2">{convert(detail.paid_price)}</span>
                            </div>
                        )
                    })
                }
                <button className="text-white bg-red-500 mt-2 py-2 px-1 rounded-md" onClick={() => {setShowDetailsModal(false)}}>Fechar</button>
            </div>
        );
    }

    function showSaleDetails() {
        return(
            <Transition
            show={showDetailsModal}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 scale-85"
            enterhref="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leavehref="opacity-0 scale-95"
            >
                {
                    showDetailsModal &&
                    <Modal 
                        primaryMessage="Detalhes da venda"
                        widthInPx={600}
                        heightInPx={250}
                        leftInPercentage={"30"}
                        body={detailsModalBody} 
                    />
                }
            </Transition>
        );
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
                {
                    resolveDataTable()
                }
                {
                    showDetailsModal && showSaleDetails()
                }
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
       props: { metadata: response.data.metadata, sales: response.data.sales, }
    }
});