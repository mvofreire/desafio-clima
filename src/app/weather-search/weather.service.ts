import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

const API_KEY = '05ce4f8b2518179b0e3500ec6d2a9cf9'
const CACHE = {}

type ForecastResponse = { list: Array<any> };

@Injectable()
export class WeatherService {

  endpoint = 'http://api.openweathermap.org/data/2.5/weather'
  forecastEndPoint = 'http://api.openweathermap.org/data/2.5/forecast'
  units = 'metric'

  constructor(private http: HttpClient) { }

  loadCurrentWeather(city) {
    if (city in CACHE) {
      return Promise.resolve(CACHE[city])
    }

    if (city in localStorage) {
      return Promise.resolve(JSON.parse(localStorage[city]))
    }

    return new Promise((resolve) => {
      this.http.get(this.endpoint, {
        params: {
          id: city,
          APPID: API_KEY,
          units: 'metric'
        }
      }).subscribe(data => {
        CACHE[city] = data
        localStorage.setItem(city, JSON.stringify(data));
        resolve(data)
      });
    })
  }

  loadForecastWeather(city) {
    const dayName = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
    return new Promise((resolve) => {

      this.http.get(this.forecastEndPoint, {
        params: {
          id: city,
          APPID: API_KEY,
          units: 'metric'
        }
      }).subscribe((data: ForecastResponse) => {
        const { list } = data
        const response = {}
        list.map((item) => {
          const date = new Date(item.dt * 1000)
          const day = date.getDay()
          if (!(day in response)) {
            const { temp, temp_min, temp_max, humidity } = item.main
            const { icon } = item.weather[0]

            response[day] = {
              dayName: `${dayName[day]}`,
              temp,
              humidity,
              temp_min,
              temp_max,
              icon: `http://openweathermap.org/img/w/${icon}.png`
            }
          }
        })
        resolve(response)
      })
    });
  }
}
