import { BehaviorSubject, Observable, of } from 'rxjs'

import { Coordinates, ICurrentWeather } from '../interfaces'
import { IWeatherService } from './weather.service'

export const fakeWeather: ICurrentWeather = {
  city: 'Bethesda',
  country: 'US',
  date: 1485789600,
  image: '',
  temperature: 280.32,
  description: 'light intensity drizzle',
}
export class WeatherServiceFake implements IWeatherService {
  readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })

  updateCurrentWeather(search: string, country?: string): void {
    this.getCurrentWeather(search, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    )
  }
  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather)
  }
  public getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    return of(fakeWeather)
  }
}
