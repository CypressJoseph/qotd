import classnames from 'classnames';
import React from "react";
import { QuoteService } from "./services/DailyQuotes";
import { DayOfWeek, PartOfDay } from "./services/Calendar";
import { WeatherService } from "./services/Weather";
import { Main } from './components/Main';
import Core from './Core';

type QuotrProps = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    weatherService: WeatherService,
    footer: React.ReactElement,
    startExpanded: boolean,
}

function Quotr({ partOfDay, dayOfWeek, quoteService, weatherService, footer, startExpanded }: QuotrProps) {
    return <div className={classnames("Quotr", "App", `App-${partOfDay}`)}>
        <Main>
            <Core
                partOfDay={partOfDay}
                dayOfWeek={dayOfWeek}
                quoteService={quoteService}
                weatherService={weatherService}
                startExpanded={startExpanded}
            />
        </Main>
        <footer className="App-footer">
            {footer}
        </footer>
    </div>
}

export default (Quotr);