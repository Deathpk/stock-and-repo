export default function DataTableRow({ data, actions })  {
    return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500">
            <>
                {
                    data.map((prop, index) => {
                        return (
                            <td scope="row" key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                { prop }
                            </td>
                        )
                    })
                }
                { actions ?? '' }
            </>
        </tr>
    );
}