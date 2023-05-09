import DataTableActions from "../DataTableActions";
import { AiFillWarning } from "react-icons/ai";
import convert from "@/utils/moneyMask";

export default function DataTableRow({product, onDelete})  {
    return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.id }
            </td>
            <td scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.name }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.brand.name }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.category.name }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.quantity }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { product.minimum_quantity }
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { convert(product.selling_price) }
            </td>
            <DataTableActions targetId={ product.id } onDelete={onDelete}/>
        </tr>
    );
}