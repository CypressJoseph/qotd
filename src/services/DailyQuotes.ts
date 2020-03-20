import axios from 'axios';

export type Quote = { message: string, author: string }
export interface QuoteService { quotes(): Promise<Quote[]> }

export default class DailyQuotes implements QuoteService {
    constructor(private url: string) {}
    async quotes(): Promise<Quote[]> {
        const response = await axios.get(this.url)
        const data = response.data;
        return data['contents']['quotes'].map((it: any) => { return {
            message: it.quote,
            author: it.author
        }})
    }
}