import { AuthContext } from "@/contexts/AuthContext";
import { isGuestSSR } from "@/utils/isGuestSSR";
import Head from "next/head";
import { useContext, useRef, useState } from "react";

export default function ForgotPassword () {
    const [processingRequest, setProcessingRequest] = useState(false);
    const recoveryEmailRef = useRef();
    const { forgotPassword } = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();
        const recoveryEmail = {
            recoveryEmail: recoveryEmailRef.current.value
        }

        setProcessingRequest(true);
        forgotPassword(recoveryEmail);
    }

   return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-5">
            <Head>
                <title>Recuperar senha</title>
            </Head>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Recuperar senha
                </h1>
                <div className="mt-2 flex flex-col border-2 border-purple-700 p-2">
                    <span className="text-sm font-bold text-gray-800">Esqueceu sua senha? não se preocupe,</span>
                    <span className="text-sm font-bold text-gray-800">insira o e-mail de recuperação abaixo e se o e-mail existir em nossa base de dados</span>
                    <span className="text-sm font-bold text-gray-800">iremos enviar as instruções para recuperação ;)</span>
                </div>
                <form className="mt-6" onSubmit={submitHandler}>                  
                    <div className="mb-2">
                        <label
                            htmlFor="recoveryEmail"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            E-mail de recuperação
                        </label>
                        <input
                            type="email"
                            id="recoveryEmail"
                            required
                            ref={recoveryEmailRef}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                        type="submit"
                        disabled={processingRequest} 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-slate-400">
                            Enviar solicitação de recuperação
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = isGuestSSR(async(context) => {
    return {
        props: {}
    }
});