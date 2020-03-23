import React, { useState } from 'react';
import './App.scss';
import { DailyQuotes } from './services/DailyQuotes';
import Calendar from './services/Calendar';
import Quotr from "./Quotr";
import userDb from './services/User';

const quoteService = new DailyQuotes(
  process.env.REACT_APP_QOTD_URL || '[[.fill.me.in.with.QOTD_URL.envar.]]'
)


export function App() {
  // const [username, setUsername] = useState("user");
  // let user = { name: process.env.REACT_APP_USER_NAME || 'joseph' }
  const footer = "quotr is made with ❤️ at cypress.io"
  let [dayOfWeek, partOfDay] = Calendar.look(new Date())
  // let username = capitalizeFirst(user.name);
  return (
    <Quotr
      // username={capitalizeFirst(userDb.get().name)}
      partOfDay={partOfDay}
      dayOfWeek={dayOfWeek}
      quoteService={quoteService}
      footer={<i>{footer}</i>}
    />
  );
}

export default App;
