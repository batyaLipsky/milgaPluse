import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';
// import { DOCUMENT } from '@angular/platform-browser';
import { RoleGuardGuard } from 'src/app/services/guards/role-guard.guard';
import { DOCUMENT } from '@angular/common';
// import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {
  thisUser: user;
  public constructor(private roleGuard: RoleGuardGuard, private userService: UserService, private router: Router, @Inject(DOCUMENT) private _document, private _renderer2: Renderer2) {
  }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("currentUser"));
   // console.log(this.thisUser.IsManager);
  }
  

  accessThroughTheCode(num: number) {
    this.roleGuard.accessThroughTheCode = true;
  
    if (num == null) {
      // localStorage.removeItem("WayToOPenManager");
      this.userService.saveWayToOpenManager(1).subscribe();
      // localStorage.setItem("WayToOPenManager", "1");
    }
  }

  editUser(num: number) {
    this.userService.editUser = JSON.parse(localStorage.getItem("currentUser"));
    this.accessThroughTheCode(num);
  }

}
