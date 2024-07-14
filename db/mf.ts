import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';




// Función para abrir la base de datos y crear las tablas
export const openDatabase = async () => {

    const db = SQLite.useSQLiteContext();
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
    
            CREATE TABLE IF NOT EXISTS User (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT UNIQUE,
              name TEXT,
              password TEXT,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
    
            CREATE TABLE IF NOT EXISTS Year (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              year INTEGER,
              userId INTEGER,
              FOREIGN KEY (userId) REFERENCES User(id)
            );
    
            CREATE TABLE IF NOT EXISTS Month (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              yearId INTEGER,
              month TEXT,
              brutIncome REAL,
              FOREIGN KEY (yearId) REFERENCES Year(id)
            );
    
            CREATE TABLE IF NOT EXISTS Spend (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              monthId INTEGER,
              service TEXT,
              amount REAL,
              type TEXT,
              description TEXT,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (monthId) REFERENCES Month(id)
            );
            
            CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY NOT NULL, 
            value TEXT NOT NULL, 
            intValue INTEGER);
            INSERT INTO test (value, intValue) VALUES ('test1', 123);
            INSERT INTO test (value, intValue) VALUES ('test2', 456);
            INSERT INTO test (value, intValue) VALUES ('test3', 789);
            );
        `);

        return db;

    } catch (error) {
        console.log(error)
    }

};


// Función para insertar un usuario
export const insertUser = async (db: any, email: string, name: string, password: string) => {
    const statement = await db.prepareAsync(
        'INSERT INTO User (email, name, password) VALUES ($email, $name, $password)'
    );
    try {
        const result = await statement.executeAsync({ $email: email, $name: name, $password: password });
        console.log('User inserted:', result.lastInsertRowId);
    } finally {
        await statement.finalizeAsync();
    }
};

// Función para insertar un año
export const insertYear = async (db: any, year: number, userId: number) => {
    const statement = await db.prepareAsync('INSERT INTO Year (year, userId) VALUES ($year, $userId)');
    try {
        const result = await statement.executeAsync({ $year: year, $userId: userId });
        console.log('Year inserted:', result.lastInsertRowId);
    } finally {
        await statement.finalizeAsync();
    }
};

// Función para insertar un mes
export const insertMonth = async (db: any, yearId: number, month: string, brutIncome: number) => {
    const statement = await db.prepareAsync(
        'INSERT INTO Month (yearId, month, brutIncome) VALUES ($yearId, $month, $brutIncome)'
    );
    try {
        const result = await statement.executeAsync({ $yearId: yearId, $month: month, $brutIncome: brutIncome });
        console.log('Month inserted:', result.lastInsertRowId);
    } finally {
        await statement.finalizeAsync();
    }
};

// Función para insertar un gasto
export const insertSpend = async (db: any, monthId: number, service: string, amount: number, type: string, description: string) => {
    const statement = await db.prepareAsync(
        'INSERT INTO Spend (monthId, service, amount, type, description) VALUES ($monthId, $service, $amount, $type, $description)'
    );
    try {
        const result = await statement.executeAsync({
            $monthId: monthId,
            $service: service,
            $amount: amount,
            $type: type,
            $description: description,
        });
        console.log('Spend inserted:', result.lastInsertRowId);
    } finally {
        await statement.finalizeAsync();
    }
};

export const getUserById = async (db: any, id: number) => {
    const statement = await db.prepareAsync('SELECT * FROM User WHERE id = $id');
    try {
        const result = await statement.executeAsync({ $id: id });

        const firstRow = await result.getFirstAsync();
        console.log(firstRow.id, firstRow.email, firstRow.name, firstRow.password, firstRow.createdAt, firstRow.updatedAt);

        await result.resetAsync();

        const allRows = await result.getAllAsync();
        for (const row of allRows) {
            console.log(row.id, row.email, row.name, row.password, row.createdAt, row.updatedAt);
        }

        await result.resetAsync();

        for await (const row of result) {
            console.log(row.id, row.email, row.name, row.password, row.createdAt, row.updatedAt);
        }
    } finally {
        await statement.finalizeAsync();
    }
};


