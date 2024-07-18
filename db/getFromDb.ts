import { SQLiteDatabase } from "expo-sqlite"
import * as SQLite from 'expo-sqlite';

import { Spend } from "@/constants/interfaces";

interface Income {
    brutIncome: number;
    month: string;
}

interface IncomeMonth {
    [key: string]: number;
}

interface GetUser {
    isLogged: boolean;
    db: SQLiteDatabase;
    email: string;
    password: string;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
}

interface GetIdFromSelectedYear {
    selectedYear: number;
    selectedMonth: string;
    setDateId: React.Dispatch<React.SetStateAction<number>>;
}

interface SpendId {
    db: SQLiteDatabase;
    selectedMonth: string;
    yearId: number;
    isLogged: boolean;
    setMonthData: React.Dispatch<React.SetStateAction<{ id: number, brutIncome: number }>>;
}



interface AllIncomes {
    brutIncome: number;
    month: string;
}

//Esta funcion debe recibir el email y el password, 
// buscar el nombre del usuario en la db y devolver el id y el nombre
//(De momento solo devuelve el id para probar)
export async function getUser({ isLogged, db, email, password, setUser }: GetUser) {
    try {
        if (!isLogged) {
            const result = await db.getAllAsync<{ id: number }>('SELECT id FROM User WHERE name = ?', ['Guest User'])
                .then((result) => {
                    return result
                })
            if (result.length !== 0) {

                setUser({ id: result[0].id, name: 'Guest User' })
            } else {
                await db.runAsync('INSERT INTO User (name) VALUES (?)', ['Guest User'])
                const result = await db.getAllAsync<{ id: number }>('SELECT id FROM User WHERE name = ?', ['Guest User'])
                    .then((result) => {
                        return result
                    })
                setUser({ id: result[0].id, name: 'Guest User' })
            }
        }
    }
    catch (error) {
        console.log("getUser error", error)
        console.log(error)
    }
}


export async function getAllYearIncomes(
    yearId: number,
    setAllIncomes: React.Dispatch<React.SetStateAction<IncomeMonth | undefined>>
) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');
    //recibe el id del año seleccionado y el db para setear el
    // state allIncomes con la suma de todos los brutIncomes de los meses del año seleccionado
    try {
        const allIncomes = await db.getAllAsync<Income>('SELECT month,brutIncome FROM Month WHERE yearId = ?', [yearId])
            .then((allIncomes) => {
                const newData = allIncomes.reduce((acc: IncomeMonth, current: Income) => {
                    acc[current.month] = current.brutIncome;
                    return acc;
                }, {});
                setAllIncomes(newData)
                // const sum = newData.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            })

    } catch (error) {
        console.log(error)
    }

}

export async function getSpendIdAndIncome({ db, selectedMonth, yearId, setMonthData, isLogged }: SpendId) {
    try {
        if (!isLogged) {
            const result = await db.getAllAsync<{ id: number, brutIncome: number }>('SELECT id,brutIncome FROM Month WHERE month = ? AND yearId = ?', [selectedMonth, yearId])
                .then((result) => {
                    return result;
                })

            if (result.length === 0) {
                setMonthData({ id: result[0]?.id | 0, brutIncome: result[0]?.brutIncome | 0 })
            } else {
                await db.runAsync('INSERT INTO Month (month, yearId) VALUES (?, ?)', [selectedMonth, yearId])
                const result = await db.getAllAsync<{ id: number, brutIncome: number, yearId: number }>('SELECT id,brutIncome FROM Month WHERE month = ? AND yearId = ?', [selectedMonth, yearId])
                    .then((result) => {
                        return result;
                    })
                console.log(result)
                setMonthData({ id: result[0].id, brutIncome: result[0].brutIncome })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}


// export async function getAllMonthSpends(
//     monthId: number,
//     yearId: number,
//     setSpends: React.Dispatch<React.SetStateAction<Spend[]>>) {

//     const db = await SQLite.openDatabaseAsync('myFinance2.db');

//     try {
//         const result = await db.getAllAsync("SELECT * FROM Spend WHERE monthId = ? AND yearId = ?", [monthId, yearId])
//             .then((result: any[]): Spend[] => {
//                 return result.map(item => ({
//                     id: item.id,
//                     service: item.service,
//                     amount: item.amount,
//                     type: item.type,
//                     description: item.description,
//                     monthId: item.monthId,
//                     yearId: item.yearId,
//                     createdAt: new Date(item.createdAt)
//                 }));
//             });
//         setSpends(result)
//     } catch (error) {
//         console.log(error)
//     }
// }

//Esta funcion debe recibir el año seleccionado y devolver el id del año seleccionado
export async function getIdFromSelectedYear({ selectedYear, setYearId }: { selectedYear: number, setYearId: React.Dispatch<React.SetStateAction<number>> }) {

    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    //para obtener el id del year seleccionado
    try {
        const result = await db.getAllAsync<{ id: number }>('SELECT id FROM Year WHERE year = ?', [selectedYear])
            .then((result) => {
                return result
            });
        if (result.length !== 0) {
            setYearId(result[0].id)
        } else {
            try {
                await db.runAsync('INSERT INTO Year (year) VALUES (?)', [selectedYear])
                const result = await db.getAllAsync<{ id: number }>('SELECT id FROM Year WHERE year = ?', [selectedYear])
                    .then((result) => {
                        setYearId(result[0].id)
                    });
            } catch (error) {
                console.log("Error al insertar el año")
                console.log(error)
            }
        }
    } catch (error) {
        console.log("getIdFromSelectedYear error", error)
        console.log(error)
    }
}

//devuelve el id del mes seleccionado, y si no existe lo crea
export async function getIdFromSelectedMoth({
    selectedMonth,
    setMonthId }: {
        selectedMonth: string,
        setMonthId: React.Dispatch<React.SetStateAction<number>>
    }) {
    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ id: number }>('SELECT id,yearId FROM Month WHERE month = ? ', [selectedMonth])
            .then((result) => {
                return result
            });
        if (result.length !== 0) {
            setMonthId(result[0].id)
        }
        else {
            try {
                await db.runAsync('INSERT INTO Month (month) VALUES (?)', [selectedMonth])
            } catch (error) {
                console.log("Error al insertar el mes")
                console.log(error)
            }
            try {
                await db.getAllAsync<{ id: number }>('SELECT id FROM Month WHERE month = ?', [selectedMonth])
                    .then((result) => {
                        setMonthId(result[0].id)
                    });
            } catch (error) {
                console.log("Error al obtener el id del mes")
                console.log(error)
            }
        }
    } catch (error) {
        console.log("getIdFromSelectedMonth error", error)
        console.log(error)
    }


}


export async function getMonthIncome(
    {
        selectedMonth,
        selectedYear,
        setIncome }: {
            selectedMonth: string,
            selectedYear: number,
            setIncome: React.Dispatch<React.SetStateAction<number>>
        }) {

    const db = await SQLite.openDatabaseAsync('myFinance2.db');

    try {
        const result = await db.getAllAsync<{ amount: number }>('SELECT amount FROM Income WHERE month = ? AND year = ?', [selectedMonth, selectedYear])
            .then((result) => {
                return result
            });
        if (result.length !== 0) {
            setIncome(result[0].amount)
        } else {
            try {
                await db.runAsync('INSERT INTO Income (amount, month, year) VALUES (?, ?, ?)', [0, selectedMonth, selectedYear])
            } catch (error) {
                console.log("Error to insert the month income")
                console.log(error)
            }
        }
    } catch (error) {
        console.log("getMonthIncome error", error)
    }
}


export async function getAllMonthSpends(
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