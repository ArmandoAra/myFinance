
import { SQLiteDatabase } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

import { Spend } from "@/constants/interfaces";



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

export async function insertNewSpend(data: {
    data: Spend
}) {
    const { service, amount, type, description, createdAt, month, year } = data.data;

    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const dateToInsert = createdAt.toISOString().split('T')[0];
    try {
        db.runAsync('INSERT INTO Spend ( service, amount, type, description, createdAt, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)', [service, amount, type, description, dateToInsert, month, year])
    } catch (error) {
        console.log(error)

    }
}



export async function deleteSpend(id: number) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        await db.runAsync('DELETE FROM Spend WHERE id = $value', { $value: id })
    } catch (error) {
        console.log(error)
    }
}
