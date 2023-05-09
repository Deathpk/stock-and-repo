export default function SearchAbleSelect ({ onChange, idForLabel, isRequired, value, searchResults, onOptionSelect, displayableColumn }) {
    return(
        <div className="relative z-10">
            <input
                type="text"
                onChange={onChange}
                id={idForLabel}
                required={isRequired}
                value={value}
                className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            />                  
                <div className="mt-1 mb-12 w-full bg-white overflow-y-scroll max-h-56">
                    {
                        searchResults.map((searchResult, index) => {
                            return(
                                <div 
                                    key={index}
                                    className="
                                    cursor-pointer
                                    text-black 
                                    text-center 
                                    mt-1 mb-1
                                    py-2 
                                    w-full
                                    bg-white 
                                    border-b-2
                                    " 
                                    onClick={() => {onOptionSelect(searchResult)}}
                                >
                                    { searchResult[displayableColumn] }
                                </div>
                            )
                        })
                    }
                </div>                                    
        </div>
    );
}