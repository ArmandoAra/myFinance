




//Funcion para convertir los numeros de los meses en su nombre empezando por 0 al 11
export function getMonthByNumber(actualNumberMonth: number): string {
    let actualMonth: string;
    switch (actualNumberMonth) {
        case 0:
            actualMonth = "January"
            break
        case 1:
            actualMonth = "February"
            break
        case 2:
            actualMonth = "March"
            break
        case 3:
            actualMonth = "April"
            break
        case 4:
            actualMonth = "May"
            break
        case 5:
            actualMonth = "June"
            break
        case 6:
            actualMonth = "July"
            break
        case 7:
            actualMonth = "August"
            break
        case 8:
            actualMonth = "September"
            break
        case 9:
            actualMonth = "October"
            break
        case 10:
            actualMonth = "November"
            break
        case 11:
            actualMonth = "December"
            break;
        default:
            throw new Error("Invalid month number");
    }

    return actualMonth;
}
