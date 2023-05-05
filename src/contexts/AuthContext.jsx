import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useState, useEffect } from 'react';
import { api } from '@/services/api/apiClient';
import { toast } from 'react-toastify';


export const AuthContext = createContext({
    user: {},
    isAuthenticated: false,
    signUp: (credentials) => {},
    signIn: (credentials) => {},
    signOut: () => {},
    forgotPassword: (recoveryEmail) => {},
    changePassword: (newPasswordData) => {},
    inviteEmployee: (employeeData) => {},
    confirmPasswordRecovery: (randomPassword) => {},
});

export async function signOut() {
    try {
        await api.post('auth/logout');
        destroyCookie(undefined, '@stock_and_repo.token');
        Router.push('/');
    } catch(error) {
        console.log("Error ao deslogar.");
        console.log(`Message: ${error}`);
    }
}

export function AuthProvider ({ children }) {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const cookieExpirationTime = 60 * 60 * 24 * 30; // 1 Mês

    useEffect(() => {
        const { '@stock_and_repo.token': token } = parseCookies();

        if(token) {
            api.get('auth/me')
            .then(response => {
                setUser(response.data);
                setIsAuthenticated(true);
            }).catch((error) => {
                signOut();
            });
        }
        
    }, []);

    async function signIn({email, password}) {
        try {
            const response = await api.post('auth/login', {
                email,
                password
            });
            
            const token = response.data.token;

            setCookie(undefined,'@stock_and_repo.token', token, {
                maxAge: cookieExpirationTime,
                path: "/" // Caminhos que terão acesso ao cookie, nesse caso, o "/" é todos!
            });

            setUser(response.data.user);
            setIsAuthenticated(true);
            //Passar para as proximas requisições o nosso token.
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success("Login efetuado com sucesso!");

            Router.push('/dashboard');
        } catch(error) {
            toast.error("Oops, ocorreu um erro ao logar, por favor, tente novamente.");
            console.log("Erro ao acessar", error);
        }
    }

    async function signUp(singnUpData) {
        try {
            await api.post('auth/register', singnUpData);
            toast.success("Cadastro concluído com sucesso, por favor, faça o login para continuar.");
            Router.push('/');
        } catch(error) {
            toast.error("Oops, ocorreu um erro ao se cadastrar, por favor, tente novamente.");
            console.log("Erro ao cadastrar um usuário", error);
        }
    }

    async function changePassword(newPasswordData) {
        await api.post("auth/change-password", newPasswordData)
        .then(response => {
            if(response.data.success) {
                toast.success("Senha alterada com sucesso, por favor, faça o login novamente.");
                signOut();
                Router.push('/');
            }
        })
        .catch(error => {
            console.log(`Deu merda paizão! ${error}`)
            toast.error("Ocorreu um erro ao alterar a senha do usuário, por favor, tente novamente.");
            // navigate("/change-password");
        });
    }
    
    async function inviteEmployee(employeeData) {
        await api.post("auth/invite-employee", employeeData)
        .then(response => {
            console.log(response.data);
            if(response.data.success) {
                toast.success("Convite enviado com sucesso!");
                // navigate("/invite-employee")
            }
        })
        .catch(error => {
            toast.error("Ocorreu um erro ao convidar um funcionário, por favor, tente novamente!");
        });
    }
    
    async function forgotPassword(recoveryEmail) {
        await api.post("auth/recover-password", recoveryEmail)
        .then(response => {
            console.log(response.data);
            if(response.data.success) {
                toast.success("Enviamos um e-mail com as instruções para recuperação.");
                Router.push('/recover-password-confirmation');
            }
        })
        .catch(error => {
            toast.error("Ocorreu um erro ao solicitar recuperação de senha, por favor, tente novamente!");
        });
    }
    
    async function confirmPasswordRecovery(randomPassword) {
        await api.post("auth/confirm-recovery", randomPassword)
        .then(response => {
            console.log(response.data);
            if(response.data.success) {
                toast.success("Senha alterada com sucesso!, por favor, faça o login novamente.");
                Router.push('/');
            }
        })
        .catch(error => {
            console.log(error);
            toast.error("Ocorreu um erro ao alterar senha, por favor, tente novamente!");
        });
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signUp, signIn, signOut, forgotPassword, changePassword, confirmPasswordRecovery, inviteEmployee}}>
            { children }
        </AuthContext.Provider>
    );
}