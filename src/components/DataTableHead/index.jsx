export default function DataTableHead({ columnName }) {
    return(
        <th scope="col" className="px-6 py-3">
            { columnName }
        </th>
    );
}