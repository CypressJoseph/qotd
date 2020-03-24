import React, { useState } from "react";
import { QuoteService } from "./services/DailyQuotes";
import { DayOfWeek, PartOfDay } from "./services/Calendar";
import { Header } from "./Header";
import Main from "./Main";
import userDb, { User } from "./services/User";
import { WeatherService } from "./services/Weather";

type Props = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    weatherService: WeatherService,
    footer: React.ReactElement,
}

function Quotr({ partOfDay, dayOfWeek, quoteService, weatherService, footer }: Props) {
    const [showInput, setShowInput] = useState(false);
    return (<div className="Quotr App">
        <Header onClick={() => {}} />
        <Main
            dayOfWeek={dayOfWeek}
            quoteService={quoteService}
            weatherService={weatherService}
            editable={showInput}
            makeEditable={(b: boolean) => setShowInput(b)}
            partOfDay={partOfDay}
            onSetUsername={(username: string) => userDb.set(new User(username))}
        />
        <footer className="App-footer">
            {footer}
        </footer>
    </div>);
}

export default Quotr;