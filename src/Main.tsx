import React, { useState } from "react";
import { displayDayOfWeek, DayOfWeek, PartOfDay } from "./services/Calendar";
import QuoteManager from "./components/QuoteManager";
import { QuoteService } from "./services/DailyQuotes";
import userDb, { User } from "./services/User";

const capitalize = (letter: string) => letter.toUpperCase()
const capitalizeFirst = (word: string) => capitalize(word[0]) + word.slice(1)

type Props = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    editable: boolean,
    onSetUsername: (username: string) => void,
    makeEditable: (editable: boolean) => void,
}

export default function Main({
    dayOfWeek,
    partOfDay,
    quoteService,
    editable,
    onSetUsername,
    makeEditable,
}: Props) {
    // @ts-ignore
    let user = userDb.get()
    const [name, setName] = useState(user.name)
    const setUsername = (name: string) => {
        makeEditable(false);
        name
            ? onSetUsername(name)
            : (user.name && onSetUsername(user.name))
    }

    let usernameInput = <input
        className="Username Text"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && setUsername(name) }
        onBlur={(e) => setUsername(e.target.value)} />
    
    const [dailyIntention, setIntention] = useState(displayDayOfWeek(dayOfWeek))
    return <main className="App-main">
        <section className="App-spacer"></section>
        <section className="App-spacer"></section>
        <section className="App-greeting Hero">
            Good {partOfDay}, {editable
                ? <span>{usernameInput}</span>
                : <span
                    className='username-span'
                    onClick={(e) => makeEditable(true)}>
                    {user.name ? capitalizeFirst(user.name) : "?"}
                </span>
            }.
        </section>
        <section className="App-reminder Hero">
          It is {dailyIntention}.
        </section>
        <section className="App-spacer"></section>
        <section className="App-quotes">
          <QuoteManager quoteService={quoteService} />
        </section>
        <section className="App-spacer"></section>
    </main>;
}
