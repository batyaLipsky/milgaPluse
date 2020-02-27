import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, Form } from '@angular/forms';
import { basicScholarship, scholarship } from 'src/app/models/scholarship';
import { ScholarshipService } from 'src/app/services/scholarship/scholarship.service';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-basic-milga-details',
  templateUrl: './basic-milga-details.component.html',
  styleUrls: ['./basic-milga-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicMilgaDetailsComponent implements OnInit {
  currentData: basicScholarship;
  form: basicScholarship = new basicScholarship();
  oldForm: any[]=[];
  openOldData: boolean = false;
  public constructor(private formBuilder: FormBuilder, private _filesService: FilesService, private _scholarshipService: ScholarshipService) { }

  ngOnInit() {
    this._scholarshipService.getBasicScholarData().subscribe((res: basicScholarship) => {
      this.currentData = this.form = res;
    }, err => console.log("err: " + err));
    this.getOldFile();
  }
  saveChanges(form: any) {
    if (!form.valid)
      return;
    else {
      this.form.maxAbsenceForShmiratSdarim;
      this._scholarshipService.saveBasicScholarshipData(this.form).subscribe(res => {
       // console.log(res);
      }, err => console.log("err: " + err));
    }
    this.getOldFile();
  }
  getOldFile() {
    this._scholarshipService.openOldDataOfBasicDataForScholarship().subscribe((oldData: any[]) => {
      this.oldForm = oldData;
    })
  }
  openSpesificOldData(data) {
    this.form = data["Value"];
    this.openOldData = true;
  }
  refreshData() {
    this.form = this.currentData;
    this.openOldData = false;
  }
}
