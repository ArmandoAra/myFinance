// import { getAllIncomes } from "@/actions/income-actions";
// import { getAllSpends } from "@/actions/spend-actions";

//Hacer funciones que obtengan todos los ingresos y gastos de un año


export function sum(num1: number, num2: number): number {
    let total = num1 + num2;
    return parseFloat(total.toFixed(2));
}

export function rest(num1: number, num2: number): number {
    let total = num1 - num2;
    return parseFloat(total.toFixed(2));
}

export function multiply(num1: number, num2: number): number {
    let total = num1 * num2;
    return parseFloat(total.toFixed(2));
}

export function divide(num1: number, num2: number): number {
    let total = num1 / num2;
    return parseFloat(total.toFixed(2));
}

export async function calcTotalYear(year: number) {
    var total = 0;
    var totalNetIncome = 0;
    var totalUmst = 0;


    //obtener los datos del año seleccionado
    const incomeYear = await getAllIncomes(year.toString());

    //todos los meses del año 
    const months = incomeYear?.map((month) => month.month);

    if (!months) {
        return null;
    }
    const totalSpend = await getAllSpends({ year: year.toString(), months });

    const totalBruIncome = incomeYear?.reduce((acc, month) => acc + month.brutIncome, 0);

    if (!totalBruIncome) {
        return null;
    }

    //Obtener todos los gastos del año seleccionado
    totalNetIncome = totalBruIncome * 0.81;   //total de ingresos netos

    if (!totalSpend) {
        return null;
    }

    total = totalNetIncome - Number(totalSpend);
    total.toFixed(2);


    if (!totalBruIncome) {
        return null;
    }

    totalUmst = totalBruIncome * 0.19;   //total de ingresos netos

    return {
        total,
        totalBruIncome,
        totalNetIncome,
        totalUmst,
        totalSpend
    }

}