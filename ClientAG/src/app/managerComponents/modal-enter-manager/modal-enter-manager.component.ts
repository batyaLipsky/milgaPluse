import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-modal-enter-manager',
  templateUrl: './modal-enter-manager.component.html',
  styleUrls: ['./modal-enter-manager.component.scss']
})
export class ModalEnterManagerComponent implements OnInit {
  @Output() clicked = new EventEmitter<number>();
  public constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  chooseWayToOPen(num): void {
    this.userService.saveWayToOpenManager(num).subscribe((wayNum: number) => {

      this.clicked.emit(1);
      switch (num) {
        case 1:
        case 3:
          this.router.navigate(['main-manager']);
          break;
        case 2:
        case 5:
          this.router.navigate(['main-user']);
          break;
      }

    }, err => { alert("שגיאה בקבךת נתונים מהשרת."); console.log(err) })
  }
}
