import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { isGuestSSR } from "@/utils/isGuestSSR";

export default function RecoverPasswordConfirmation() {
    const [processingRequest, setProcessingRequest] = useState(false);
    const randomPasswordRef = useRef();
    const { confirmPasswordRecovery } = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();
        setProcessingRequest(true);
        const randomPassword = {
            randomPassword: randomPasswordRef.current.value
        }
        
        confirmPasswordRecovery(randomPassword, navigate);
    }

   return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-5">
            <Head>
                <title>Recuperar senha</title>
            </Head>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Insira o token enviado para o e-mail de recuperação
                </h1>
                <div className="mt-4 flex flex-col border-2 border-purple-700 p-2">
                    <span className="text-sm font-bold text-gray-800">Enviamos um e-mail com um token para continuação da recuperação,</span>
                    <span className="text-sm font-bold text-gray-800">caso o e-mail não tenha chegado, cheque o spam ou lixeira,</span>
                    <span className="text-sm font-bold text-gray-800">senão, espere mais alguns minutos. Caso depois de esperar alguns minutos não tenha chegado</span>
                    <span className="text-sm font-bold text-gray-800">solicite a recuperação novamente.</span>
                </div>
                <form className="mt-6" onSubmit={submitHandler}>                  
                    <div className="mb-2">
                        <label
                            htmlFor="randomPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Token de recuperação
                        </label>
                        <input
                            type="text"
                            id="randomPassword"
                            required
                            ref={randomPasswordRef}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                        type="submit"
                        disabled={processingRequest} 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-slate-400">
                            Confirmar solicitação
                        </button>
                    </div>
                </form>
            </div>
        </div>
   ); 
}

export const getServerSideProps = isGuestSSR(async () => {
    return {
        props: {}
    }
});