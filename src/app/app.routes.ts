import { Routes } from '@angular/router';
import { TransactionListComponent } from './views/transactions/transaction-list/transaction-list.component';
import { AcountListComponent } from './views/accounts/acount-list/acount-list.component';
import { AddEditTransactionComponent } from './views/transactions/add-edit-transaction/add-edit-transaction.component';
import { TransactionDetailsComponent } from './views/transactions/transaction-details/transaction-details.component';
import { TransactionBaseComponent } from './views/transactions/transaction-base/transaction-base.component';
import { LoginComponent } from './views/login/login.component';
import { NavigationComponent } from './views/partials/navigation/navigation.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: NavigationComponent,
        children:[
            {
                path: 'transactions',
                component: TransactionBaseComponent,
                children: [
                    {
                        path: 'view/:id',
                        component: TransactionListComponent
                    },
                    {
                        path: 'edit/:id',
                        component: AddEditTransactionComponent
                    },
                   
                    {
                        path: 'add',
                        component: AddEditTransactionComponent
                    },
                    {
                        path: '',
                        component: TransactionListComponent
                    },
                   
                    {
                        path: '**',
                        component: TransactionListComponent
                    }
                ]
            },
            {
                path: 'accounts',
                component: AcountListComponent
            },
            {
                path: '**',
                redirectTo: 'transactions'
            }
        ]
    }, 
];
