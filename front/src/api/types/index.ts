export interface ProfileState {
  name: string;
  email: string;
  location: number;
  intro?: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  passwordC: string;
  name: string;
  location: number;
}

export interface TempType {
  day: number;
  min: number;
  max: number;
  eve: number;
}

export interface WeatherType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyWeatherState {
  clouds?: number;
  dt?: number;
  humidity?: number;
  temp: TempType;
  weather: WeatherType[];
}

export interface HourlyWeaterState {
  clouds: number;
  dt: number;
  humidity: number;
  temp: number;
}

export interface WeatherState {
  daily: DailyWeatherState[];
  hourly: HourlyWeaterState[];
  lat: number;
  lon: number;
}

export interface CoronaState {
  stateDt: number;
  stateTime: string;
  decideCnt: number;
  deathCnt: number;
}
