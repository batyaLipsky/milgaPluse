import { Component, OnInit, ViewEncapsulation, Inject, EventEmitter } from '@angular/core';
import { loanTitle, loan } from 'src/app/models/loan';
import { LoansService } from 'src/app/services/loans/loans.service';
import { ScholarshipService } from 'src/app/services/scholarship/scholarship.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';
import { user } from 'src/app/models/user';
import { currentId } from 'async_hooks';
import { scholarship } from 'src/app/models/scholarship';

@Component({
  selector: 'app-summary-loan',
  templateUrl: './summary-loan.component.html',
  styleUrls: ['./summary-loan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryLoanComponent implements OnInit {
  i = 9;
  sum: number = 0;
  //
  scholarship: scholarship;
  sumOfLoan: any[] = [];
  loans: loan[];
  borrowersIdentities: string[] = [];
  borrowersNames: string[][];
  thisUser: user;
  isOpenDialog: boolean = true;
  errMessage: string = '';
  sumOfRemainderDebt: number;
  openReturnLoan: boolean;
  public constructor(private loansService: LoansService, private scholarshipService: ScholarshipService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private dialogRef: MatDialogRef<LoanDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    if (data.openReturnLoan)
      this.openReturnLoan = data.openReturnLoan;
    if (data.scholarship)
      this.scholarship = data.scholarship;
    if (!this.scholarship.RemainderDebt)
      this.scholarship.RemainderDebt = 0;
  }

  ngOnInit() {
    if (this.scholarship == undefined) {
      debugger;
      this.loansService.getAllLoans().subscribe((result: loan[]) => {
        if (result.length > 0) {
          this.loans = result;

          this.getUsersNamesAccordingId();
          this.calculateLoans();
        }
        else {
          this.isOpenDialog = false;
          this.errMessage = "לא נימצאו הלוואות";
        }
      }, err => console.log(err));
    }
    else {
      this.loansService.getLoansById(this.scholarship.Identity, this.scholarship.Date).subscribe((result: loan[]) => {
        if (result.length > 0) {

          this.loans = result;
          this.getUsersNamesAccordingId();
          this.calculateLoans();
          this.sumOfRemainderDebt = this.loans[this.loans.length - 1].DebtBalance;

        }
        else
          this.loansService.getPrevScholarshipByIdForCalculateRemaindDebt(this.scholarship.Identity, this.scholarship.Date).subscribe((result: number) => {//subscribe((result: scholarship[]) => {
            this.sumOfRemainderDebt = result;
            if (result == 0 && !this.scholarship.RemainderDebt) {
              this.isOpenDialog = false;
              this.errMessage = "לא נימצאו הלוואות";

            }

          })

      }, err => {
        this.isOpenDialog = false;
        this.errMessage = err
      });
    }


  }
  getUsersNamesAccordingId() {
    this.borrowersIdentities = [...new Set(this.loans.map(x => x.BorrowerIdentity))];
    this.scholarshipService.getNamesOfUsersOfScholarshipForConfirm(this.borrowersIdentities).subscribe((names: [][]) => {
      this.borrowersNames = names;
      if (!(names)) {
        this.isOpenDialog = false;
        this.errMessage = "שגיאה! לא חזר שמות אברכים מה server";
      }
      else
        localStorage.setItem("borrowersNames", JSON.stringify(this.borrowersNames));

    }, err => {
      this.isOpenDialog = false;
      this.errMessage = err;
    });
  }
  openDialog(userIndex: number) {
    const dialogConfig = new MatDialogConfig();
    var id = this.loans[userIndex].BorrowerIdentity;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      name: this.borrowersNames[id],
      id: this.loans[userIndex].BorrowerIdentity,
      sum: this.sumOfLoan[this.sumOfLoan.indexOf(id) + 1],
      NoteOfGetLoan: null
    };
    this.dialog.open(LoanDialogComponent, dialogConfig);
  }
  // sumOfLoansPerUser: [string][number];
  calculateLoans() {
    debugger;
    let identity = this.loans[0].BorrowerIdentity;
    this.sum = 0;
    this.loans.forEach(x => {
      if (x.BorrowerIdentity == identity)
        this.sum += x.LoanSum;
      else {
        this.sumOfLoan.push(identity, this.sum);
        identity = x.BorrowerIdentity;
        this.sum = x.LoanSum;
      }
      if (this.loans.indexOf(x) == this.loans.length - 1)
        this.sumOfLoan.push(identity, this.sum);
    });
  }
  newReturnLoad() {
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    if (this.borrowersNames == undefined)
      this.borrowersNames = JSON.parse(localStorage.getItem("borrowersNames"));
    dialogConfig.data = {
      name: this.borrowersNames[this.scholarship.Identity],//this.borrowersNames[id],
      id:this.scholarship.Identity,// this.borrowersIdentities[0],//this.loans[userIndex].BorrowerIdentity,
      sum: this.scholarship.RemainderDebt,// this.sumOfLoan[this.sumOfLoan.indexOf(id)+1],
      NoteOfGetLoan: null
    };
    this.dialog.open(LoanDialogComponent, dialogConfig);

  }


  closeDialog = new EventEmitter();

  close() {
    this.closeDialog.emit(true);
    this.dialog.closeAll();
  }


}





