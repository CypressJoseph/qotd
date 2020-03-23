import axios from 'axios';

export type Quote = { message: string, author: string }
export interface QuoteService { quotes(): Promise<Quote[]> }

export class DailyQuotes implements QuoteService {
    constructor(private url: string) {}
    async quotes(): Promise<Quote[]> {
        const response = await axios.get(this.url)
        const data = response.data;
        let rawQuotes = data['contents']['quotes']
        return rawQuotes.map((it: any) => { return {
            message: it.quote,
            author: it.author
        }})
    }
}