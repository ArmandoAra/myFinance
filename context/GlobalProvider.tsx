import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

import { getMonthByNumber } from '@/utils/getMonth';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getUser } from '@/db/dbTools';
import { useSQLiteContext } from 'expo-sqlite';
// Definición de la interfaz del contexto global
interface GlobalContextProps {
    isLogged: boolean;
    user: string;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
    name: string | null;
}

// Contexto Global
const GlobalContext = createContext<GlobalContextProps>({
    isLogged: false,
    user: "",
    loading: true,
    setUser: () => { },
    setIsLogged: () => { },
    setLoading: () => { },
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
    children: ReactNode;
}



export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {

    const db = useSQLiteContext();

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        db.withTransactionAsync(async () => {
            getUser(setUser, setIsLogged)
        });
    }, [user]);



    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                setUser,
                setIsLogged,
                setLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
