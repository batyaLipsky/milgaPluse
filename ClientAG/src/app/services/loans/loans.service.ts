import { Injectable } from '@angular/core';
// import { HttpClient } from '';
import { request } from 'http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { loan } from 'src/app/models/loan';
import { bankAccount } from 'src/app/models/bankAccount';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  baseUrl: string = "http://localhost:63187/api/Loans/";

  public constructor(private http: HttpClient) { }

  getAllLoans() {
    return this.http.get(this.baseUrl + "GetAllLoans")
  }
  getLoansById(identity: string, date: Date) {
    let params = new HttpParams();
    params = params.append('identity', identity);
    params = params.append('date', date.toString());
    return this.http.get(this.baseUrl + "GetLoansById", { params: params })
  }
  checkIfExistBankAccount(bankAcountNumber: bankAccount) {
    return this.http.post(this.baseUrl + "CheckIfExistBankAccount", bankAcountNumber)
  }
  saveBankAccount(bankAccountDetailes: bankAccount) {
    return this.http.post(this.baseUrl + "SaveBankAccount", bankAccountDetailes)
  }
  saveReturnloan(loan: loan) {
    debugger;
    return this.http.post(this.baseUrl + "SaveReturnloan", loan)
  }

  getPrevScholarshipByIdForCalculateRemaindDebt(identity: string, date: Date) {
    let params = new HttpParams();
    params = params.append('identity', identity);
    params = params.append('date', date.toString());
    return this.http.get(this.baseUrl + "GetPrevScholarshipByIdForCalculateRemaindDebt", { params: params })
  }
}
