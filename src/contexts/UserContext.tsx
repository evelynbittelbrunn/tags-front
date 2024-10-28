import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LOGIN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../services/api';

type UserContextType = {
    userLogin: (email: string, password: string) => Promise<void>;
    userLogout: () => void;
    data: any;
    error: string | null;
    loading: boolean;
    login: boolean | null;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserStorage = ({ children }: any) => {
    const [data, setData] = useState<any>(null);
    const [login, setLogin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            console.log(token);
            if (token) {
                try {
                    setError(null);
                    setLoading(true);

                    const response = await TOKEN_VALIDATE_POST(token);
                    if (!response.status || response.status !== 200) {
                        throw new Error('Token inválido!');
                    }

                    await getUser(token);
                } catch (error) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLogin(false);
            }
        }
        autoLogin();
    }, []);

    async function getUser(token: string) {
        try {
            const response = await USER_GET(token);
            setData(response.data);
            setLogin(true);
        } catch (error) {
            console.error("Erro ao obter o usuário:", error);
            setLogin(false);
        }
    }

    async function userLogin(email: string, password: string) {
        try {
            setError(null);
            setLoading(true);

            const response = await LOGIN_POST({ email, password });

            if (!response || !response.data.token) {
                throw new Error(`Error: Falha na autenticação`);
            }

            const { token, userId } = response.data;

            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', userId);
            await getUser(token);
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || error.message || 'Erro desconhecido');
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    async function userLogout() {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <UserContext.Provider
            value={{ userLogin, userLogout, data, error, loading, login }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserStorage