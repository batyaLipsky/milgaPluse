import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { user, userDataEnum } from 'src/app/models/user';
import { City } from 'src/app/models/managerEnums';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {
  allUsersDetailes: user[] = [];
  searchHistory: boolean = true;
  allCitiesOfUsers: any = [];
  // cityName: City[];
  datesOfLeaveInHebrew: string[][];
  headElements = [userDataEnum.lastName, userDataEnum.firstName, userDataEnum.address, userDataEnum.city, userDataEnum.zipCode, userDataEnum.telephon, userDataEnum.cellularTelephone1, userDataEnum.cellularTelephone2, userDataEnum.email, userDataEnum.birthDate, userDataEnum.children, userDataEnum.fullDay, userDataEnum.doingTest, userDataEnum.refundTransportation, userDataEnum.isManager];

  public constructor(private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
  }


  ngOnInit() {
    this.getAllActiveUsers();
  }
  getAllActiveUsers() {
    this.userService.fetchUsers().subscribe((users: user[]) => {
      this.allUsersDetailes = users;
      ///  console.log(this.allUsersDetailes);
    }, err => console.log("error in subscribe the detailes: " + JSON.parse(err)))//cmplt=>console.log("error in subscribe the detailes: "+cmplt))
    this.getAllUsersCities();
  }
  getAllUsersCities() {
    this.userService.fetchAllCitiesOfUsers().subscribe((city: []) => {
      this.allCitiesOfUsers = city;
      //  console.log(this.allCitiesOfUsers);
      this.changeDetectorRef.detectChanges();
    }, err => console.log("error in subscribe the detailes of city: " + JSON.parse(err)));
  }
  getAllHistoryUsers() {
    this.userService.fetchUsersFromHistory().subscribe((users: user[]) => {
      this.allUsersDetailes = users;
      if (this.allUsersDetailes != null && this.allUsersDetailes.length > 0) {
        var usersIdentities = [...new Set(this.allUsersDetailes.map(x => x.Identity))];
        this.userService.convertListOfGeorgianDatesToHebrewDates(usersIdentities).subscribe((res: [][]) => {
          this.datesOfLeaveInHebrew = res;
        })
      }
      // console.log(this.allUsersDetailes);
    }, err => console.log("error in subscribe the detailes: " + JSON.parse(err)))//cmplt=>console.log("error in subscribe the detailes: "+cmplt))
    this.getAllUsersCities();
  }

  goToEditDetailes(userToEdit: user) {
    this.userService.editUser = userToEdit;
  }
  contraryUserToDisable(userIdentity: string, lastName: string, firstName: string) {
    if (confirm('האם למחוק את הרב ' + lastName + ' ' + firstName + ' מהמערכת?')) {
      this.userService.contraryUserToDisable(userIdentity).subscribe(res => {
        if (res == "succeed")
          this.ngOnInit();
        
          alert(res)
      }, err => { });
    } else {
    }
  }

}
