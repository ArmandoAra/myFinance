import { SQLiteDatabase } from "expo-sqlite"
import * as SQLite from 'expo-sqlite';

import { Spend } from "@/constants/interfaces";

//Utils
import { mergeAmountsAndSpends, sortByMonth, YearAndMonthData } from "@/utils/sortData";
import { sum } from '../../mypf/src/components/utils/calculate';
import { sumAmountsAndSpendAmounts, sumAmountsByMonth } from "@/utils/calculate";
import { set } from 'date-fns';

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
    //Verificar si el usuario ya existe
    try {
        setLoading(true)
        const result = await db.getAllAsync<{ name: string }>(`SELECT name FROM User WHERE name = ?`, [name])
            .then((result) => {
                return result
            });
        if (result.length === 0) {
            // Si no existe el usuario, entonces lo inserta
            try {
                const result = await db.runAsync('INSERT INTO User (name) VALUES (?)', [name])
                    .then(() => setUser(name))
                setIsLogged(true)
                setLoading(false)

            } catch (error) {
                console.log('Error inserting user', error)
                console.log(error)
            }
        }
    }
    catch (error) {
        console.log('Error getting user', error)
        console.log(error)
    }
}


export async function getUser(
    setUser: React.Dispatch<React.SetStateAction<string>>,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ name: string }>(`SELECT name FROM User`)
            .then((result) => {
                console.log(result)
                if (result.length === 0) {
                    return setIsLogged(false)
                } else {
                    setIsLogged(true)
                    return setUser(result[0].name)

                }
            });

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
            .then(() => { setAmount(amount) })
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
            .then(() => { setAmount(amount) })
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
            .then((result) => {
                return result
            });
        if (result.length !== 0) {
            setAmount(result[0].amount)
        } else {
            try {
                await insertNewIncome({ amount, month, year, setAmount })
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
export async function getYearIncome(year: number, setYearData: React.Dispatch<React.SetStateAction<YearData[]>>) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        const result = await db.getAllAsync<{ amount: number, month: string }>('SELECT amount,month FROM Income WHERE  year = ?', [year])
            .then((result) => {
                return result
            });
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
        return setSpends(result)
    } catch (error) {
        console.log(error)
    }
}

export async function getAllYearSpends(
    selectedYear: number,
    setMonthData: React.Dispatch<React.SetStateAction<MonthData[]>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ month: string, amount: number }>("SELECT month,amount FROM Spend WHERE  year = ?", [selectedYear])
            .then((result) => {
                return sumAmountsByMonth(result);
            });
        setMonthData(result)
    } catch (error) {
        console.log(error)
    }
}

export async function updateSpend({ data, setShowEditInput }: { data: Spend, setShowEditInput: (showSpendInput: boolean) => void }) {
    const { service, amount, type, description, createdAt, id } = data;

    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    const dateToInsert = createdAt.toISOString().split('T')[0];
    try {
        await db.runAsync('UPDATE Spend SET service = ? WHERE id = ?', [service, id])
        await db.runAsync('UPDATE Spend SET amount = ? WHERE id = ?', [amount, id])
        await db.runAsync('UPDATE Spend SET type = ? WHERE id = ?', [type.length > 0 ? type : "?", id])
        await db.runAsync('UPDATE Spend SET description = ? WHERE id = ?', [description, id])
        await db.runAsync('UPDATE Spend SET createdAt = ? WHERE id = ?', [dateToInsert, id])
            .then(() => { setShowEditInput(false) })
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


// Total
export async function getYearData(
    selectedYear: number,
    setYearAndMonthData: React.Dispatch<React.SetStateAction<YearAndMonthData[]>>,
    setYearData: React.Dispatch<React.SetStateAction<YearDataResult | undefined>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    try {
        try {
            const yearIncomes = await db.getAllAsync<{ amount: number, month: string }>('SELECT amount,month FROM Income WHERE  year = ?', [selectedYear])
                .then((yearIncomes) => {
                    return yearIncomes
                });
            const sorted = sortByMonth(yearIncomes)

            const spends = await db.getAllAsync<{ month: string, amount: number }>("SELECT month,amount FROM Spend WHERE  year = ?", [selectedYear])
                .then((spends) => {
                    return spends
                });
            const calculatedSpends = sumAmountsByMonth(spends);

            const merged = mergeAmountsAndSpends(yearIncomes, calculatedSpends)
            setYearAndMonthData(merged)
            const yearData = sumAmountsAndSpendAmounts(merged)
            setYearData(yearData)

        } catch (error) {
            console.log("Error getting year data", error)
        }
    } catch (error) {
        console.log("getYearData error", error)
    }
}
