import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonHttpService } from '../../../services/common-http.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-transaction.component.html',
  styleUrl: './add-edit-transaction.component.css'
})
export class AddEditTransactionComponent {

  fb = inject(FormBuilder);
  httpService = inject(CommonHttpService);
  acRouter = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  transactionForm: FormGroup = this.fb.group({
    amount: [0, [Validators.required,]],
    date: [new Date(), Validators.required],
    description: [''],
    accountId: [0, Validators.required]
  });

  patchFormValues(transaction: any): void {
    this.transactionForm.patchValue({
      amount: transaction.amount,
      date: this.formatDate(new Date(transaction.Date)),
      description: transaction.description,
      accountId: transaction.accountId._id
    });
  }
  accounts: any;
  isEditMode = false;
  editUrl = 'transactions';

  ngOnInit(): void {
    this.getAllaCounts();
    this.acRouter.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params['id']
      if (id) {
        this.editUrl = `transactions/${id}`;
        this.isEditMode=true;
        this.httpService.readAll(this.editUrl).then((transaction: any) => {
          this.patchFormValues(transaction);
        }).catch((error: HttpErrorResponse) => {
          console.error(error);
        });
      }
    });
  }

  async getAllaCounts() {
    this.accounts = await this.httpService.readAll('accounts?no_limit=true');
    // console.log(this.accounts);
  }

  onSubmit(): void {
    console.log(this.transactionForm.value);
    const oId = this.accounts.find((account: any) => account._id === this.transactionForm.value.accountId).oID
    const number = this.accounts.find((account: any) => account._id === this.transactionForm.value.accountId).number
    const transaction = {
      amount: this.transactionForm.value.amount,
      date: this.formatDate(this.transactionForm.value.date),    
      description: this.transactionForm.value.description,
      accountId: this.transactionForm.value.accountId,
      oID: oId,
      number: number
    };

    console.log(transaction);

    if (!this.isEditMode) {
      this.httpService.create(this.editUrl, transaction).then((response: any) => {
        console.log(response);
      }).catch((error: HttpErrorResponse) => {
        console.error(error);
      });
    } else {
      this.httpService.update(this.editUrl, transaction).then((response: any) => {
        console.log(response);
      }).catch((error: HttpErrorResponse) => {
        console.error(error);
      });
    }
  }

  formatDate(date: Date): string {
    const validDate = new Date(date);
    const day = String(validDate.getDate()).padStart(2, '0');
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const year = validDate.getFullYear();
    return `${month}-${day}-${year}`;
  }

  onCancel(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
