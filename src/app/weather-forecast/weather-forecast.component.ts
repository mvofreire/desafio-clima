import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from '../types/Forecast'

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  @Input() data: Array<Forecast>

  constructor() { }

  ngOnInit() {

  }

}
