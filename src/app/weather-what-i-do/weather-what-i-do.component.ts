import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Weather } from '../types/Weather'
const listCodes = require('./list-codes.json')

@Component({
  selector: 'app-weather-what-i-do',
  templateUrl: './weather-what-i-do.component.html',
  styleUrls: ['./weather-what-i-do.component.css']
})
export class WeatherWhatIDoComponent implements OnInit, OnChanges {
  message = ''
  weather: Weather = null
  @Input() situacao: any

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.weather = changes.situacao.currentValue;
      this.defineWhatToDo()
  }

  defineWhatToDo() {
    this.message = listCodes[this.weather.id]
  }
}
