import { SQLiteDatabase } from "expo-sqlite"
import * as SQLite from 'expo-sqlite';

import { Spend } from "@/constants/interfaces";

// Interface
export interface InsertUser {
    name: string;
    email: string;
    password: string;
}

export interface InsertIncome {
    amount: number;
    year: number;
    month: string;
}

export interface GetMonthIncome {
    year: number;
    month: string;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}


// User
// Insert User
export async function inserUserByEmail({ name, email, password }: InsertUser) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

}

// Get User by Email
export async function getUserByEmail(email: string) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const result = await db.getAllAsync(`SELECT id,name FROM User WHERE email = ?`, [email])
}


// Income
// Insert Income
export async function updateIncome({ amount, year, month }: InsertIncome) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        await db.runAsync('UPDATE Income SET amount = ? WHERE month = ? AND year = ?', [amount, month, year])
            .then(() => { console.log('Income updated') })
    } catch (error) {
        console.log('Error updating income', error)
        console.log(error)
    }

}

// Get Income
//Month
export async function getMonthIncome({ year, month, setAmount }: GetMonthIncome) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        const result = await db.getAllAsync<{ amount: number }>('SELECT amount FROM Income WHERE month = ? AND year = ?', [month, year])
            .then((result) => {
                return result
            });
        if (result.length !== 0) {
            setAmount(result[0].amount)
        } else {
            try {
                await updateIncome({ amount: 0, year, month })
            } catch (error) {
                console.log("Error to insert the month income")
                console.log(error)
            }
        }
    } catch (error) {
        console.log("getMonthIncome error", error)
    }
}

// Get All Income from Year
export async function getYearIncome(year: number) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        const result = await db.getAllAsync<{ amount: number }>('SELECT amount,month FROM Income WHERE  year = ?', [year])
            .then((result) => {
                return result
            });

    } catch (error) {
        console.log("getMonthIncome error", error)
    }
}

// Update Income
export async function updateMonthIncome(
    income: number,
    month: string,
    year: number,
) {

    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        await db.runAsync('UPDATE Income SET amount = ? WHERE month = ? AND year = ?', [income, month, year])
            .then(() => { console.log('Income updated') })
    } catch (error) {
        console.log('Error updating income', error)
        console.log(error)
    }

}

//Spend
// Insert Spend
export async function insertSpend(data: {
    data: Spend
}) {
    const { service, amount, type, description, createdAt, month, year } = data.data;

    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const dateToInsert = createdAt.toISOString().split('T')[0];
    try {
        await db.runAsync('INSERT INTO Spend ( service, amount, type, description, createdAt, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)', [service, amount, type, description, dateToInsert, month, year])
    } catch (error) {
        console.log(error)
    }
}

// Get Spend
export async function getMonthSpends(
    selectedYear: number,
    selectedMonth: string,
    setSpends: React.Dispatch<React.SetStateAction<Spend[]>>) {

    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync("SELECT * FROM Spend WHERE month = ? AND year = ?", [selectedMonth, selectedYear])
            .then((result: any[]): Spend[] => {
                return result.map(item => ({
                    id: item.id,
                    service: item.service,
                    amount: item.amount,
                    type: item.type,
                    description: item.description,
                    month: item.month,
                    year: item.year,
                    userId: item.userId,
                    createdAt: new Date(item.createdAt)
                }));
            });
        setSpends(result)
    } catch (error) {
        console.log(error)
    }
}

export async function updateSpend(data: {
    data: Spend
}) {
    const { service, amount, type, description, createdAt, month, year, id } = data.data;

    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const dateToInsert = createdAt.toISOString().split('T')[0];
    try {
        await db.runAsync('UPDATE Spend SET service = ? WHERE id = ?', [service, id])
        await db.runAsync('UPDATE Spend SET amount = ? WHERE id = ?', [amount, id])
        await db.runAsync('UPDATE Spend SET type = ? WHERE id = ?', [type, id])
        await db.runAsync('UPDATE Spend SET description = ? WHERE id = ?', [description, id])
        await db.runAsync('UPDATE Spend SET createdAt = ? WHERE id = ?', [dateToInsert, id])
            .then(() => { console.log('Spend updated') })
    } catch (error) {
        console.log(error)
    }
}

// Delete Spend
export async function deleteSpend(id: number) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        await db.runAsync('DELETE FROM Spend WHERE id = $value', { $value: id })
    } catch (error) {
        console.log(error)
    }
}
