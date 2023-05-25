import { useRef, useEffect, useContext } from 'react';
import { Card } from '@/components/Card';
import Head from 'next/head';
import { AuthContext } from '@/contexts/AuthContext';
import { isGuestSSR } from '@/utils/isGuestSSR';

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useContext(AuthContext);

  function submitHandler(event) {
    event.preventDefault();
    const loginFormData = {
        email: emailRef.current.value,
        password: passwordRef.current.value
    }

    signIn(loginFormData);
}

  return (
    <main>
      <Head>
        <title>Stock && Repo Faça seu login</title>
      </Head>
      <Card background="white">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">
                        Entrar
                    </h1>
                    <form className="mt-6" onSubmit={submitHandler}>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                ref={emailRef}
                                required
                                aria-required='true'
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                ref={passwordRef}
                                required
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Não possui uma conta? cadastre-se {" "}
                        <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Registrar
                        </a>
                    </p>
            </Card>
      
    </main>
  )
}

export const getServerSideProps = isGuestSSR(async(context) => {
    return {
        props: {}
    }
});
