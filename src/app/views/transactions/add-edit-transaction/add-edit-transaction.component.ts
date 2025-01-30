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
      date: new Date(transaction.date),
      description: transaction.description,
      accountId: transaction.accountId
    });
  }
  accounts: any;

  ngOnInit(): void {
    this.getAllaCounts();
    this.acRouter.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id =params['id']
      if (id) {
        const url = `transactions/${id}`;
        this.httpService.readAll(url).then((transaction: any) => {
          this.patchFormValues(transaction);
        }).catch((error: HttpErrorResponse) => {
          console.error(error);
        });
      }
    });
  }

  async getAllaCounts() {
    this.accounts = await this.httpService.readAll('accounts?no_limit=true');
    console.log(this.accounts);
  }

  onSubmit(): void {
  console.log(this.transactionForm.value);
  }
  onCancel(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
