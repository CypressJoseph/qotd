import React from "react";
import { displayDayOfWeek, DayOfWeek, PartOfDay } from "./services/Calendar";
import QuoteManager from "./components/QuoteManager";
import { QuoteService } from "./services/DailyQuotes";
import userDb, { User } from "./services/User";

const capitalize = (letter: string) => letter.toUpperCase()
const capitalizeFirst = (word: string) => capitalize(word[0]) + word.slice(1)

type Props = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    // username: string,
    quoteService: QuoteService,
    editable: boolean,
    onSetUsername: Function,
    makeEditable: Function,
}

export default function Main({
    dayOfWeek,
    partOfDay,
    quoteService,
    editable,
    onSetUsername,
    makeEditable,
}: Props) {
    return <main className="App-main">
        <section className="App-spacer"></section>
        <section className="App-spacer"></section>
        <section className="App-greeting Hero">
            Good {partOfDay}, {editable
                ? <span>
                    <input
                    className="Username Text"
                    type="text"
                    onBlur={(e)=>{
                        onSetUsername(e.target.value)
                    }}></input>
                </span>
                : <span
                className='username-span'
                onClick={(e)=>makeEditable()}>
                    {capitalizeFirst(userDb.get().name)}
                </span>
            }.
        </section>
        <section className="App-reminder Hero">
              It is {displayDayOfWeek(dayOfWeek)}.
        </section>
        <section className="App-spacer"></section>
        <section className="App-quotes">
            <QuoteManager quoteService={quoteService} />
        </section>
        <section className="App-spacer"></section>
    </main>;
}
