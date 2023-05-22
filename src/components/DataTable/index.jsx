import DataTableHead from "../DataTableHead";

export default function DataTable({ columns, children }) {
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
                { children }
            </tbody>
        </table>
    );
}