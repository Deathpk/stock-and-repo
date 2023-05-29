import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { isAuthenticatedSSR } from "@/utils/isAuthenticatedSSR";
import { NavbarTitleContext } from "@/contexts/NavbarTitleContext";
export default function ChangePassword () {
    const navbarTitleContext = useContext(NavbarTitleContext);
    navbarTitleContext.updateNavbarTitle("Trocar senha");

    const [processingRequest, setProcessingRequest] = useState(false);
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmationRef = useRef();
    const { changePassword } = useContext(AuthContext);

    function submitHandler (event) {
        event.preventDefault();
        const passwordChangeData = {
            oldPassword: oldPasswordRef.current.value,
            newPassword: newPasswordRef.current.value,
            newPassword_confirmation: newPasswordConfirmationRef.current.value
        }
        setProcessingRequest(true);
        changePassword(passwordChangeData);
    }

    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <Head>
                    <title>Mudar senha</title>
                </Head>
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                    <form className="mt-6" onSubmit={submitHandler}>                  
                       <div className="mb-2">
                            <label
                                htmlFor="oldPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Senha Antiga
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                required
                                ref={oldPasswordRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nova senha
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                required
                                ref={newPasswordRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="newPasswordConfirmation"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirme a nova senha
                            </label>
                            <input
                                type="password"
                                id="newPasswordConfirmation"
                                required
                                ref={newPasswordConfirmationRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mt-6">
                            <button
                            type="submit"
                            disabled={processingRequest} 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-slate-400">
                                Confirmar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export const getServerSideProps = isAuthenticatedSSR(async (context) => {
    return {
        props:{}
    }
});