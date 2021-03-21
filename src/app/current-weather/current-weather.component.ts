import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // add code here to access the or fetch data or uses HTTP services
    this.weatherService
      .getCurrentWeather('Reading, PA', 'US')
      .subscribe((data) => (this.current = data))
  }
}
