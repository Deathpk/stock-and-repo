import DataTableHead from "../DataTableHead";
import DataTableRow from "../DataTableRow";

export default function DataTable({ data, columns }) {
    return(
        <table className="mx-2 text-sm text-center text-white">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                    {
                        columns.map((column, index) => {
                            return <DataTableHead key={index} columnName={column} />
                        })
                    }
                </tr>
            </thead>
            <tbody>   
            {
                data.products.map((product, index) => {
                    return <DataTableRow key={index} product={product}/>
                })
            }
            </tbody>
        </table>
    );
}