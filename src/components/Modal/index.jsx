
export default function Modal({onResponse}) {
    return(
        <>
        <span className="top-0 bg-slate-950 w-screen h-screen z-10 fixed opacity-80"></span>
            <div className="z-10 left-[35%] top-[200px] w-[400px] h-[250px] fixed bg-white rounded-md py-2">
                <h1 className="text-black text-center text-3xl font-bold">Tem certeza que deseja apagar esse produto ?</h1>
                <h1 className="text-red-600 text-center font-bold py-5">Tenha em mente que essa ação não poderá ser desfeita.</h1>
                <div className="flex justify-between px-24 py-3">
                    <button onClick={() => {onResponse(true)}} className="text-white bg-green-500 py-2 px-4 rounded-md">Sim</button>
                    <button onClick={() => {onResponse(false)}} className="text-white bg-red-600 py-2 px-4 rounded-md">Não</button>
                </div>
            </div>
        </>
    );
}