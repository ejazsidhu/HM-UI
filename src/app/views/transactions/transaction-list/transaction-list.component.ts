import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../partials/navigation/navigation.component';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule, NgbPaginationModule],
  providers: [CommonHttpService],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {


  private destroy$ = new Subject<void>();
  transactions: any[] = [];

  constructor(private httpService:CommonHttpService) { }

  ngOnInit(): void {
    this.httpService.readAll('transactions?page=1').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.transactions = data.transactions;
  },(error:HttpErrorResponse)=>{
    console.log(error);
  });
}
addTransaction():void{

}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
