
import { SQLiteDatabase } from "expo-sqlite"

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

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
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



// async function deleteTransaction(id: number) {
//     db.withTransactionAsync(async () => {
//       await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
//       await getData();
//     });
//   }
