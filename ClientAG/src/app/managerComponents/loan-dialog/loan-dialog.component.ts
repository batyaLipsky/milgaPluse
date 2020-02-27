import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loan } from 'src/app/models/loan';
import { LoansService } from 'src/app/services/loans/loans.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { bankAccount } from 'src/app/models/bankAccount';
import { getMatAutocompleteMissingPanelError } from '@angular/material';

@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.scss']
})
export class LoanDialogComponent implements OnInit {
  bankAccountDetailes: bankAccount = new bankAccount();
  name: string;
  waysOfPay: string[] = ["מזומן", "העברה"];
  returnSum: number;
  returnLoan: loan = new loan();
  allDetailsForBankAccount: boolean = true;
  alloweSave: boolean = false;
  public constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<LoanDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private loanService: LoansService) {
    this.name = data.name;
    this.returnLoan.BorrowerIdentity = data.id;
    this.returnLoan.DebtBalance = data.sum;
  }
  ngOnInit() {
    this.returnLoan.WayOfPay = this.waysOfPay[0];
  }
  allowedSave(val) {
    this.alloweSave = true;
  }
  checkIfExistBankAccount() {
    if (this.bankAccountDetailes.AccountNumber && this.bankAccountDetailes.BranchNumber) {
      this.loanService.checkIfExistBankAccount(this.bankAccountDetailes).subscribe((result: string) => {
        this.allDetailsForBankAccount = JSON.parse(result);

      })
    }
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    if (!this.allDetailsForBankAccount)
      this.bankAccountDetailes.Identity = this.returnLoan.BorrowerIdentity;
    this.loanService.saveBankAccount(this.bankAccountDetailes).subscribe(x => {
      // console.log(x);
    });
    if (this.returnLoan.LoanSum > this.returnLoan.DebtBalance) {
      alert("הסכום שברצונך להחזיר גבוה מסכום ההלוואה.");
      return;
    }
    this.returnLoan.DebtBalance -= this.returnLoan.LoanSum;
    this.loanService.saveReturnloan(this.returnLoan).subscribe(result => {
      // console.log(result)
    }, err => console.log(err))
    this.dialogRef.close();
  }
}