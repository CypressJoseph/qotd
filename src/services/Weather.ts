import axios from 'axios';
export type Weather = { summary: string }
export interface WeatherService {
    lookOutside(lat: number, lon: number): Promise<Weather>
}

export class CurrentConditions implements WeatherService {
    constructor(
        private baseUrl: string,
        // private apiKey: string
    ) { }

    async lookOutside(lat: number, lon: number): Promise<Weather> {
        const response = await this.forecast(lat, lon)
        const data = response.data;
        let { summary } = data;
        return { summary };
    }

    private async forecast(lat: number, lon: number): Promise<any> {
        console.log("FORECAST FOR " + lat + " " + lon)
        return await axios.get(
            `${this.baseUrl}/weather/forecast?geo=${lat},${lon}`,
        )
    }
}