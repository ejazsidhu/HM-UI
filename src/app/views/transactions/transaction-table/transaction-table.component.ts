import { Component, Input, input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-table',
  imports: [FormsModule, RouterLink],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {

  @Input() transactions: any[] = [];
  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (changes['transactions']) {
      console.log('Transactions input has changed:', changes['transactions'].currentValue);
    }
  }
}
