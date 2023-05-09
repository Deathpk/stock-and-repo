import convert from "@/utils/moneyMask";

export default function ReportDataTableRow({ sale, onShowDetails })  {
    const formatedDate = new Date(sale.sale_date);
    return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { formatedDate.toLocaleDateString() }
            </td>
            <td scope="row" className="flex items-center justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { convert(sale.total_price) }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { convert(sale.profit) }
            </td>
            <button className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={() => { onShowDetails(sale.products) }}>
                VER DETALHE
            </button>
        </tr>
    );
}