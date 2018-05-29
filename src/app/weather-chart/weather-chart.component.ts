import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts'

type Forecast = {
  dayName: string,
  humidity: number,
  icon: string,
  temp: number,
  temp_min: number,
  temp_max: number
}

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css']
})
export class WeatherChartComponent implements OnInit {

  @Input() data: Array<Forecast>
  chart = {}

  constructor() {
  }

  ngOnInit() {
    console.log(this.data);

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
        data: this.data.map(item => item.temp)
      }]
    })
  }
}
