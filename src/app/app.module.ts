import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MenuToolbarComponent } from './menu-toolbar/menu-toolbar.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherWhatIDoComponent } from './weather-what-i-do/weather-what-i-do.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({

  imports: [
    BrowserModule,
    CoreModule,
    SharedModule
  ],
  entryComponents: [AppComponent],
  declarations: [AppComponent, MenuToolbarComponent, WeatherSearchComponent, WeatherChartComponent, WeatherForecastComponent, WeatherDetailsComponent, WeatherWhatIDoComponent, LoadingComponent],
  bootstrap: [AppComponent],
  providers: [],
})

export class AppModule { }
