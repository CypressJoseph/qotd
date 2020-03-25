import React, { useState, useEffect } from "react";
import { GeolocatedProps } from "react-geolocated";
import { displayDayOfWeek, DayOfWeek, PartOfDay } from "./services/Calendar";
import QuoteManager from "./components/QuoteManager";
import { QuoteService } from "./services/DailyQuotes";
import userDb from "./services/User";
import { WeatherService } from "./services/Weather";

const capitalize = (letter: string) => letter.toUpperCase()
const capitalizeFirst = (word: string) => capitalize(word[0]) + word.slice(1)

type Props = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    weatherService: WeatherService,
    editable: boolean,
    onSetUsername: (username: string) => void,
    makeEditable: (editable: boolean) => void,
}

function Main({
    dayOfWeek,
    partOfDay,
    quoteService,
    weatherService,
    editable,
    onSetUsername,
    makeEditable,
}: Props & GeolocatedProps) {
    let pithy = [
        <>Don't forget your <b>towel</b>.</>,
        <>Wash your <b>hands</b>.</>,
        <>Remember to <b>breathe</b>.</>,
        <><b>One step</b> at a time.</>,
        <><b>Compassion</b> is the way.</>,
        <>Keep <b>moving forward</b>.</>,
        <>You're <b>doing great</b>.</>,
        <>Everything is <b>fine</b>.</>,
        <><b>Deep breath</b>.</>,
        <>I am calm.</>,
        <>I am at peace.</>,
        <>I am focused.</>,
    ]
    let [pithIndex, setPithIndex] = useState(
        1 + Math.floor(Math.random() * pithy.length - 1)
    )
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
    
    const [dailyIntention, _setIntention] = useState(displayDayOfWeek(dayOfWeek))
    const [currentConditions, setConditions] = useState('awesome');

    useEffect(() => {
        async function lookupWeather() {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                let { coords } = pos;
                let theWeather = await weatherService.lookOutside(coords.latitude, coords.longitude)
                setConditions(theWeather.summary)
            })
        };

        lookupWeather();
    }, []);
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
        <section className="App-notes">
          <li className="App-note">
            <p>Today is <b>{dailyIntention}</b>.</p>
          </li>
          <li className="App-note App-note-weather">
            <p>It's currently <b>{currentConditions}</b> outside.</p>
          </li>
          <li className="App-note">
            <p>
                {pithy[pithIndex]}
                </p>
          </li>
        </section>
        <section className="App-spacer"></section>
        <section className="App-quotes">
          <QuoteManager quoteService={quoteService} />
        </section>
        <section className="App-spacer"></section>
    </main>;
}

export default Main;