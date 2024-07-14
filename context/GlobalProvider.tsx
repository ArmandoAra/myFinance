import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

import { getMonthByNumber } from '@/utils/getMonth';
// Definición de la interfaz del contexto global
interface GlobalContextProps {
    isLogged: boolean;
    user: User;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
    id: number | null;
    name: string | null;
    email: string;
}

// Contexto Global
const GlobalContext = createContext<GlobalContextProps>({
    isLogged: false,
    user: {
        id: null,
        name: null,
        email: '',
    },
    loading: true,
    setUser: () => { },
    setIsLogged: () => { },

});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
    children: ReactNode;
}



export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        id: null,
        name: null,
        email: '',
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Verificar si el usuario está logueado
        // Si el usuario está logueado, se obtiene la información del usuario
        // Si el usuario no está logueado, se muestra la pantalla de login
    }, []);



    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                setUser,
                setIsLogged,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
