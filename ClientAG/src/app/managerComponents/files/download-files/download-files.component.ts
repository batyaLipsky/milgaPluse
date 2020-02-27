import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilesService } from 'src/app/services/files/files.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.component.html',
  styleUrls: ['./download-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadFilesComponent implements OnInit {
  filesNames: string[];
  public constructor(private filesService: FilesService, private router: Router) { }

  ngOnInit() {
    this.getAllFilesNames();
  }
  getAllFilesNames() {
    this.filesService.getAllFilesNames().subscribe((res: []) => {
      this.filesNames = res;
    })
  }
  downlaod(fileName: string) {
    this.filesService.downlaod(fileName).subscribe((res: any) => {
      saveAs(res, fileName);
    }, err => console.log(err + 'ccc'));
  }
  deletFile(fileName) {
    this.filesService.deletFile(fileName).subscribe(res => {
      if (res)
        this.getAllFilesNames();
      else
        alert("לא הצליח למחוק את הקובץ" + fileName)
    })
  }
}
