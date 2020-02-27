import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  baseUrl: string = "http://localhost:63187/api/Statistics/";

  public constructor(private http: HttpClient) { }

  getLastXMonthNames(num: number) {
    return this.http.get(this.baseUrl + "GetLastXMonthNames?num=" + num);
  }
  getAtmadaForAllUsersInXMonthAgo(num: number) {
   
    return this.http.get(this.baseUrl + "GetAtmadaForAllUsersInXMonthAgo?num=" + num);
  }
  getAtmadaForUserInXMonthAgo(identity: string, num: number) {
   
    return this.http.get(this.baseUrl + "GetAtmadaForUserInXMonthAgo?id=" + identity + "&&num=" + num);
  }
  getLoansForAllUsersInXMonthAgo(num: number) {
   
    return this.http.get(this.baseUrl + "GetLoansForAllUsersInXMonthAgo?num=" + num);
  }
  avgChildrenForUser() {
    return this.http.get(this.baseUrl + "AVGChildrenForUser")
  }
  avgUsersAge() {
    return this.http.get(this.baseUrl + "AVGUsersAge")
  }
  getScholarshipForAllUsersInXMonthAgo(num: number) {
   
    return this.http.get(this.baseUrl + "GetScholarshipForAllUsersInXMonthAgo?num=" + num);
  }
  getScholarshipForUserInXMonthAgo(identity: string, num: number) {
   
    return this.http.get(this.baseUrl + "GetScholarshipForUserInXMonthAgo?id=" + identity + "&&num=" + num);
  }
  getShmiratSdarimForAllUsersInXMonthAgo(num: number) {
   
    return this.http.get(this.baseUrl + "GetShmiratSdarimForAllUsersInXMonthAgo?num=" + num);
  }
  getShmiratSdarimForUserInXMonthAgo(identity: string, num: number) {
   
    return this.http.get(this.baseUrl + "GetShmiratSdarimForUserInXMonthAgo?id=" + identity + "&&num=" + num);
  }
  getMarksForUserInXMonthAgo(identity: string, num: number) {
   
    return this.http.get(this.baseUrl + "GetMarksForUserInXMonthAgo?id=" + identity + "&&num=" + num);
  }
  searchForSpesificUesrs_1(dataForSearch: any[]) {
   
    var newArray = JSON.stringify(dataForSearch);
    return this.http.get(this.baseUrl + "SearchForSpesificUesrs_dataAboutUsers?data=" + newArray);
  }
  searchForSpesificUesrs_2(dataForSearch: any[]) {
   
    var newArray = JSON.stringify(dataForSearch);
    return this.http.get(this.baseUrl + "SearchForSpesificUesrs_dataAboutScholarship?data=" + newArray);
  }
  searchForSpesificUesrs_3(dataForSearch: any[]) {
   
    var newArray = JSON.stringify(dataForSearch);
    return this.http.get(this.baseUrl + "SearchForSpesificUesrs_dataAboutLoans?data=" + newArray);
  }
}
