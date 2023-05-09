
export default function Modal({primaryMessage, secondaryMessage, body, widthInPx, heightInPx, leftInPercentage, topInPx }) {
    return(
        <>
        <span className="top-0 bg-slate-950 w-screen h-screen z-10 fixed opacity-80"></span>
            <div className={`z-10 left-[${leftInPercentage ?? '35'}%] top-[${topInPx ?? '200'}px] w-[${widthInPx ?? '400'}px] h-[${heightInPx ?? '200'}px] fixed bg-white rounded-md py-2`}>
                { 
                    primaryMessage && 
                    <h1 className="text-black text-center text-3xl font-bold">{primaryMessage}</h1>
                }
                { 
                    secondaryMessage && 
                    <h1 className="text-red-600 text-center font-bold py-5">{secondaryMessage}</h1>
                }
                { body() }
            </div>
        </>
    );
}