import './Quote.scss'
import React, { Component } from 'react';
import QuoteMeUpButton from './QuoteMeUpButton';
import QuoteService, { Quote } from '../services/DailyQuotes';

type Props = {
    quoteService: QuoteService
}

type State = {
  status: 'unclicked' | 'loading' | 'displaying'
  quote: Quote
}

let nullQuote: Quote = { message: 'press the button', author: 'no one' }
let initialState: State = { status: 'unclicked', quote: nullQuote }

function QuoteBox(quote: Quote) {
  return <div className='Quote' role='heading'>
    <span className='Quote-message'>
      "{quote.message}"
        </span>
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
    let quote = quotes[0]
    this.setState({
      status: 'displaying',
      quote
    });
  }
  render() {
    let quoteMeUp = this.state.status === 'displaying'
      ? <QuoteBox {...this.state.quote} />
      : <QuoteMeUpButton
        onClick={() => this.handleClick()}
        disabled={this.state.status !== 'unclicked'}
      >
        Inspire Me
      </QuoteMeUpButton>;
    return <div className='QuoteManager'>
      {quoteMeUp}
    </div>;
  }
}
