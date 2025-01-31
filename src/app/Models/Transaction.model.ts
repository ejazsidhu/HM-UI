import { AccountModel } from './account.model';
export class TransactionModel{
   
    constructor(
        public id:number,
        public oID:string,
        public number:string,
        public amount:number,
        public accountId:number,
        public account:AccountModel,
        public date:Date

    ) {
        
        
    }
}