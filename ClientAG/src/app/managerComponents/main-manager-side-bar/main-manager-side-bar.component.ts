import { Component, OnInit, ViewChild, HostListener, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-manager-side-bar',
  templateUrl: './main-manager-side-bar.component.html',
  styleUrls: ['./main-manager-side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainManagerSideBarComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  newRoutSelection: string;
  public constructor(private router: Router) { }

  ngOnInit() {
  }

  sendToParentSideBarSelect() {
    this.eventEmitter.emit(this.newRoutSelection);
  }

  editUser() {
  }


}
