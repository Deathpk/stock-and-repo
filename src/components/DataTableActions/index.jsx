export default function DataTableActions ({ targetId }) {
    return(
        <td className="px-6 py-4 text-right">
        <a href={`/product-details/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Detalhes</a>
            <a href={`/product-edit/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Editar</a>
            <a href={`/products/delete/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Deletar</a>
        </td>
    );
}