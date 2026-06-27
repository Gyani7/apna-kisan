export interface WeatherData {
    current: {
        temperature: number;
        humidity: number;
        wind_speed: number;
        precipitation: number;
    };
    hourly: {
        time: string;
        temperature: number;
        condition: string;
    }[];
    daily: {
        date: string;
        max_temp: number;
        min_temp: number;
        condition: string;
    }[];
}