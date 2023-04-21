import Head from "next/head";
import { isGuestSSR } from "@/utils/isGuestSSR";
import { useContext, useRef, useState } from "react";
import { AuthContext } from '@/contexts/AuthContext';

export default function Register() {
    const availablePlans = [{label: 'Essential', id: '1'}, {label: 'Premium', id: '2'}];
    const nameRef = useRef();
    const companyNameRef = useRef();
    const companyCnpjRef = useRef();
    const selectedPlanRef = useRef();
    const emailRef = useRef();
    const emailConfirmationRef = useRef();
    const [emailValid, setEmailValid] = useState(true);
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [passwordValid, setPasswordValid] = useState(true);
    const { signUp } = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();
        const registrationData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            email_confirmation: emailConfirmationRef.current.value,
            roleId: 1,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            companyName: companyNameRef.current.value,
            companyCnpj: companyCnpjRef.current.value,
            planId: Number.parseInt(selectedPlanRef.current.value)
        }
        
        signUp(registrationData);
    }

    function isEmailConfirmed() {
        const email = emailRef.current.value;
        const emailConfirmation = emailConfirmationRef.current.value
        const isValid = email && emailConfirmation && email === emailConfirmation;
        setEmailValid(isValid);
    }

    function isPasswordConfirmed() {
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value
        const isValid = password && passwordConfirmation && password === passwordConfirmation;
        setPasswordValid(isValid);
    }

    return(
        <main>
            <Head>
                <title>Cadastre-se</title>
            </Head>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-5">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-5xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">
                        Cadastre-se
                    </h1>
                    <form className="mt-6" onSubmit={submitHandler}>
                        
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nome do Administrador
                            </label>
                            <input
                                type="text"
                                id="name"
                                required={true}
                                ref={nameRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="companyName"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nome da Empresa
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                required={true}
                                ref={companyNameRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        
                        <div className="mb-2">
                            <label
                                htmlFor="cnpj"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                CNPJ da Empresa
                            </label>
                            <input
                                type="text"
                                id="cnpj"
                                required={true}
                                ref={companyCnpjRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="plan"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Selecione o Plano
                            </label>
                            <select 
                                ref={selectedPlanRef} 
                                required={true}
                                id="plan"
                                className="block w-52 py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                {availablePlans.map((option) => {
                                    return <option key={option.id} value={option.id} >{option.label}</option>
                                })}
                            </select>
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required={true}
                                onChange={isEmailConfirmed}
                                ref={emailRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {
                                !!emailValid
                                ? ''
                                : <span className="text-red-500">o e-mail deve ser igual a confirmação</span>
                            }
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="emailConfirm"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirme o e-mail
                            </label>
                            <input
                                type="email"
                                id="emailConfirm"
                                required={true}
                                onChange={isEmailConfirmed}
                                ref={emailConfirmationRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {
                                !!emailValid
                                ? ''
                                : <span className="text-red-500">o e-mail deve ser igual a confirmação</span>
                            }
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                required={true}
                                onChange={isPasswordConfirmed}
                                ref={passwordRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {
                                !!passwordValid
                                ? ''
                                : <span className="text-red-500">A senha deve ser igual a confirmação</span>
                            }
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="passwordConfirm"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirme a senha
                            </label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                required={true}
                                onChange={isPasswordConfirmed}
                                ref={passwordConfirmationRef}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {
                                !!passwordValid
                                ? ''
                                : <span className="text-red-500">A senha deve ser igual a confirmação</span>
                            }
                        </div>
                        <div className="mt-6">
                            <button
                            type="submit" 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export const getServerSideProps = isGuestSSR(async () => {
    return {
        props: {}
    }
});