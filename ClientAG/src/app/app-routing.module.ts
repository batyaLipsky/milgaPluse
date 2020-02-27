import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { ModuleWithProviders } from "@angular/core";
//import { UserComponent } from 'src/app/user/user.component';
import { MainUserComponent } from './userComponents/main-user/main-user.component';
// import { MilgaDetailsUserComponent } from './userComponents/milga-details-user/milga-details-user.component';
import { UserDetailsUserComponent } from './userComponents/user-details-user/user-details-user.component'//' ./user-details-user/user-details-user.component';
import { BackgroundImagesComponent } from './userComponents/background-images/background-images.component';
import { MainManagerComponent } from './managerComponents/main-manager/main-manager.component';
import { ModalEnterManagerComponent } from './managerComponents/modal-enter-manager/modal-enter-manager.component';
import { UsersDataComponent } from './managerComponents/users-data/users-data.component';
import { ScholarshipDataComponent } from './managerComponents/scholarship-data/scholarship-data.component';
import { NewUserComponent } from './managerComponents/new-user/new-user.component';
import { RoleGuardGuard } from './services/guards/role-guard.guard';
import { BasicMilgaDetailsComponent } from './managerComponents/basic-milga-details/basic-milga-details.component';
import { SelectSpesificUsersComponent } from './statistics/select-spesific-users/select-spesific-users.component';
import { GlobalStatisticsComponent } from './statistics/global-statistics/global-statistics.component';
// import { LoansComponent } from './managerComponents/loans/loans.component';
import { ReturnLoansComponent } from './managerComponents/return-loans/return-loans.component';
// import { FilesComponent } from './managerComponents/files/files.component';
import { BarChartComponent } from './statistics/bar-chart/bar-chart.component';
import { LineChartComponent } from './statistics/line-chart/line-chart.component';
import { UploadFilesComponent } from './managerComponents/files/upload-files/upload-files.component';
import { DownloadFilesComponent } from './managerComponents/files/download-files/download-files.component';
//import { ConfirmScholarshipsComponent } from './managerComponents/confirm-scholarships/confirm-scholarships.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'main-manager', component: MainManagerComponent, canActivate: [RoleGuardGuard],runGuardsAndResolvers: 'always',
    data: { role: 'manager' }, children: [
      { path: 'users_data', component: UsersDataComponent },
      { path: 'scholarship_data/:confirm', component: ScholarshipDataComponent,children:[
        
      ] },
      { path: 'basic_milga_details', component: BasicMilgaDetailsComponent },
      { path: 'edit_user_detailes_from_manager/:newUser', component: NewUserComponent,runGuardsAndResolvers: 'always' },
      { path: 'global_statistics', component: GlobalStatisticsComponent,children:[
        {path:"barChart/:number",component:BarChartComponent},
        {path:"lineChart/:number",component:LineChartComponent}
      ] },
      { path: 'select_specific_users_according_params', component: SelectSpesificUsersComponent },
      // { path: 'loans/:ifOpenLoan', component: LoansComponent },
      { path: 'upload', component: UploadFilesComponent },
      { path: 'download', component: DownloadFilesComponent },
      { path: '', component: BackgroundImagesComponent },
    ]
  },
  {
    path: 'modal-enter-manager', component: ModalEnterManagerComponent, canActivate: [RoleGuardGuard],
    data: { role: 'manager' }
  },
  {
    path: 'main-user', component: MainUserComponent, pathMatch: 'prefix', canActivate: [RoleGuardGuard],
    children: [
      { path: 'userDetails-user', component: UserDetailsUserComponent },
      { path: 'scholarship_data', component: ScholarshipDataComponent },
      { path: 'edit_user_detailes/:newUser', component: NewUserComponent },
      { path: '', component: UserDetailsUserComponent },
    ]
  },
  { path: '', component: LoginComponent },
  { path: '*', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
