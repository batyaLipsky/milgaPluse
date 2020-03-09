import { Component, OnInit, ViewEncapsulation,  ChangeDetectorRef } from '@angular/core';
import { scholarship } from 'src/app/models/scholarship';
import { user } from 'src/app/models/user';
import { MatSnackBar, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ScholarshipService } from 'src/app/services/scholarship/scholarship.service';
import { SummaryLoanComponent } from '../summary-loan/summary-loan.component';

export class SnackBarOverviewExample {
  public constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

@Component({
  selector: 'app-scholarship-data',
  templateUrl: './scholarship-data.component.html',
  styleUrls: ['./scholarship-data.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ScholarshipDataComponent implements OnInit {
  lastScholarshipForAllUsers: [][]=[];
  editScholarship: scholarship = new scholarship();
  errSearchResultInSmallScreen: string = '';
  currentUserIsManager: boolean;
  alredyApply: boolean = false;
  currentUser: user;
  previousMilga: scholarship[] = [];
  tableMonthAndYearOpen: boolean = false;
  oldMilgaYear: string;
  oldMilgaMonth: string;
  searchOldMilgaByUserId: string;
  idForSearch: string;
  showAsNewMilga: boolean = false;
  currentMonthAndYear: string[];
  routerParam_ifLoadToConfirm: boolean;
  allowSaveonlyAfterCalculate: boolean = false;
  step;
  toConfirm: any;
  openReturnLoan: boolean;
  filtersLoaded: Promise<boolean>;
  openReturnDebt:boolean=false;
  public constructor(private dialog: MatDialog, private scholarshipService: ScholarshipService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.toConfirm = JSON.parse(this.route.snapshot.paramMap.get('confirm'));
    if (this.toConfirm != this.routerParam_ifLoadToConfirm) {
      this.routerParam_ifLoadToConfirm = this.toConfirm;
      console.log("on confirm: "+this.routerParam_ifLoadToConfirm)
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.IsManager) {
      this.currentUserIsManager = true;
      if (this.toConfirm == null) {
        document.getElementsByTagName("li")[2].classList.remove("clicked")
        document.getElementsByTagName("li")[3].classList.add("clicked");
      }

    } else {
      document.getElementsByTagName("li")[1].classList.remove("clicked")
      document.getElementsByTagName("li")[2].classList.add("clicked");

    }
    if (this.routerParam_ifLoadToConfirm) {
      this.scholarshipForConfirm();
      return;
    }
    this.signTheLastScholarship();
    this.alreadyapplyNewMilga();

  }

  alreadyapplyNewMilga() {
    this.scholarshipService.findIfApplyNewScholarship(this.currentUser.Identity).subscribe((result: []) => {
      if (result.length > 0 && result.length < 2) {
        this.alredyApply = true;
      }
      else {
        this.alredyApply = false;
        this.currentMonthAndYear = result;
      }
    },
      err => console.log("err" + err));
  }

  openMilgaAccordingParams(kindOfMilga: string) {
    if (kindOfMilga == "new") {
      this.openReturnDebt=false;
      var customObj = new scholarship();
      customObj.HebrewMonth = this.currentMonthAndYear[0];
      customObj.HebrewYear = this.currentMonthAndYear[1];
      this.previousMilga = [];
      this.previousMilga.push(customObj);
      this.changeClasses(0);
      this.showAsNewMilga = true;
      this.step = 0;
    } else
      if (kindOfMilga == "old") {
        this.openReturnDebt=true;
        this.showAsNewMilga = false;
        this.previousMilga = [];
        this.changeClasses(1);
      }

  }

  newMilgaDetailes(numOfMilga: number) {
    this.previousMilga[numOfMilga].Identity = this.currentUser.Identity;
    this.scholarshipService.newScholarshipDetailes(this.previousMilga[numOfMilga]).subscribe(result => {
      alert(result)

      this.alreadyapplyNewMilga();
    },
      err => console.log(err));
  }
  corectYearString: string;
  findOldMilga() {
    this.step = null;
    this.corectYearString = "";
    if (this.oldMilgaYear) {
      var begin = this.oldMilgaYear.substring(0, this.oldMilgaYear.length - 1);
      var end = this.oldMilgaYear.substring(this.oldMilgaYear.length - 1);
      this.corectYearString = begin.concat("\"", end);
    }
    if (this.currentUser.IsManager)
      if (this.searchOldMilgaByUserId)
        this.idForSearch = this.searchOldMilgaByUserId;
      else
        this.idForSearch = "";
    else
      this.idForSearch = this.currentUser.Identity;
    if (!this.oldMilgaMonth && !this.corectYearString)
      this.scholarshipService.getAllScholarshipAccordingId(this.idForSearch).subscribe((sclrship: []) => {
        this.previousMilga = sclrship;
        this.chackIfReturnMilgaFromDB();
        this.signTheLastScholarship();
      });
    else {
      this.scholarshipService.getScholarshipAccordingIdMonthYear(this.idForSearch, this.corectYearString, this.oldMilgaMonth).subscribe((sclrship: []) => {
        this.previousMilga = sclrship;
        this.chackIfReturnMilgaFromDB();
        this.signTheLastScholarship();
      });
    }

  }

  chackIfReturnMilgaFromDB() {
    if (this.previousMilga.length == 0) {
      if (window.innerWidth > 767) {
        if (this.oldMilgaMonth && this.corectYearString != "\"" && this.corectYearString)
          this.openSnackBar("לא נמצאה מלגה בחודש " + this.oldMilgaMonth + ", " + this.corectYearString, "");
        else
          if (this.oldMilgaMonth)
            this.openSnackBar("לא נמצאה מלגה בחודשי " + this.oldMilgaMonth, "");
          else
            this.openSnackBar("לא נמצאה מלגה ב" + this.corectYearString, "");
      }
      else
        if (this.oldMilgaMonth && this.corectYearString != "\"" && this.corectYearString)
          this.errSearchResultInSmallScreen = "לא נמצאה מלגה בחודש " + this.oldMilgaMonth + ", " + this.corectYearString, "";
        else
          if (this.oldMilgaMonth)
            this.errSearchResultInSmallScreen = "לא נמצאה מלגה בחודשי " + this.oldMilgaMonth, "";
          else
            this.errSearchResultInSmallScreen = "לא נמצאה מלגה ב" + this.corectYearString, "";

    }
    else if (this.currentUser.IsManager) {
      this.getUsersNamesAccordingId();
      if (this.idForSearch == "" && !this.oldMilgaMonth && (this.corectYearString == "\"" || !this.corectYearString) && (window.innerWidth > 767))
        this.openSnackBar("נערך חיפוש עבור כל המלגות.", "");

    }
  }
  signTheLastScholarship() {
    this.scholarshipService.getTheLastScholarshipForAllUser().subscribe((res: [][]) => {
      this.lastScholarshipForAllUsers = res;
      console.log("lastScholarshipForAllUsers"+res)
    }, err => console.log(err))
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right'
    });

  }
  approveMilgaDetailes(numOfMilga: number) {
    this.scholarshipService.calculateScholarship(this.previousMilga[numOfMilga]).subscribe((result: scholarship) => {
      this.previousMilga[numOfMilga] = result;

    },
      err => console.log(err));
  }
  usersIdentities: string[] = [];
  identitiasAndNames: string[][];
  scholarshipForConfirm() {
    this.scholarshipService.getScholarshipForConfirm().subscribe((sclrship: scholarship[]) => {
      if (sclrship.length > 0) {
        this.previousMilga = sclrship;
        localStorage.setItem("previousMilga", JSON.stringify(this.previousMilga));
        this.getUsersNamesAccordingId();
      }
    });
  }

  getUsersNamesAccordingId() {
    this.usersIdentities = [...new Set(this.previousMilga.map(x => x.Identity))];
    this.scholarshipService.getNamesOfUsersOfScholarshipForConfirm(this.usersIdentities).subscribe((names: [][]) => {
      this.identitiasAndNames = names;
    }, err => {
      console.log(err);
    });
  }
  saveConfirmMilga(numOfMilga: number) {
    this.scholarshipService.saveConfirmScholarship(this.previousMilga[numOfMilga]).subscribe(result => {
      alert(result);
      if (!result.toString().includes("שגיאה")) {
        this.previousMilga.splice(numOfMilga, 1);
      }
    }, err => {
      alert(err);
    })
    this.previousMilga[0].Identity
  }

  changeClasses(numOfItemClicked: number) {
    let tabElements = document.getElementsByClassName("scholarshipButton");

    if (numOfItemClicked == 1) {
      if (tabElements.length > 1)
        tabElements[0].classList.remove("buttonClickedScholarship");
      else {
        tabElements[0].classList.add("buttonClickedScholarship");
        return;
      }
    } else
      tabElements[1].classList.remove("buttonClickedScholarship");

    tabElements[numOfItemClicked].classList.add("buttonClickedScholarship");
  }

  summaryLoanDialogRef: MatDialogRef<SummaryLoanComponent>;

  openAddSummaryLoanDialog(numOfMilga) {
    localStorage.setItem("currentUserScholarship", JSON.stringify(this.previousMilga[numOfMilga]));
    if (this.routerParam_ifLoadToConfirm||(this.lastScholarshipForAllUsers&&this.lastScholarshipForAllUsers[this.previousMilga[numOfMilga].Identity].Date == this.previousMilga[numOfMilga].Date))
      this.openReturnLoan = true;
    else
      this.openReturnLoan = false;
    this.previousMilga[numOfMilga].Identity = this.currentUser.Identity;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      scholarship: this.previousMilga[numOfMilga],
      openReturnLoan: this.openReturnLoan
    };
    dialogConfig.position = {
      top: '25%',
      left: '25%'
    };
    dialogConfig.width = '50%';
    dialogConfig.height = '100%';
    let dialogRef = this.dialog.open(SummaryLoanComponent, dialogConfig);
    this.previousMilga[numOfMilga] = JSON.parse(localStorage.getItem("currentUserScholarship"));
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      localStorage.removeItem("currentUserScholarship");
    }, err => { console.log(err); alert(err) });
  }
}