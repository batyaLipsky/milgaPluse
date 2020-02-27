import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-statistics',
  templateUrl: './global-statistics.component.html',
  styleUrls: ['./global-statistics.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class GlobalStatisticsComponent implements OnInit {
  avgChildren: number;
  avgUsersAge: number;
  prevSelectedStatisticBtn: number;
  public constructor(private chartsService: ChartsService) { }
  ngOnInit() {
    this.chartsService.avgChildrenForUser().subscribe((x: number) => {
      this.avgChildren = Math.floor(x);
    })
    this.chartsService.avgUsersAge().subscribe((x: number) => {
      this.avgUsersAge = x;
    })
  }
}
