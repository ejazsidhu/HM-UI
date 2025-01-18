import { Routes } from '@angular/router';
import { TransactionListComponent } from './views/transactions/transaction-list/transaction-list.component';
import { AcountListComponent } from './views/accounts/acount-list/acount-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full'
    },
   
    {
        path: 'transactions',
        component: TransactionListComponent
    },
    {
        path: 'accounts',
        component: AcountListComponent
    },
    {
        path: '**',
        redirectTo: 'transactions'
    }
];
