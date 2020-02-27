import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { Router, ActivatedRoute, GuardsCheckEnd } from '@angular/router';
import { RoleGuardGuard } from 'src/app/services/guards/role-guard.guard';
import { UserService } from 'src/app/services/user/user-service.service';
import { user } from 'src/app/models/user';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  // @Output() returnNumOfChart= new EventEmitter();
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];
  showChart: boolean = false;
  numMonths: number;
  routerParam_numberChartToLoad: number;
  identity: string;
  prevSelectedStatisticBtn: number;
  public constructor(private chartService: ChartsService, private userService: UserService, private roleGuard: RoleGuardGuard, private router: Router, private route: ActivatedRoute) {
    let charToLoad = JSON.parse(this.route.snapshot.paramMap.get('number'));
    if (charToLoad != this.routerParam_numberChartToLoad) {
      this.routerParam_numberChartToLoad = charToLoad;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  }
  public chartColors: any[] = [
    {
      backgroundColor: "#ffeb3b"
    }, {
      backgroundColor: "#ffeb3b3"
    }];

  ngOnInit() {
    // this.returnNumOfChart.emit(this.routerParam_numberChartToLoad);
    this.changeClass(this.routerParam_numberChartToLoad)
    switch (this.routerParam_numberChartToLoad) {
      case 0: this.getDataAboutScholarship();
        break;
      case 1: this.getDataAboutLoans();
        break;
      case 2: this.getDataAboutMarks();
        break;
      default: alert("mistake!!!")
        break;
    }
  }
  changeClass(numOfBtn) {
    var statisticBtns = document.getElementsByClassName("statisticBtn");
    for (var i = 0; i < statisticBtns.length; i++) {
      statisticBtns[i].classList.remove("selectedStatistic");
    }
    document.getElementsByClassName("statisticBtn")[numOfBtn].classList.add("selectedStatistic");
  }
  getDataAboutScholarship() {
    this.showChart = false;
    this.barChartData = [];
    if (this.numMonths < 1 || this.numMonths > 12 || !this.numMonths) {
      this.numMonths = null;
      return 0;
    }
    this.barChartData.push({ data: [], label: "ממוצע סכומי מלגה לכל האברכים" })
    this.chartService.getScholarshipForAllUsersInXMonthAgo(this.numMonths).subscribe((scholarshipAndMonths: [][]) => {
      if (scholarshipAndMonths) {
        this.chartService.getLastXMonthNames(this.numMonths).subscribe((monthNames: []) => {
          this.barChartLabels = monthNames;
          for (var i = 0; i < this.numMonths; i++) {
            this.barChartData[0].data.push(scholarshipAndMonths["" + this.barChartLabels[i]]);
          }
        }, err => console.log(err));
      }
      if (this.identity != null) {
        if (this.roleGuard.stringContainOnlyNumbers(this.identity)) {
          this.userService.getUserById(this.identity).subscribe((user: user) => {
            if (user) {

              this.barChartData.push({ data: [], label: "הרב " + user.FirstName + " " + user.LastName })
              this.chartService.getScholarshipForUserInXMonthAgo(this.identity, this.numMonths).subscribe((scholarshipAndMonthsForUser: [][]) => {
                for (var i = 0; i < this.numMonths; i++) {
                  this.barChartData[1].data.push(scholarshipAndMonthsForUser["" + this.barChartLabels[i]]);
                }
                this.showChart = true;
              })
            }
            else {
              this.showChart = false;
              alert("לא נמצא אברך בעל מספר זהות " + this.identity);
              this.identity = null;
            }
          })
        }
        else {
        this.identity = null;
          this.showChart = false;
        }
      }
      else
      this.showChart=false;
    }, err => console.log(err));

  }
  getDataAboutLoans() {
   
    this.showChart = false;
    this.barChartData = [];
    if (this.numMonths < 1 || this.numMonths > 12 || !this.numMonths) {
      this.numMonths = null;
      return 0;
    }
    this.barChartData.push({ data: [], label: 'ממוצע סכומי הלואות שהוחזרו לכולל' })
    this.chartService.getLoansForAllUsersInXMonthAgo(this.numMonths).subscribe((loansAndMonths: [][]) => {
     
      if (loansAndMonths) {
        this.chartService.getLastXMonthNames(this.numMonths).subscribe((monthNames: []) => {
         
          this.barChartLabels = monthNames;
          for (var i = 0; i < this.numMonths; i++) {
            this.barChartData[0].data.push(loansAndMonths["" + this.barChartLabels[i]]);
          }
         
          this.showChart = true;
        }, err => console.log(err));
      }
    }, err => console.log(err));
  }

  getDataAboutMarks() {
    this.showChart = false;
    this.barChartData = [];
    if (this.numMonths < 1 || this.numMonths > 12 || !this.numMonths) {
      this.numMonths = null;
      return 0;
    }
    if (this.identity != null) {
      if (this.roleGuard.stringContainOnlyNumbers(this.identity)) {
        this.userService.getUserById(this.identity).subscribe((user: user) => {
         
          if (user) {

            this.barChartData.push({ data: [], label: "ציוני הרב " + user.FirstName + " " + user.LastName })
            this.chartService.getMarksForUserInXMonthAgo(this.identity, this.numMonths).subscribe((scholarshipAndMonthsForUser: [][]) => {
              this.chartService.getLastXMonthNames(this.numMonths).subscribe((monthNames: []) => {
               
                this.barChartLabels = monthNames;
              });
              for (var i = 0; i < this.numMonths; i++) {
               
                this.barChartData[0].data.push(scholarshipAndMonthsForUser["" + this.barChartLabels[i]]);
              }
              this.showChart = true;
            })
          }
          else {
            this.identity = null;
            this.showChart = false;
            alert("לא נמצא אברך בעל מספר זהות " + this.identity);
          }
        })
      }
      else
        this.identity = null
    }

  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }


}
