
export default function Pagination({ lastPage, totalItems, currentPage, onPageChange }) {
    const pageItemActiveStyle = 'flex justify-center items-center w-[2rem] h-[2rem] b-1 b-[#eaeaea] rounded-sm bg-red-700 cursor-pointer';
    const pageItemInactiveStyle = 'flex justify-center items-center w-[2rem] h-[2rem] b-1 b-[#eaeaea] rounded-sm bg-blue-300 cursor-pointer';
    
    const pageItems = () => {
        let items = [];
        for (let page = 1; page <= lastPage; page++) {
            items.push(
                <li
                    key={page}
                    className={`${page === currentPage ? pageItemActiveStyle : pageItemInactiveStyle} mx-1`}
                    onClick={() => {onPageChange(page)}}
                >
                    { page }
                </li>
            );   
        }

        return items;
    }

    return(
        <div>
            <ul className="ml-32 mt-5 flex items-center">
                {
                    pageItems().map(item => {
                        return item
                    })
                }
                <li className="text-black mx-2">
                    { totalItems } items ao total
                </li>
            </ul>  
        </div>
    );
}