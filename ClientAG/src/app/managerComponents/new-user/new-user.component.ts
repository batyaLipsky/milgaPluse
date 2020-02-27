import { Component, OnInit, NgModule, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { City } from 'src/app/models/managerEnums';
import { UserService } from 'src/app/services/user/user-service.service';
// import { userService } from 'src/app/services/manager/manager.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { user } from 'src/app/models/user';
import { startWith, map } from 'rxjs/operators';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BirthDateModalComponent } from '../birth-date-modal/birth-date-modal.component';
import { MatDialog } from '@angular/material';
import { Num } from 'docx';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  // editUser: user;
  hebrweBirthdate: string[];
  firstName: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;

  matcher = new MyErrorStateMatcher();
  editUser: user = new user();
  cities: City[];
  changeCityToNumber: City
  edidByUserUrl: string = "/main-user/edit_user_detailes";
  currentUser: user;
  showNewCityInput: boolean = false;
  newCityName: string = "";
  public constructor(public dialog: MatDialog, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    debugger;
    let newUser = this.route.snapshot.paramMap.get('newUser');
    this.currentUser = JSON.parse(localStorage["currentUser"])
    this.userService.fetchAllCities().subscribe((city: []) => {
      this.cities = city;
    }, err => console.log("error in subscribe the detailes of city: " + err));
    if (newUser && this.userService.editUser) {
      this.editUser = this.userService.editUser;
      this.userService.editUser = null;
      if (this.currentUser.IsManager) {
        this.userService.returnWayToOpenManager().subscribe(result => {
          debugger;
          if (result == 2 || result == 5) {
            document.getElementsByTagName("li")[3].classList.remove("clicked")
            document.getElementsByTagName("li")[2].classList.add("clicked");
          }
        })

      }
      else {
        document.getElementsByTagName("li")[2].classList.remove("clicked")
        document.getElementsByTagName("li")[1].classList.add("clicked");
      }
    }

  }

  saveUserDetailes() {
    //  console.log(this.editUser.LastName);
    if (this.editUser.IsManager)
      this.editUser.IsManager = true;
    if (this.editUser.DoingTest)
      this.editUser.DoingTest = true;
    if (this.editUser.FullDay)
      this.editUser.FullDay = true;
    // console.log(this.editUser.City)
    if (this.newCityName == "" || this.newCityName == null) {
      var changeCityToNumber;
      while (!changeCityToNumber) {
        changeCityToNumber = this.cities.filter(x => {
          if (x.CityName == this.editUser.City.toString()) {
            this.editUser.City = Number(x.Id);
            return true;
          }
          else
            return false;
        })
      }
    }
    this.userService.saveUserDetailes(this.editUser).subscribe((suc: any) => {
      const userInLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
      if (userInLocalStorage.Identity == this.editUser.Identity)
        localStorage.setItem("currentUser", JSON.stringify(this.editUser));
      // console.log(suc);
      if (suc == "succeed")
        alert("האברך " + this.editUser.FirstName + " " + this.editUser.LastName + " נרשם במערכת.")
      else
        if (suc == "err")
          alert("האברך " + this.editUser.FirstName + " " + this.editUser.LastName + " לא נרשם במערכת עקב שגיאה");
        else
          if (suc == "the user exist")
            alert("האברך " + this.editUser.FirstName + " " + this.editUser.LastName + " יצא מהמערכת. ")
    }, err => console.log("שגיאה בשמירת האברך: " + JSON.parse(err)));

    //  console.log(user);

  }
  saveNewCity() {
    if (this.newCityName != "" && this.newCityName != null && this.cities.find(x => x.CityName == this.newCityName) == undefined) {
      this.userService.addNewCityToDB(this.newCityName).subscribe((res: City) => {
        if (!res.CityName) {
          alert("ארעה שגיאה בשמירת שם העיר במערכת.")
        }
        else {
          this.editUser.City = Number(res.Id);
          this.userService.fetchAllCities().subscribe((city: []) => {
            this.cities = city;
          }, err => console.log("error in subscribe the detailes of city: " + err));
        }
      }, err => console.log(err))
    }
  }
  findTheHebrewBirthdate() {
    if (this.editUser.BirthDate_gregorian) {
      this.userService.convertGregoriandateToHebrewDate(this.editUser.BirthDate_gregorian).subscribe((hebrweBirthdate: []) => {
        this.hebrweBirthdate = hebrweBirthdate;
        //  console.log(this.hebrweBirthdate);
        this.openDialog();
      }, err => console.log("error in subscribe the detailes of dates: " + err));
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(BirthDateModalComponent, {
      width: '350px',
      data: this.hebrweBirthdate
    });
    dialogRef.componentInstance.onAdd.subscribe((result) => {
      this.editUser.BirthDate_hebrew = result;
    });
    dialogRef.afterClosed()
      .subscribe((err) => { console.log(err) })
  }

}


