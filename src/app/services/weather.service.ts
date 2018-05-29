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

    return new Promise((resolve) => {
      this.http.get(this.endpoint, {
        params: {
          id: city,
          APPID: API_KEY,
          units: 'metric'
        }
      }).subscribe((data: any) => {
        CACHE[city] = data
        const { name, sys, main, weather } = data
        console.log({ name, sys, main, weather });

        const local = {
          id: city,
          name: name,
          country: sys.country,
          sunset: new Date(sys.sunset * 1000),
          sunrise: new Date(sys.sunrise * 1000)
        }

        const temperatura = {
          ...main,
          temp: main.temp.toFixed(0)
        }

        const situacao = {
          ...weather[0] || {}
        }

        resolve({ local, temperatura, situacao })
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
            const { icon } = item.weather[0]

            response[day] = {
              ...item.main,
              temp_max: parseInt(item.main.temp_max.toFixed(0)),
              temp_min: parseInt(item.main.temp_min.toFixed(0)),
              temp: parseInt(item.main.temp.toFixed(0)),
              dayName: `${dayName[day]}`,
              icon
            }
          }
        })
        console.log(response);

        resolve(response)
      })
    });
  }

  getFavoriteCity() {
    return ('favorite' in localStorage) ? JSON.parse(localStorage['favorite']) : null
  }

  toggleFavorite(city) {
    return localStorage.setItem("favorite", this.isFavorite(city) ? null : city)
  }

  isFavorite(city) {
    return ('favorite' in localStorage) && (parseInt(localStorage['favorite']) === parseInt(city))
  }
}
