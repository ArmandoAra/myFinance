interface YearData {
    amount: number;
    month: string;
}

interface MonthData {
    spendAmount: number;
    month: string;
}

export interface YearAndMonthData {
    month: string;
    amount: number;
    spendAmount: number;
}

export function mergeAmountsAndSpends(
    amounts: YearData[],
    spends: MonthData[]
): YearAndMonthData[] {
    const spendMap: { [key: string]: number } = spends.reduce((map, obj) => {
        map[obj.month] = obj.spendAmount;
        return map;
    }, {} as { [key: string]: number });

    return amounts.map(amountObj => ({
        month: amountObj.month,
        amount: amountObj.amount,
        spendAmount: spendMap[amountObj.month] || 0
    }));
}


export function sortByMonth(arr: { amount: number, month: string }[]) {
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return arr.sort((a, b) => {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
}

