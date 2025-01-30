import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-acount-list',
  imports: [RouterLink],
  templateUrl: './acount-list.component.html',
  styleUrl: './acount-list.component.css'
})
export class AcountListComponent {

  private destroy$ = new Subject<void>();
  accounts: any[] = [];

  constructor(private httpService: CommonHttpService,private router:Router) { }

  ngOnInit(): void {
    this.httpService.readAll('accounts?page=1').then((data: any) => {
      console.log(data);
      this.accounts = data.accounts;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  route(id:string){
    this.router.navigate([`/transactions/view/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
