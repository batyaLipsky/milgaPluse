import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from "@angular/core";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainUserComponent } from './userComponents/main-user/main-user.component';//'./main-user/main-user.component';
import { UserDetailsUserComponent } from './userComponents/user-details-user/user-details-user.component';
// import { MilgaDetailsUserComponent } from './userComponents/milga-details-user/milga-details-user.component';
import { BackgroundImagesComponent } from './userComponents/background-images/background-images.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainManagerComponent } from './managerComponents/main-manager/main-manager.component';
import { ModalEnterManagerComponent } from './managerComponents/modal-enter-manager/modal-enter-manager.component';
import { MainManagerSideBarComponent } from './managerComponents/main-manager-side-bar/main-manager-side-bar.component';
import { UsersDataComponent } from './managerComponents/users-data/users-data.component';
import { ScholarshipDataComponent } from './managerComponents/scholarship-data/scholarship-data.component';
import { NewUserComponent } from './managerComponents/new-user/new-user.component';
import { OnlyNumberInputDirective } from './directives/only-number-input.directive';
import { OnlyHebrewLettersInputDirective } from './directives/only-hebrew-letters-input.directive';
import { MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ManagerService } from './services/manager/manager.service';
import { BirthDateModalComponent } from './managerComponents/birth-date-modal/birth-date-modal.component';
import { BasicMilgaDetailsComponent } from './managerComponents/basic-milga-details/basic-milga-details.component';
import { GlobalStatisticsComponent } from './statistics/global-statistics/global-statistics.component';
import { SelectSpesificUsersComponent } from './statistics/select-spesific-users/select-spesific-users.component';
// import { LoansComponent } from './managerComponents/loans/loans.component';
import { ReturnLoansComponent } from './managerComponents/return-loans/return-loans.component';
// import { FilesComponent } from './managerComponents/files/files.component';
import { ConvertFileToBase64Directive } from './directives/convertFileToBase64/convert-file-to-base64.directive';
import { ChartsModule } from 'ng2-charts';
import { LoanDialogComponent } from './managerComponents/loan-dialog/loan-dialog.component';
import { LineChartComponent } from './statistics/line-chart/line-chart.component';
import { BarChartComponent } from './statistics/bar-chart/bar-chart.component';
import { UserService } from './services/user/user-service.service';
//import { ConfirmScholarshipsComponent } from './managerComponents/confirm-scholarships/confirm-scholarships.component';
//import { MatFileUploadModule } from 'angular-material-fileupload';
import { UploadFilesComponent } from './managerComponents/files/upload-files/upload-files.component';
import { DownloadFilesComponent } from './managerComponents/files/download-files/download-files.component';
import { SummaryLoanComponent } from './managerComponents/summary-loan/summary-loan.component';
import { ScholarshipService } from './services/scholarship/scholarship.service';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainUserComponent,
    UserDetailsUserComponent,
    // MilgaDetailsUserComponent,
    BackgroundImagesComponent,
    MainManagerComponent,
    ModalEnterManagerComponent,
    MainManagerSideBarComponent,
    UsersDataComponent,
    ScholarshipDataComponent,
    NewUserComponent,
    OnlyNumberInputDirective,
    OnlyHebrewLettersInputDirective,
    BirthDateModalComponent,
    BasicMilgaDetailsComponent,
    GlobalStatisticsComponent,
    SelectSpesificUsersComponent,
    // LoansComponent,
    ReturnLoansComponent,
    // FilesComponent,
    ConvertFileToBase64Directive,
    LoanDialogComponent,
    LineChartComponent,
    BarChartComponent,
    UploadFilesComponent,
    DownloadFilesComponent,
    SummaryLoanComponent,
  ],
  imports: [
    //MatFileUploadModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ChartsModule,
    MatFormFieldModule

  ], entryComponents: [
    BirthDateModalComponent, LoanDialogComponent, SummaryLoanComponent],

  providers: [
    // {
    //   provide: [LocationStrategy],
    //   useClass: HashLocationStrategy
    // },
    UserService, ScholarshipService],
  bootstrap: [AppComponent]

})

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
