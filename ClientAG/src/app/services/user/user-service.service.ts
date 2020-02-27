import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { user } from '../../models/user'
import { observable, Subject } from 'rxjs';
//import { manager } from '../../models/managerEnums';
import { Router } from '@angular/router';
import { scholarship } from 'src/app/models/scholarship';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()

export class UserService {
  editUser: user = null;
  wayToOpen: number;
  // indexOfUserTOEdit: number = null;
  // allUsers: user[];
  isInLogin: boolean;
  // thisUser: user;
  baseUrl: string = "http://localhost:63187/api/User/"
  public  constructor(private http: HttpClient, private routr: Router) {
    this.isInLogin = true;
    //console.log("UserService ctor");
  }

  login(identity: string,userName:string) {
    return this.http.get(this.baseUrl + "Login?id=" + identity+"&&userName="+userName);
  }
  contraryUserToDisable(userIdentity:string) {
    let body = new HttpParams();
    body = body.set('userIdentity', userIdentity);
    return this.http.get(this.baseUrl + "ContraryUserToDisable?userIdentity="+userIdentity)
  }
  getUserById(identity: string) {
    return this.http.get(this.baseUrl + "GetUserById?id=" + identity);
  }
  getListOfUsersById(usersIdentities: string[]) {
    let params = new HttpParams();
    params = params.append('usersIdentities', usersIdentities.join(', '));
    return this.http.get(this.baseUrl + "GetListOfUsersById",{ params: params });
  }
  fetchUsers() {//: Observable<user> {
    return this.http.get(this.baseUrl + "GetAllUsers");
  }
  fetchUsersFromHistory(){
    return this.http.get(this.baseUrl + "GetAllUsersFromHistory");
  }
  fetchAllCitiesOfUsers() {//: Observable<user> {
    return this.http.get(this.baseUrl + "GetListOfUsersCities");
  }

  fetchAllCities() {
    return this.http.get(this.baseUrl + "GetListAllCities");
  }

  saveUserDetailes(user: user) {

    return this.http.post(this.baseUrl + "saveUserDetailes", user);
  }

  addNewCityToDB(cityName: string) {
    return this.http.get(this.baseUrl + "AddNewCity?cityName="+ cityName);
  }
  convertGregoriandateToHebrewDate(gregoriandate: Date) {
    return this.http.get(this.baseUrl + "ConvertGregoriandateToHebrewDate?date=" + gregoriandate.toDateString())
  }
  convertListOfGeorgianDatesToHebrewDates(usersIdentities: string[]) {
    let params = new HttpParams();
    params = params.append("usersIdentity", usersIdentities.join(','))
    return this.http.get(this.baseUrl + "ConvertListOfGeorgianDatesToHebrewDates", { params: params });
  }
  saveWayToOpenManager(num:number){
    return this.http.get(this.baseUrl+"SaveWayToOpenManager?num="+num);
  }
  returnWayToOpenManager(){
    return this.http.get(this.baseUrl+"ReturnWayToOpenManager");
  }
}