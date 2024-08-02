import * as SQLite from 'expo-sqlite';

import { Spend } from "@/constants/interfaces";

//Utils
import { mergeAmountsAndSpends, sortByMonth, YearAndMonthData } from "@/utils/sortData";
import { sumAmountsAndSpendAmounts, sumAmountsByMonth } from "@/utils/calculate";

// Interface
export interface User {
    name: string;
}

export interface UpdateIncome {
    amount: number;
    year: number;
    month: string;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export interface GetMonthIncome {
    amount: number;
    year: number;
    month: string;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}

export interface YearData {
    amount: number;
    month: string;
}

export interface YearDataResult {
    amounts: number;
    spendAmounts: number;
}

export interface YearSpends {
    month: string;
    amount: number;
}
export interface MonthData {
    month: string;
    spendAmount: number;
}

// User
// Insert User
export async function inserUserByName(
    name: string,
    setUser: React.Dispatch<React.SetStateAction<string>>,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        setLoading(true)
        const result = await db.getAllAsync<{ name: string }>(`SELECT name FROM User WHERE name = ?`, [name])

        if (result.length === 0) {
            // Si no existe el usuario, entonces lo inserta
            await db.runAsync('INSERT INTO User (name) VALUES (?)', [name])
            setUser(name)
            setIsLogged(true)
        }
        setLoading(false)
    }
    catch (error) {
        console.log('Error getting user', error)
    }
}


export async function getUser(
    setUser: React.Dispatch<React.SetStateAction<string>>,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ name: string }>(`SELECT name FROM User`)
        if (result.length === 0) {
            setIsLogged(false)
        } else {
            setIsLogged(true)
            setUser(result[0].name)
        }
    } catch (error) {
        console.log('Error getting user on GetUser')

    }
}

// Income
// Insert Income
export async function insertNewIncome({ amount, month, year, setAmount }: UpdateIncome) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        await db.runAsync('INSERT INTO Income (amount, month, year) VALUES (?, ?, ?)', [amount, month, year])
        setAmount(amount)
    } catch (error) {
        console.log('Error inserting income', error)
        console.log(error)
    }
}


//Update Income
export async function updateIncome({ amount, month, year, setAmount }: UpdateIncome) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        await db.runAsync('UPDATE Income SET amount = ? WHERE month = ? AND year = ?', [amount, month, year])
        setAmount(amount)
    } catch (error) {
        console.log('Error updating income', error)
        console.log(error)
    }

}

// Get Income 
//Month
export async function getMonthIncome({ amount, year, month, setAmount }: GetMonthIncome) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        const result = await db.getAllAsync<{ amount: number }>('SELECT amount FROM Income WHERE month = ? AND year = ?', [month, year])

        if (result.length !== 0) {
            setAmount(result[0].amount)
        } else {
            await insertNewIncome({ amount, month, year, setAmount })
        }
    } catch (error) {
        console.log("getMonthIncome error", error)
    }
}

// Get All Income from Year
export async function getYearIncome(year: number, setYearData: React.Dispatch<React.SetStateAction<YearData[]>>) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        const result = await db.getAllAsync<{ amount: number, month: string }>('SELECT amount,month FROM Income WHERE  year = ?', [year])
        const sorted = sortByMonth(result)
        setYearData(sorted)
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
        console.log('Income updated')
    } catch (error) {
        console.log('Error updating income', error)
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
        await db.runAsync('INSERT INTO Spend ( service, amount, type, description, createdAt, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)', [service, amount, type.length > 0 ? type : "?", description, dateToInsert, month, year])
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
        const result = await db.getAllAsync<Spend>('SELECT * FROM Spend WHERE month = ? AND year = ?', [selectedMonth, selectedYear]);
        const spends = result.map(item => ({
            id: item.id,
            service: item.service,
            amount: item.amount,
            type: item.type,
            description: item.description,
            month: item.month,
            year: item.year,
            createdAt: new Date(item.createdAt),
        }));
        setSpends(spends);
    } catch (error) {
        console.log('Error getting month spends', error);
    }

}

export async function getAllYearSpends(
    selectedYear: number,
    setMonthData: React.Dispatch<React.SetStateAction<MonthData[]>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ month: string, amount: number }>("SELECT month,amount FROM Spend WHERE  year = ?", [selectedYear])
        const calculateSpend = sumAmountsByMonth(result);
        setMonthData(calculateSpend)
    } catch (error) {
        console.log(error)
    }
}

export async function updateSpend({ data, setShowEditInput }: { data: Spend, setShowEditInput: (showSpendInput: boolean) => void }) {
    const { service, amount, type, description, createdAt, id } = data;

    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const dateToInsert = createdAt.toISOString().split('T')[0];
    try {
        await db.runAsync(
            'UPDATE Spend SET service = ?, amount = ?, type = ?, description = ?, createdAt = ? WHERE id = ?',
            [service, amount, type, description, dateToInsert, id]
        );
        setShowEditInput(false)
    } catch (error) {
        console.log(error)
    }
}

// Delete Spend
export async function deleteSpend(id: number) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        await db.runAsync('DELETE FROM Spend WHERE id = ?', [id])
    } catch (error) {
        console.log(error)
    }
}

// Total
export async function getYearData(
    selectedYear: number,
    setYearAndMonthData: React.Dispatch<React.SetStateAction<YearAndMonthData[]>>,
    setYearData: React.Dispatch<React.SetStateAction<YearDataResult | undefined>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {

        const yearIncomes = await db.getAllAsync<{ amount: number, month: string }>('SELECT amount,month FROM Income WHERE  year = ?', [selectedYear])
        const sorted = sortByMonth(yearIncomes)

        const spends = await db.getAllAsync<{ month: string, amount: number }>("SELECT month,amount FROM Spend WHERE  year = ?", [selectedYear])
        const calculatedSpends = sumAmountsByMonth(spends);
        const merged = mergeAmountsAndSpends(yearIncomes, calculatedSpends)
        const yearData = sumAmountsAndSpendAmounts(merged)

        setYearAndMonthData(merged)
        setYearData(yearData)


    } catch (error) {
        console.log("getYearData error", error)
    }
}
