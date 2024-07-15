
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { SQLiteBindValue, SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import db from 'oui-data';


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
    db: SQLiteDatabase;
    setYearId: React.Dispatch<React.SetStateAction<number>>;
}

interface SpendId {
    db: SQLiteDatabase;
    selectedMonth: string;
    yearId: number;
    isLogged: boolean;
    setMonthData: React.Dispatch<React.SetStateAction<{ id: number, brutIncome: number }>>;
}

interface Spend {
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string | null;
    createdAt: Date;
}

interface AllIncomes {
    brutIncome: number;
    month: string;
}



export async function updateMonthIncome(
    db: SQLiteDatabase,
    monthId: number,
    incomeAmount: number
) {
    try {
        await db.runAsync('UPDATE Month SET brutIncome = ? WHERE id = ?', [incomeAmount, monthId])
    } catch (error) {
        console.log(error)
    }

}

export async function insertNewSpend({ data, db }: {
    data: Spend;
    db: SQLiteDatabase;
}) {
    const { monthId, service, amount, type, description, createdAt } = data;
    const dateToInsert = createdAt.toISOString().split('T')[0];
    console.log(data)
    try {
        db.runAsync('INSERT INTO Spend ( service, amount, type, description, createdAt, monthId) VALUES (?, ?, ?, ?, ?, ?)', [service, amount, type, description, dateToInsert, monthId])
    } catch (error) {
        console.log(error)

    }
}



export async function deleteSpend(id: number, db: SQLiteDatabase) {
    try {
        // await db.runAsync(`DELETE FROM Spend WHERE id = ?;`, [id]);
        await db.runAsync('DELETE FROM Spend WHERE id = $value', { $value: id })

    } catch (error) {
        console.log(error)
    }
}
