import { Injectable } from '@angular/core';
import { basicScholarship, scholarship } from 'src/app/models/scholarship';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
// { providedIn: 'root'}
@Injectable()
// @Injectable()
export class ScholarshipService {
  previousMilga: scholarship[] = [];
  baseUrl: string = "http://localhost:63187/api/Scholarships/";

  public constructor(private http: HttpClient, private routr: Router) { }

  getBasicScholarData() {
    return this.http.get(this.baseUrl + "GetBasicScholarData");
  }
  openOldDataOfBasicDataForScholarship() {
    return this.http.get(this.baseUrl + "GetOldDtaOfBasicDataForScholarship");
  }
  saveBasicScholarshipData(basicDataScholarship: basicScholarship) {
    return this.http.post(this.baseUrl + "SaveBasicDataScholarship", basicDataScholarship);
  }
  calculateScholarship(scholarship: scholarship) {
    return this.http.post(this.baseUrl + "CalculateScholarship", scholarship);
  }
  saveConfirmScholarship(scholarship: scholarship) {
    return this.http.post(this.baseUrl + "SaveConfirmScholarship", scholarship);

  }
  findIfApplyNewScholarship(identity: string) {
    return this.http.get(this.baseUrl + "FindIfApplyNewScholarship?identity=" + identity);
  }
  newScholarshipDetailes(scholarship: scholarship) {
    return this.http.post(this.baseUrl + "AddNewScholarship", scholarship);
  }
  getAllScholarshipAccordingId(identity: string) {
    return this.http.get(this.baseUrl + "GetAllScholarshipAccordingId?identity=" + identity);
  }
  getScholarshipAccordingIdMonthYear(identity: string, year: string, month: string) {
    let params = new HttpParams();
    params = params.append('identity', identity);
    var url = "GetAllScholarshipAccordingParams";

    if (year && month && year != "\"") {
      params = params.append('year', year);
      params = params.append('month', month);
      return this.http.get(this.baseUrl + url, { params: params });
    }
    else
      if (month) {
        params = params.append('month_or_year', month);
        return this.http.get(this.baseUrl + url, { params: params });
      }
      else
        if (year) {
          params = params.append('month_or_year', year);
          return this.http.get(this.baseUrl + url, { params: params });
        }
  }
  getScholarshipForConfirm() {
    return this.http.get(this.baseUrl + "GetScholarshipForConfirm");
  }
  getNamesOfUsersOfScholarshipForConfirm(usersIdentities: string[]) {
    let params = new HttpParams();
    params = params.append("usersIdentity", usersIdentities.join(','))
    return this.http.get(this.baseUrl + "GetNamesOfUsersOfScholarshipForConfirm", { params: params });
  }
  getTheLastScholarshipForAllUser() {
    return this.http.get(this.baseUrl + "GetTheLastScholarshipForAllUser");
  }
}
