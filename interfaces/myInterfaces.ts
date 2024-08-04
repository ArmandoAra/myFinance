interface Target {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    identifier: string;
    name: string;
    providerId: string | null;
    providerType: string;
    userId: string;
}
//Type ResUser can be null
export interface ResUser {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: string[];
    mfa: boolean;
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: Record<string, unknown>;
    registration: string;
    status: boolean;
    targets: Target[];
};

export interface YearAndMonthData {
    month: string;
    amount: number;
    spendAmount: number;
}
