import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../partials/navigation/navigation.component';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule, NgbPaginationModule, RouterModule, TransactionTableComponent],
  providers: [CommonHttpService],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {


  private destroy$ = new Subject<void>();
  transactions: any[] = [];
  incomeTransactions: any[] = [];
  expenseTransactions: any[] = [];

  constructor(private httpService: CommonHttpService, private acRoute: ActivatedRoute) {
    this.acRoute.params.subscribe(params => {
      const date = new Date();
      if (params['id']) {
        this.getTransactionsById(params['id']);
      } else {
        this.getallTRansactions();
      }
    });
  }

  ngOnInit(): void {

  }

  categorizeTransactions(): void {
    this.incomeTransactions = this.transactions.filter(transaction => transaction.Amount >= 0);
    this.expenseTransactions = this.transactions.filter(transaction => transaction.Amount < 0);
    console.log(this.incomeTransactions,this.expenseTransactions);
  }

 async getallTRansactions(): Promise<void> {
    const url = 'transactions';
    this.httpService.readAll(url).then((data: any) => {
      console.log(data);
      this.transactions = data.transactions;
      this.categorizeTransactions();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }



  getTransactionsById(id: number): void {
    const url = 'transactions/account/' + id;
    this.httpService.readAll(url).then((data: any) => {
      console.log(data);
      this.transactions = data.transactions;
      this.categorizeTransactions();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
