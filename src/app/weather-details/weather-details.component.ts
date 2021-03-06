import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  data = {}

  @Input() temperatura: Object
  @Input() local: Object

  constructor() { }

  ngOnInit() {
    this.data = {
      ...this.temperatura,
      ...this.local
    }
  }

}
