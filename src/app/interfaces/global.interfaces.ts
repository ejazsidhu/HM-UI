export interface Account {
    _id: string;
    oID: number;
    name: string;
    phoneNumber: number;
    CNIC: number;
    address: string;
    accountNumber?: string | null;
    accountBalance?: number;
}

export interface Transaction {
    accountId: string;
    oID: number;
    Number: string;
    Date: Date;
    Amount: number;
    Description: string;
}

export interface CreateTransaction {
    accountId: string;
    Number: string;
    Date: Date;
    Amount: number;
    Description: string;
}