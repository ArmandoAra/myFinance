import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


//Datos de configuracion de Appwrite, obtenidos desde el panel de Appwrite
//Podemos hacer un destructuring de estos datos para no tener que escribirlos cada vez como appwriteConfig.[objeto]
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.armandoara.mf",
    projectId: "667856b8002142c995a6",
    databaseId: "667859300020424884c0",
    usersCollectionId: "6678595300306a69d7d6",
    videosCollectionId: "667859ad0029a0361677",
    storageId: "66785c9b00123d3cbca7",
}

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;
// Sign In
export const signIn = async ({ email, password }: { email: string, password: string }) => {
    //deactive if any session is active
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if (!session) throw new Error("Error signing in");
        return session;
    } catch (error) {
        console.log(error);
        throw new Error("Error signing in");
    }
}

// Register User
export const createUser = async ({ email, password, userName }: { email: string, password: string, userName: string }) => {
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }


    try {
        const newAcount = await account.create(
            ID.unique(),
            email,
            password,
            userName
        );

        if (!newAcount) throw new Error("Error creating user ");

        const avatarUrl = avatar.getInitials(userName);

        await signIn({ email, password });
        // Despues de loguear al usuario, se crea un nuevo documento en la coleccion de usuarios en la base de datos
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAcount.$id,
                email: newAcount.email,
                userName: userName,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(email, password, userName)
        console.log(error);
        throw new Error("Error creating user ");
    }

}

// Get Current User
export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.log("No current user logged")
        console.log(error);
        return null;
    }
}

// Sign Out User
export const signOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.log("Estoy fuera")
        console.log(error);
    }
}



//sitios donde he importado la funcion
export const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId
        )

        return JSON.stringify(posts.documents);
    } catch (error) {
        console.log(error);
        throw new Error("Error getting all Posts");

    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt') && Query.limit(7)]
        )

        return JSON.stringify(posts.documents);
    } catch (error) {
        console.log(error);
        throw new Error("Error getting all Posts");

    }
}
