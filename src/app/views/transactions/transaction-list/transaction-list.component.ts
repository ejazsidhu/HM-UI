import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../partials/navigation/navigation.component';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule, NgbPaginationModule, RouterModule],
  providers: [CommonHttpService],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {


  private destroy$ = new Subject<void>();
  transactions: any[] = [];

  constructor(private httpService: CommonHttpService,private acRoute:ActivatedRoute) {
    this.acRoute.params.subscribe(params => {
      if(params['id']){
        this.getTRansactionsById(params['id']);
      }else{
        this.getallTRansactions();
      }
    });
   }

  ngOnInit(): void {
  
  }

  getallTRansactions():void{
    this.httpService.readAll('transactions?page=1').then((data: any) => {
      console.log(data);
      this.transactions = data.transactions;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  getTRansactionsById(id:number):void{
    const url = 'transactions/account/'+id;
    this.httpService.readAll(url).then((data: any) => {
      console.log(data);
      this.transactions = data.transactions;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
