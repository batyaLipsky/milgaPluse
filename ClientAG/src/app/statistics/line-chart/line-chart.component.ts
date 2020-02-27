import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { user } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { RoleGuardGuard } from 'src/app/services/guards/role-guard.guard';
import { UserService } from 'src/app/services/user/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnInit {
  user: user;
  numMonthsAgo: number;
  identityVal: string;
  routerParam_numberChartToLoad: number;
  showChart: boolean = false;
  lineChartData: ChartDataSets[] = [{ data: [], label: 'ממוצע כל האברכים' }, { data: [], label: '' }];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },

      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'y-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'מספר התמדה מינימלי '
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      // backgroundColor: 'rgba(148,159,177,0.2)',
      // fontFamily:'inherit',
      backgroundColor: '#ffeb3b',
      borderColor: '#ffc107',
      pointBackgroundColor: '#ffeb3b69',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public constructor(private chartsService: ChartsService, private rolegaurdGuard: RoleGuardGuard, private userService: UserService, private route: ActivatedRoute, private router: Router) {
   
    let charToLoad = JSON.parse(this.route.snapshot.paramMap.get('number'));
    if (charToLoad != this.routerParam_numberChartToLoad) {
      this.routerParam_numberChartToLoad = charToLoad;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  }

  ngOnInit() {
    this.changeClass(this.routerParam_numberChartToLoad)
    this.openChart();
  }
  changeClass(numOfBtn) {
    var statisticBtns = document.getElementsByClassName("statisticBtn");
    for (var i = 0; i < statisticBtns.length; i++) {
      statisticBtns[i].classList.remove("selectedStatistic");
    }
    document.getElementsByClassName("statisticBtn")[numOfBtn].classList.add("selectedStatistic");
  }
  openChart() {
    switch (this.routerParam_numberChartToLoad) {
      case 3: this.searchMonthNamesAndAtmadaForAllUsers();
        break;
      case 4: this.searchMonthNamesAndSmiratSdarimForAllUsers();
        break;
      // case 3: this.searchMonthNamesAndMarksForAllUsers();
      //   break;
      default: alert("mistake!!")
        break;
    }
  }
  dataPerMonth: any;
  // monthErr:boolean=false;
  searchMonthNamesAndAtmadaForAllUsers() {//atmada
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.showChart = false;
    if (this.numMonthsAgo > 12 || this.numMonthsAgo < 1) {
      this.numMonthsAgo = null;
      return 0;
    }
    if (this.numMonthsAgo > 0 && this.numMonthsAgo < 13 && this.identityVal.length == 9) {
      this.chartsService.getAtmadaForAllUsersInXMonthAgo(this.numMonthsAgo).subscribe((x: [][]) => {
        if (x) {
          this.dataPerMonth = x;
          this.getLastXMonthNames();
          if (user)
            this.userAtmada();
        }
      }, err =>
        console.log(err)
      );
    }
  }
  userAtmada() {
    var result = this.getLastXMonthNames();
    if (result)
      this.chartsService.getAtmadaForUserInXMonthAgo(this.identityVal, this.numMonthsAgo).subscribe((x: [][]) => {
        for (var i = 0; i < this.numMonthsAgo; i++) {
          this.lineChartData[1].data.push(x["" + this.lineChartLabels[i]]);
          this.showChart = true;
        }
      }, err => console.log(err));

  }
  searchMonthNamesAndSmiratSdarimForAllUsers() {//shmirat sdarim
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.showChart = false;
    if (this.numMonthsAgo > 12 || this.numMonthsAgo < 1) {
      this.numMonthsAgo = null;
      return 0;
    }
    if (this.numMonthsAgo > 0 && this.numMonthsAgo < 13 && this.identityVal.length == 9) {
      this.chartsService.getShmiratSdarimForAllUsersInXMonthAgo(this.numMonthsAgo).subscribe((x: [][]) => {
        if (x) {
          this.dataPerMonth = x;
          this.getLastXMonthNames();
          if (user)
            this.chartsService.getShmiratSdarimForUserInXMonthAgo(this.identityVal, this.numMonthsAgo).subscribe((y: [][]) => {
              for (var i = 0; i < this.numMonthsAgo; i++) {
                this.lineChartData[1].data.push(y["" + this.lineChartLabels[i]]);
              }
              this.showChart = true;
            }, err => console.log(err));
        }
      }, err => console.log(err));
    }
  }

  getLastXMonthNames() {
   
    if (this.numMonthsAgo < 13 && this.numMonthsAgo > 0) {
      if (!this.dataPerMonth) {
        if (this.routerParam_numberChartToLoad == 3)
          this.searchMonthNamesAndAtmadaForAllUsers();
        else
          this.searchMonthNamesAndSmiratSdarimForAllUsers();
      }
      this.chartsService.getLastXMonthNames(this.numMonthsAgo).subscribe((y: []) => {
       
        this.lineChartLabels = y;
        for (var i = 0; i < this.numMonthsAgo; i++) {
          this.lineChartData[0].data.push(this.dataPerMonth["" + this.lineChartLabels[i]]);
        }
        // this.showChart=true;
      }, err => console.log(err));
    }
    return 1;
  }
  getUserById() {
   
    if (this.identityVal == undefined || this.identityVal.length < 9 || this.identityVal.length > 9)
      return 0;
    else
      if (!this.rolegaurdGuard.stringContainOnlyNumbers(this.identityVal)) {
        this.identityVal = null;
        return 0;
      }
    this.userService.getUserById(this.identityVal).subscribe((x: user) => {
      if (!x) {
        this.showChart = false;
        alert("לא נמצא אברך בעל מספר זהות " + this.identityVal + " במערכת.");
        this.identityVal = null;
        return 0;
      }
      else {
       
        this.user = x;
        this.showChart = false;
        this.lineChartData[1].label = 'הרב ' + this.user.LastName;
        switch (this.routerParam_numberChartToLoad) {
          case 3: this.searchMonthNamesAndAtmadaForAllUsers()
            break;
          case 4: this.searchMonthNamesAndSmiratSdarimForAllUsers();
            break;
        }
      }
    })
  }


  // // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
}