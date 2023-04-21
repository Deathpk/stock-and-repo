export function Card (props) {
    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className={`w-full p-6 m-auto bg-${props.background ?? "white"} rounded-md shadow-md lg:max-w-5xl`}>
                {props.children}
            </div>
        </div>
    );
}