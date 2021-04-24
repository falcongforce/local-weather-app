import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, filter, tap } from 'rxjs/operators'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.required, Validators.minLength(2)])

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => this.search.valid),
        tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe()
  }

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }

  getErrorMessage() {
    if (this.search.hasError('required')) {
      return 'This field is required'
    } else if (this.search.hasError('minLength')) {
      return 'Type more than one character to search'
    }
    return ''
  }
}
