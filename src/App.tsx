import React from 'react';
import './App.css';
import QuoteMeUpButton from './features/QuoteMeUpButton';

type State = {
  quoteStatus: 'unclicked' | 'loading' | 'displaying'
}
class QuoteManager extends React.Component<{}, State> {
  state: State = { quoteStatus: 'unclicked' }
  handleClick() { this.setState({ quoteStatus: 'displaying' }) }

  render() {
    let quote = this.state.quoteStatus === 'displaying'
              ? <div className='the-quote-itself'>"My quote here"</div>
              : ""
    return <>
      <QuoteMeUpButton onClick={() => this.handleClick()} />
      <p>Quotes</p>
      {quote}
    </>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        QOTD Serivce
      </header>
      <main className="App-main">
        <QuoteManager />
      </main>
      <footer className="App-footer">
      </footer>
    </div>
  );
}

export default App;
