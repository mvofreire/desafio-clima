declare var require: any
import { Chart } from 'angular-highcharts'
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service'
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

  isFetching = false;
  isFavorite = false;
  local = {}
  temperatura = {}
  situacao = {}
  forecast = []

  constructor(private service: WeatherService) {

  }

  ngOnInit() {
    this.model.city = this.service.getFavoriteCity() || 6323074
    this.loadDataFromCity(this.model.city)
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

  togglefavorite(city) {
    this.service.toggleFavorite(city)
    this.isFavorite = this.service.isFavorite(city)
  }

  onSubmit() {
    // if (this.model.isValid()) {
    this.loadDataFromCity(this.model.city)
    // }else{ }
  }

  private loadCurrentWeather(city: number) {
    return this.service.loadCurrentWeather(city).then(data => {
      const { local, temperatura, situacao } = data

      this.isFavorite = this.service.isFavorite(city)
      this.local = local
      this.temperatura = temperatura
      this.situacao = situacao
    })
  }

  private loadCurrentForecast(city: number) {
    return this.service.loadForecastWeather(city).then(forecast => {
      this.forecast = Object.keys(forecast).map(key => forecast[key])
    })
  }

  private loadDataFromCity(city: number) {
    this.isFetching = true
    Promise.all([
      this.loadCurrentWeather(city),
      this.loadCurrentForecast(city)
    ]).then(results => {
      this.submitted = true;
      this.isFetching = false
    }).catch(err => {
      console.log(err);
      this.error = 'Ocorreu algum erro ao realizar a requisição'
    })
  }
}
