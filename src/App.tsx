import React from 'react';
import './App.scss';
import { DailyQuotes } from './services/DailyQuotes';
import Calendar from './services/Calendar';
import Quotr from "./Quotr";
import { CurrentConditions } from './services/Weather';

const quoteService = new DailyQuotes(
  process.env.REACT_APP_QOTD_URL || '[[fill in with REACT_APP_QOTD_URL]]'
)

const weatherService = new CurrentConditions(
  process.env.REACT_APP_BACKEND_URL || '[[ fill in with REACT_APP_BACKEND_URL ]]',
)

export function App() {
  const footer = "quotr is made with ❤️ at cypress.io"
  let [dayOfWeek, partOfDay] = Calendar.look(new Date())

  return (
    <Quotr
      partOfDay={partOfDay}
      dayOfWeek={dayOfWeek}
      quoteService={quoteService}
      weatherService={weatherService}
      footer={<i>{footer}</i>}
    />
  );
}

export default App;
