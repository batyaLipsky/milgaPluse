import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-main-manager',
  templateUrl: './main-manager.component.html',
  styleUrls: ['./main-manager.component.scss']
})
export class MainManagerComponent implements OnInit {
  thisUser: user;
  showImages: boolean = true;
  wayToOpen;
  showModalForChooseWayToOpen: boolean = false;
  previousClickedItemNumber: number = null;
  public constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: any) => {
      console.log(event.url); //based on this change class
    });
  }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.returnWayToOpenManager().subscribe((wayNum: number) => {
      this.wayToOpen = wayNum;
      console.log("wayToOpen" + this.wayToOpen)

    }, err => { alert("שגיאה בקבלת נתונים מהשרת."); console.log(err) })
  }
  change_wayToOpen() {
    this.changeClasses(null);
    this.userService.returnWayToOpenManager().subscribe((wayNum: number) => {
      this.wayToOpen = wayNum;
      if (this.wayToOpen > 0)
        this.showModalForChooseWayToOpen = false;
      console.log("wayToOpen" + this.wayToOpen)
    }, err => { alert("שגיאה בקבלת נתונים מהשרת."); console.log(err) })
  }
  changeClasses(num: number) {
    let tabElements = document.getElementsByClassName("onVisit");
    if (this.previousClickedItemNumber != null)
      tabElements[this.previousClickedItemNumber].classList.remove("clicked");
    if (num != null)
      tabElements[num].classList.add("clicked");
    this.previousClickedItemNumber = num;

  }
  changeSystem() {
    this.showModalForChooseWayToOpen = true;
    this.showImages = false;
    this.userService.saveWayToOpenManager(0).subscribe((wayNum: number) => {
      this.wayToOpen = wayNum;
      this.change_wayToOpen();
    }, err => { alert("שגיאה בקבלת נתונים מהשרת."); console.log(err) })

  }

  newSelectionFromSideBar($event) {
    this.router.navigate([$event]);
  }
}
