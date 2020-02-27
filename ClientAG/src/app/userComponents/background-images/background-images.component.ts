import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background-images',
  templateUrl: './background-images.component.html',
  styleUrls: ['./background-images.component.scss']
})
export class BackgroundImagesComponent implements OnInit {
  slideIndex: number = 0;
  public constructor() { }

  ngOnInit() {

  }
}