import React from 'react';
import './App.scss';
import QuoteManager from './components/QuoteManager';
import DailyQuotes from './services/DailyQuotes';
import Calendar, { displayDayOfWeek } from './services/Calendar';

const capitalize = (letter: string) => letter.toUpperCase()
const capitalizeFirst = (word: string) => capitalize(word[0]) + word.slice(1)

const quoteService = new DailyQuotes(
  process.env.REACT_APP_QOTD_URL || '[[.fill.me.in.with.QOTD_URL.envar.]]'
)

export function App() {
  let user = { name: process.env.REACT_APP_USER_NAME||'joseph' }
  const footer = "quotr is made with ❤️ at cypress.io"
  let [dayOfWeek, timeOfDay] = Calendar.look(new Date())
  let greeting = 
    `Good ${timeOfDay}, ${capitalizeFirst(user.name)}.`
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          quotr
        </div>
        <div className="App-menu">
          <span>customize</span>
          &nbsp;
          |
          &nbsp;
          <span>extend</span>
          &nbsp;
          |
          &nbsp;
          <span>share</span>
          &nbsp;
          |
          &nbsp;
          <span>
            <a href='https://github.com/CypressJoseph/qotd'>read the code</a>
          </span>
          &nbsp;
          |
          &nbsp;
          <span>about</span>
          &nbsp;
          |
          &nbsp;
          <span>cypress dashboard</span>
        </div>
      </header>
      <main className="App-main">
        <section className="App-spacer"></section>
        <section className="App-spacer"></section>
        <section className="App-greeting">
          {greeting}
          <br/>
          It is {displayDayOfWeek(dayOfWeek)}.
        </section>
        <section className="App-spacer"></section>
        <section className="App-quotes">
        <QuoteManager quoteService={quoteService} />
        </section>
        <section className="App-spacer"></section>
      </main>
      <footer className="App-footer">
        {footer}
      </footer>
    </div>
  );
}

export default App;
