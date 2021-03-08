import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  @ViewChild('main') main: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  ngOnInit(): void {

  }

}
