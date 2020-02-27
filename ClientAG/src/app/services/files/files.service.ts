import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
baseUrl:string="http://localhost:63187/api/Files/"
public constructor(private httpClient: HttpClient) { }

  getAllFilesNames() {
    return this.httpClient.get(this.baseUrl+"GetAllFilesNames")
  }
  
  downlaod(fileName) {
    // return this.myHttp.get(this.baseUrl+ 'API/User/downloadProgram',{ responseType: 'blob' })
    return this.httpClient.get(this.baseUrl+"DownLoadFile?fileName=" + fileName,
      { responseType: 'blob' })
    // return this.myHttp.get(this.baseUrl+ 'API/User/downloadProgram',{responseType: 'blob'})
  }
  deletFile(fileName) {
    return this.httpClient.get(this.baseUrl+"DeletFile?fileName=" + fileName);
  }

}
