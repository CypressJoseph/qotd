import './Quote.scss'
import React, { Component } from 'react';
import QuoteMeUpButton from './QuoteMeUpButton';
import { Quote, QuoteService } from '../services/DailyQuotes';

type Props = { quoteService: QuoteService }

type State = {
  status: 'unclicked' | 'loading' | 'displaying'
  quote: Quote
  quotes: Quote[]
  index: number
}

let nullQuote: Quote = { message: 'press the button', author: 'no one' }
let initialState: State = { status: 'unclicked', quote: nullQuote, index: -1, quotes: [] }

function QuoteBox({ quote }: { quote: Quote }) {
  return <div className='Quote' role='heading'>
    <span className='Quote-message'>
      "{quote.message}"
    </span>
    &nbsp;
    <span className='Quote-author'>
      -{quote.author}
    </span>
  </div>
}

export default class QuoteManager extends Component<Props, State> {
  state: State = initialState
  async handleClick() {
    this.setState({ status: 'loading' });
    let quotes: Quote[] = await this.props.quoteService.quotes();
    let index = 0;
    let quote = quotes[0];
    this.setState({
      status: 'displaying',
      quote,
      quotes,
      index
    });
  }
  
  render() {
    let quoteMeUp = this.state.status === 'displaying'
      ? <QuoteBox quote={this.state.quote} />
      : <QuoteMeUpButton
        onInspire={() => this.handleClick()}
        disabled={this.state.status !== 'unclicked'}
      >
        Inspire Me
      </QuoteMeUpButton>;
    return <div className='QuoteManager'>
      {quoteMeUp}
    </div>;
  }
}
