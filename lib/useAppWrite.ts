import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getAllPosts } from "./appwrite";
import { Models } from "react-native-appwrite";

// Define the VideoData interface
interface VideoData {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    creator: string | null;
    prompt: string;
    thumbnail: string;
    title: string;
    video: string;
}

// Creating a custom hook to manage application state
// It will receive a function as a parameter
const useAppWrite = (fn: () => Promise<any>) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fn();
            // Assuming response is a JSON string, parse it and set to state
            setData(JSON.parse(response));
        } catch (error) {
            Alert.alert("Error Obteniendo los datos");
        }
        setLoading(false);
    };

    // Fetch data as soon as the component loads
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();
    return { data, loading, refetch };
};

export default useAppWrite;

// Este custom hook useAppWrite facilita la obtención de datos asíncronos y el manejo de estados 
// de carga en componentes de React. Permite reutilizar la lógica de obtención de datos de manera 
// fácil y centralizada, proporcionando una manera de volver a obtener los datos (refetch) y mostrando 
// un estado de carga (loading) mientras los datos se están obteniendo.

"2:38:46"