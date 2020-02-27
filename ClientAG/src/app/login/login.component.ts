import { Component, Renderer2, OnInit, Inject, Output } from '@angular/core';
import { UserService } from '../services/user/user-service.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { RoleGuardGuard } from '../services/guards/role-guard.guard';
import { ManagerService } from '../services/manager/manager.service';
import { userDataEnum } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  errorMessege: boolean = true;
  identityVal: string;
  userNameVal: string;
  timeLeft: number = 60;
  interval;
  loginClass: string;
  wayToOpenManager: number;
  notFoundUser: boolean = false;

  public constructor(private renderer2: Renderer2, private guardService: RoleGuardGuard, private userService: UserService, private router: Router) {
    document.body.classList.add('inLogin');
    renderer2.addClass(document.body, 'inLogin');
  }

  ngOnInit() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserScholarship");
  }

  login() {
    this.notFoundUser = false;
    if (this.identityVal != "" && this.userNameVal != "")
      this.userService.login(this.identityVal, this.userNameVal).subscribe((user: any) => {
        if (user) {
          this.guardService.accessThroughTheCode = true;
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.renderer2.removeClass(document.body, 'inLogin');

          if (user.IsManager) {
            try {
              this.userService.returnWayToOpenManager().subscribe((wayNumber: number) => {
                this.wayToOpenManager = wayNumber;
                if (this.wayToOpenManager < 5)
                  this.router.navigate(["main-manager"]);
                else
                  this.router.navigate(["main-user"]);
              }, err => { alert("שגיאה בקבךת נתונים מהשרת."); console.log(err) })
              // this.wayToOpenManager = JSON.parse(localStorage.getItem("WayToOPenManager"));

            }
            catch{
              try {
                // localStorage.removeItem("WayToOPenManager");
                this.userService.saveWayToOpenManager(0).subscribe();
                if (this.wayToOpenManager < 5)
                  this.router.navigate(["main-manager"]);
                else
                  this.router.navigate(["main-user"]);
              } catch (err) {
                alert(err)
              }
            }
          }
          else this.router.navigate(["main-user"]);
        }
        else
          this.notFoundUser = true;
      }, err => { console.log(err); alert(err) });

  }


  startTimer() { ///after 20 second the error massege is gone(unless you make another one)
    this.timeLeft = 20;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.errorMessege = true;
      }
    }, 1000)
  }
}

