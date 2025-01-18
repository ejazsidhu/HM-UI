import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-acount-list',
  imports: [],
  templateUrl: './acount-list.component.html',
  styleUrl: './acount-list.component.css'
})
export class AcountListComponent {

  private destroy$ = new Subject<void>();
  accounts: any[] = [];

  constructor(private httpService: CommonHttpService) { }

  ngOnInit(): void {
    this.httpService.readAll('accounts?page=1').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data);
      this.accounts = data.accounts;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
  addTransaction(): void {

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
