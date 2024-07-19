

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Income {
    brutIncome: number;
    month: string;
    year: number;
}

export interface Spend {
    id: number;
    month: string;
    year: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}
