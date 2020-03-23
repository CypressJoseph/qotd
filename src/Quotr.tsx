import React, { useState } from "react";
import { QuoteService } from "./services/DailyQuotes";
import { DayOfWeek, PartOfDay } from "./services/Calendar";
import { Header } from "./Header";
import Main from "./Main";
import userDb, { User } from "./services/User";

type Props = {
    // username: string,
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    footer: React.ReactElement,
}

function Quotr({ partOfDay, dayOfWeek, quoteService, footer }: Props) {
    const [showInput, setShowInput] = useState(false);
    return (<div className="Quotr App">
        <Header onClick={() => {}} />
        <Main
            dayOfWeek={dayOfWeek}
            quoteService={quoteService}
            editable={showInput}
            makeEditable={()=>setShowInput(true)}
            partOfDay={partOfDay}
            onSetUsername={(username: string) => {
                setShowInput(false)
                userDb.set(new User(username))
            }}
        />
        <footer className="App-footer">
            {footer}
        </footer>
    </div>);
}

export default Quotr;