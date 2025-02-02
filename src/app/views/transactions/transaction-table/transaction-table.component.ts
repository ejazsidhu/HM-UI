import { Component, Input, input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonHttpService } from '../../../services/common-http.service';

@Component({
  selector: 'app-transaction-table',
  imports: [FormsModule, RouterLink],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {

  @Input() transactions: any[] = [];

  constructor(private http: CommonHttpService, private router: Router) { }

  deleteTransaction(transactionId: string): void {
    this.http.delete(`/api/transactions/${transactionId}`).then(() => {
      this.router.navigate(['/transactions']);  });
  }

}
