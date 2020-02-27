import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFilesComponent implements OnInit {
  localUrl: any = []
  fileToUpload: File = null;
  showuploadAndRemoveButtons: boolean = false;
  removeButton:boolean=false
  public constructor(private filesService: FilesService, private router: Router, private cdRef: ChangeDetectorRef) { }
  ngOnInit() { }

  ngAfterViewChecked() {
    var show = this.showuploadAndRemoveButtons;
    var cards = document.getElementsByTagName("mat-card").length;
    if (cards > 0)
      this.showuploadAndRemoveButtons = true;
    else
      this.showuploadAndRemoveButtons = false;
    if (show != this.showuploadAndRemoveButtons)
      this.cdRef.detectChanges();

  }
  openFileInput() {
    document.getElementById("selectFiles").click();
  }
  uploadAll() {
    document.getElementsByTagName("button")[2].click();
  }
  removeAll() {
      document.getElementsByTagName("button")[3].click();
  }
  clickit(event){
  if(document.getElementsByTagName("mat-card").length-1<=0)
    this.removeButton=false;
  }

}
