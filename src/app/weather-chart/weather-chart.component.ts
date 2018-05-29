import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts'
import { Forecast } from '../types/Forecast'

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css']
})
export class WeatherChartComponent implements OnInit, OnChanges {

  @Input() data: Array<Forecast>
  chart = {}

  constructor() {
  }

  ngOnInit() {
    this.setChartData()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setChartData()
  }

  setChartData() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: null
      },
      subtitle: {
        text: 'Source: Openweathermap.org'
      },
      xAxis: {
        categories: this.data.map(item => item.dayName)
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Temperatura 1',
        data: this.data.map(item => item.temp_max)
      }, {
        name: 'Temperatura 2',
        data: this.data.map(item => item.temp_min)
      }]
    })
  }
}
