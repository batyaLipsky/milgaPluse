import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { user, userDataEnum } from 'src/app/models/user';
import { scholarship } from 'src/app/models/scholarship';
import { loan } from 'src/app/models/loan';
// import { ManagerService } from 'src/app/services/manager/manager.service';
import { City } from 'src/app/models/managerEnums';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-select-spesific-users',
  templateUrl: './select-spesific-users.component.html',
  styleUrls: ['./select-spesific-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectSpesificUsersComponent implements OnInit {
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;

  foundUsers: user[];
  foundScholarships: scholarship[];
  foundLoans: scholarship[];

  displayedColumnsUser: string[] = [userDataEnum.lastName, userDataEnum.firstName, userDataEnum.identity, userDataEnum.birthDate, userDataEnum.children, userDataEnum.city, userDataEnum.fullDay, userDataEnum.isManager];
  displayedColumnsScholarship: string[] = ["סכום מלגה", "התמדה", "חיסורים"]
  displayedColumnsLoan: string[] = ["תאריך הלוואה", "סכום הלוואה"]
  dataSourceUser: user[];
  dataSourceScholarship: scholarship[];
  dataSourceLoan: scholarship[];

  showUsersTable: boolean = false;
  showScholarshipsTable: boolean = false;
  showLoansTable: boolean = false;
  hasPropertyForm1: boolean = false;
  hasPropertyForm2: boolean = false;
  hasPropertyForm3: boolean = false;
  allCitiesOfUsers: City[] = [];
  form: FormGroup;
  searchData: [][];
  public constructor(private userService: UserService, private chartService: ChartsService) { }

  ngOnInit() {
    this.form1 = new FormGroup({
      minimumAge: new FormControl([null, Validators.min(1), Validators.max(120)]),//(1,120,"גיל חייב להיות בין 1-120")],
      maximumAge: new FormControl([null, Validators.min(1), Validators.max(120)]),
      maximumChildren: new FormControl([null, Validators.min(0), Validators.max(25)]),
      minimumChildren: new FormControl([null, Validators.min(0), Validators.max(25)]),
      userCity: new FormControl(['']),
      noLearnMusar: new FormControl([false]),
      learnMusar: new FormControl([false]),
      learnFullDay: new FormControl([false]),
      learnHalfDay: new FormControl([false]),
      isManager: new FormControl([false])
    });
    this.form2 = new FormGroup({
      minimumMilga: new FormControl([null, Validators.min(0)]),
      maximumMilga: new FormControl([null, Validators.min(0)]),
      maximumAbsance: new FormControl([null, Validators.min(0), Validators.max(5)]),
      minimumAbsance: new FormControl([null, Validators.min(0), Validators.max(5)]),
      maximumAtmada: new FormControl([null, Validators.min(0), Validators.max(5)]),
      minimumAtmada: new FormControl([null, Validators.min(0), Validators.max(5)]),
    });
    this.form3 = new FormGroup({
      lastDateLoan: new FormControl([Date]),
      firstDateLoan: new FormControl([Date]),
      minSumLoan: new FormControl([null, Validators.min(0)]),
      maxSumLoan: new FormControl([null, Validators.min(0)]),

    })
    this.userService.fetchAllCitiesOfUsers().subscribe((city: []) => {
     
      this.allCitiesOfUsers = city;
    //  console.log("return cities: " + city);
    });
  }


  searchForCard_1(searchNumber: number) {
    this.showUsersTable = false;
    this.showLoansTable = false;
    this.showScholarshipsTable = false;
    let changedProperties = [];
   
    Object.keys(this.form1.controls).forEach((name) => {
      let currentControl = this.form1.controls[name];
      if (currentControl.dirty) {
        if (currentControl.value as boolean && currentControl.value == true
          || currentControl.value as string && currentControl.value != "")
          changedProperties.push([name, currentControl.value]);
      }
    });
    if (changedProperties.length > 0)
      this.hasPropertyForm1 = true;
    this.chartService.searchForSpesificUesrs_1(changedProperties).subscribe((result: user[]) => {
      this.foundUsers = result;
      if (result != null && result.length > 0 && searchNumber == 1) {
        
        this.showUsersTable = true;
        this.dataSourceUser = this.foundUsers;
      }
      if (result != undefined && searchNumber == 4) {
        if (this.form2.dirty) {
          this.searchForCard_2(4);
         
        }
        else
          if (this.form3.dirty)
            this.searchForCard_3(4);
          else
            this.mergeData();
      }
     
    }, err => {
      console.log(err);
    })

  }
  searchForCard_2(searchNumber: number) {
    this.showUsersTable = false;
    this.showLoansTable = false;
    this.showScholarshipsTable = false;
    let changedProperties = [];
   
    Object.keys(this.form2.controls).forEach((name) => {
      let currentControl = this.form2.controls[name];
      if (currentControl.dirty) {
        if (currentControl.value as boolean && currentControl.value == true
          || currentControl.value as string && currentControl.value != "")
          changedProperties.push([name, currentControl.value]);
      }
    });
    if (changedProperties.length > 0)
      this.hasPropertyForm2 = true;
    this.chartService.searchForSpesificUesrs_2(changedProperties).subscribe((result: scholarship[]) => {
      this.foundScholarships = result;
      if (result != null && result.length > 0 && searchNumber == 2) {
        this.showUsersTable = true;
        this.showScholarshipsTable = true;
        this.dataSourceScholarship = this.foundScholarships;
      }
      if (result != undefined && searchNumber == 4)
        if (this.form3.dirty)
          this.searchForCard_3(4);
        else
          this.mergeData();
      else
        if (searchNumber == 2 && result != null && result != undefined)
          this.showNameAndId(searchNumber);
     
    }, err => {
      console.log(err);
    })

  }
  searchForCard_3(searchNumber: number) {
    this.showUsersTable = false;
    this.showLoansTable = false;
    this.showScholarshipsTable = false;
    let changedProperties = [];
   
    Object.keys(this.form3.controls).forEach((name) => {
      let currentControl = this.form3.controls[name];
      if (currentControl.dirty) {
        if (currentControl.value as boolean && currentControl.value == true
          || currentControl.value as string && currentControl.value != ""
          || currentControl.value as Date && currentControl.value != "")
          changedProperties.push([name, currentControl.value]);
      }
    });
    if (changedProperties.length > 0)
      this.hasPropertyForm3 = true;
    this.chartService.searchForSpesificUesrs_3(changedProperties).subscribe((result: scholarship[]) => {
      this.foundLoans = result;
      if (result != null && result.length > 0 && searchNumber == 3) {
        this.showUsersTable = true;
        this.showLoansTable = true;
        this.dataSourceLoan = this.foundLoans;
      }

      if (result != undefined && searchNumber == 4)
        this.mergeData();
      else
        if (searchNumber == 3 && result != null && result != undefined) {
          this.showNameAndId(searchNumber);
        }
     
    }, err => {
      console.log(err);
    })
  }
  searchAllCard(searchNumber: number) {
   
    this.hasPropertyForm1 = false;
    this.hasPropertyForm2 = false;
    this.hasPropertyForm3 = false;
    if (this.form1.dirty)
      this.searchForCard_1(searchNumber);
    else
      if (this.form2.dirty)
        this.searchForCard_2(searchNumber);
      else
        if (this.form3.dirty)
          this.searchForCard_3(searchNumber);
   
  }
  identitiesArray: string[]

  mergeData() {
    var newLoans: scholarship[] = [];
    var newScholarships: scholarship[] = [];
    var newUsers: user[] = [];

    if (this.form1.dirty && this.hasPropertyForm1 && this.foundUsers)
      if (this.form2.dirty && this.hasPropertyForm2 && this.foundScholarships)
        if (this.form3.dirty && this.hasPropertyForm3 && this.foundLoans)
          this.foundUsers.forEach(user => {
           
            let schlrshp = this.foundLoans.find(schlrshp => schlrshp.Identity === user.Identity);
            if (schlrshp) {
              let scholarship = this.foundScholarships.find(schlr => schlr.Identity === user.Identity);
              if (scholarship) {
                newLoans.push(schlrshp);
                newScholarships.push(scholarship);
                newUsers.push(user);
              }
            }
          });
        else {
          if (!this.hasPropertyForm3)
            this.foundUsers.forEach(user => {
             
              let scholarship = this.foundScholarships.find(schlr => schlr.Identity === user.Identity);
              if (scholarship) {
                newScholarships.push(scholarship);
                newUsers.push(user);
              }
            });
          else
            this.fillDataWithERROR();
        }
      else {
        if (!this.hasPropertyForm2) {
          if (this.form3.dirty && this.hasPropertyForm3 && this.foundLoans) {
            this.foundLoans.forEach(schlrshp => {
              let user = this.foundUsers.find(user => user.Identity === schlrshp.Identity);
              if (user) {
                newLoans.push(schlrshp);
                newUsers.push(user);
              }
            })
          }
          else
            if (!this.hasPropertyForm3)
              newUsers = this.foundUsers;
        }
        else
          this.fillDataWithERROR();
      }
    else
      if (!this.hasPropertyForm1) {
        if (this.form2.dirty && this.hasPropertyForm2 && this.foundScholarships)
          if (this.form3.dirty && this.hasPropertyForm3 && this.foundLoans) {
            this.foundLoans.forEach(schlp => {
              let schlrshp = this.foundScholarships.find(schlshp => schlshp.Identity == schlp.Identity);
              if (schlrshp) {
                newScholarships.push(schlrshp);
                newLoans.push(schlp);
              }
            });
          }
          else
            if (!this.hasPropertyForm3)
              newScholarships = this.foundScholarships;
            else
              this.fillDataWithERROR()
        else
          if (!this.hasPropertyForm2) {
            if (this.form3.dirty && this.hasPropertyForm3 && this.foundLoans)
              newLoans = this.foundLoans;
            else
              this.fillDataWithERROR();
          }
      }
      else
        this.fillDataWithERROR();
   

    this.foundLoans = newLoans;
    this.foundScholarships = newScholarships;
    this.foundUsers = newUsers;
    if ((newLoans.length > 0 || newScholarships.length > 0) && newUsers.length == 0) {
      if (newLoans.length > 0)
        this.showNameAndId(3)
      else
        this.showNameAndId(2);
    }
    if ((this.foundLoans != undefined && this.foundLoans != null && this.foundLoans.length > 0) || (this.foundScholarships != undefined && this.foundScholarships != null && this.foundScholarships.length > 0) || (this.foundUsers != undefined && this.foundUsers != null && this.foundUsers.length > 0)) {
      this.showUsersTable = true;
      this.dataSourceUser = this.foundUsers;
      if (this.foundScholarships != undefined && this.foundScholarships != null && this.foundScholarships.length > 0) {
        this.showScholarshipsTable = true;
        this.dataSourceScholarship = this.foundScholarships;
      }
      if (this.foundLoans != undefined && this.foundLoans != null && this.foundLoans.length > 0) {
        this.showLoansTable = true;
        this.dataSourceLoan = this.foundLoans;
      }

    }
    else
      this.showUsersTable = false;
  }

  showNameAndId(formNumber: number) {
   
    switch (formNumber) {
      case 2:
        this.identitiesArray = this.foundScholarships.map(function (el) { return el.Identity; });
        break;
      case 3:
        this.identitiesArray = this.foundLoans.map(function (el) { return el.Identity; });
        break;
    }
    const uniquObjects = [...new Set(this.identitiesArray.map(borrower => borrower))];
   
    this.userService.getListOfUsersById(uniquObjects).subscribe((users: []) => {
     
      this.foundUsers = users;
      this.dataSourceUser = this.foundUsers;
      if (formNumber == 3 && this.foundLoans.length > 0 && this.foundUsers.length > 0) {
        var newLoans: scholarship[] = [];
        var newUsers: user[] = [];
        this.foundLoans.forEach(schlrshp => {
          let user = this.foundUsers.find(user => user.Identity === schlrshp.Identity);
          if (user) {
            newLoans.push(schlrshp);
            newUsers.push(user);
          }
        })
        this.dataSourceLoan = newLoans;
        this.dataSourceUser = newUsers;
      }
    })
  }

  fillDataWithERROR() {
    this.foundLoans = null;
    this.foundScholarships = null;
    this.foundUsers = null;
  }
}
