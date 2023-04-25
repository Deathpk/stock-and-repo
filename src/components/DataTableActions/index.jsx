export default function DataTableActions ({ targetId, onDelete }) {

    return(
            <td className="px-6 py-4 text-right">
                <a href={`/products/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Detalhes</a>
                <a href={`/product-edit/${targetId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Editar</a>
                <a onClick={() => {onDelete(targetId)}} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Deletar</a>
            </td>
    );
}