declare var require: any
import { Chart } from 'angular-highcharts'
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WeatherService } from './weather.service'
import { Weather } from './weather'

const cidades = require('../../data/CidadesCobertas.json')
const estados = require('../../data/Estados.json')
type State = { Nome: string };

@Component({
  selector: 'app-weather-search',
  providers: [WeatherService],
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  error = null
  model = new Weather()
  filteredCities: Observable<string[]>;
  myControl: FormControl = new FormControl();


  cities = cidades;
  states = estados;
  submitted = false;

  isFavorite = false;
  local = {}
  temperatura = {}
  situacao = {}
  forecast = []

  constructor(private service: WeatherService) { }

  ngOnInit() {
    this.filteredCities = this.myControl.valueChanges.pipe(startWith(''), map(val => this.filter(val)));
  }

  filter(val: any): string[] {
    if (this.model.state === null)
      return []

    const name = val.Nome ? val.Nome : val;
    return this.cities.filter(city => {
      const cityNameEquals = city.Nome.toLowerCase().includes(name.toLowerCase())
      const stateEquals = city.Estado === this.model.state
      return (cityNameEquals && stateEquals)
    });
  }

  onSelectCity(city) {
    this.model.city = city.ID
  }

  displayCityName(val: State) {
    return val ? val.Nome : val;
  }

  changeCity() {
    this.submitted = false;
  }

  togglefavorite(id) {
    console.log(id);
  }

  onSubmit() {
    // if (this.model.isValid()) {

    this.error = null

    const requests = []

    requests.push(this.service.loadCurrentWeather(this.model.city || 3467747))
    requests.push(this.service.loadForecastWeather(this.model.city || 3467747))

    Promise.all(requests).then(results => {
      const data = results[0];
      this.local = {
        id: this.model.city,
        name: data.name,
        country: data.sys.country,
        sunset: new Date(data.sys.sunset * 1000),
        sunrise: new Date(data.sys.sunrise * 1000)
      }

      this.temperatura = {
        ...data.main,
        temp: data.main.temp.toFixed(0)
      }

      this.situacao = {
        ...data.weather[0],
        icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      }

      //FORECAST
      const forecast = results[1]
      this.forecast = Object.keys(forecast).map(key => forecast[key])

      this.submitted = true;
    }).catch(err => {
      console.log(err);
      this.error = 'Ocorreu algum erro ao realizar a requisição'
    })
  }
}
