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
            setUser({ id: result[0].id, name: 'Guest User' })
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function getIdFromSelectedYear({ selectedYear, db, setYearId }: GetIdFromSelectedYear) {
    //para obtener el id del year seleccionado
    try {
        const result = await db.getAllAsync<{ id: number }>('SELECT id FROM Year WHERE year = ?', [selectedYear])
            .then((result) => {
                return result
            });
        setYearId(result[0].id)
    } catch (error) {
        console.log(error)
    }
}

export async function getAllYearIncomes(
    yearId: number,
    db: SQLiteDatabase,
    setAllIncomes: React.Dispatch<React.SetStateAction<IncomeMonth | undefined>>
) {
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
            setMonthData({ id: result[0]?.id | 0, brutIncome: result[0]?.brutIncome | 0 })
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function getAllSpendsByMonthId(id: number, db: SQLiteDatabase, setSpends: React.Dispatch<React.SetStateAction<Spends[]>>) {

    try {
        const result = await db.getAllAsync("SELECT * FROM Spend WHERE monthId = ?", [id])
            .then((result: any[]): Spends[] => {
                return result.map(item => ({
                    id: item.id,
                    monthId: item.monthId,
                    service: item.service,
                    amount: item.amount,
                    type: item.type,
                    description: item.description,
                    createdAt: new Date(item.createdAt)
                }));
            });
        setSpends(result)
    } catch (error) {
        console.log(error)
    }
}