import { YearDataResult } from "@/db/dbTools";


export function sumAmountsByMonth(arr: { amount: number, month: string }[]) {
    const monthSums = {} as { [key: string]: number };
    // Sumar los amounts por cada mes
    arr.forEach(({ amount, month }: { amount: number, month: string }) => {
        if (!monthSums[month]) {
            monthSums[month] = 0;
        }
        monthSums[month] += amount;
    });

    // Convertir el objeto resultante en un array de objetos
    const result = Object.keys(monthSums).map(month => ({
        month,
        spendAmount: monthSums[month]
    }));

    return result;


}


//sumar todos los amounts y spendAmounts del año
export interface YearAndMonthData {
    month: string;
    amount: number;
    spendAmount: number;
}

export function sumAmountsAndSpendAmounts(data: YearAndMonthData[]): YearDataResult {
    return data.reduce(
        (acc, entry) => {
            acc.amounts += entry.amount;
            acc.spendAmounts += entry.spendAmount;
            return acc;
        },
        { amounts: 0, spendAmounts: 0 }
    );
}