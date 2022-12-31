import { Component, OnInit } from '@angular/core';
import { createPopper } from "@popperjs/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Crypto Catalog';
  dateTime: Date;

  /**
   *
   */
  constructor() {
    this.dateTime = new Date();
  }

  ngOnInit(): void {
    setInterval(() =>
    {
      this.dateTime = new Date();
    }, 1000);

  }

}
