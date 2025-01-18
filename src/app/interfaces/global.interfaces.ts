export interface Account {
    _id: string;
    oID: number;
    name: string;
    phoneNumber: number;
    CNIC: number;
    address: string;
    accountNumber?: string | null;
    accountBalance?: number;
    createdAt?: Date;
    updatedAt?: Date;
}