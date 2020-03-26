import classnames from 'classnames';
import React, { useState, useCallback, useEffect } from "react";
import { QuoteService } from "./services/DailyQuotes";
import { DayOfWeek, PartOfDay, displayDayOfWeek } from "./services/Calendar";
import { Main} from "./Main";
import userDb, { User } from "./services/User";
import { WeatherService } from "./services/Weather";
import { Username } from "./Username";
import Hero from "./Hero";
import QuoteManager from "./components/QuoteManager";
import { useSpring, animated } from "react-spring";

type Props = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    weatherService: WeatherService,
    footer: React.ReactElement,
}


function Quotr({ partOfDay, dayOfWeek, quoteService, weatherService, footer }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [isExpanded, unfold] = useState(false)

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        if (key === 'Enter') { unfold(true); }
        if (keyCode === 27) { unfold(false); }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    let [user, setUser] = useState(userDb.get() || new User('unknown'))
    const updateUser = (user: User) => {
        setUser(user);
        userDb.set(user);
    }

   let username = <Username
                        user={user}
                        onSetUsername={(username: string) => updateUser(new User(username))}
                        editable={showInput}
                        makeEditable={setShowInput}
                    />

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
    let [pithIndex] = useState(
        1 + Math.floor(Math.random() * pithy.length - 1)
    )

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
    }, [ weatherService ]);
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500}
      })
  
    return (<div className={classnames("Quotr", "App", `App-${partOfDay}`)}>
        <Main>
            <>
                <Hero size={isExpanded ? 'medium' : 'large'}>
                    <animated.span style={fadeIn} className="App-greeting">
                        Good {partOfDay}, {username}.
                    </animated.span>
                </Hero>
                {isExpanded && <>
                    <Hero size='small' className='Notes'>
                        <>
                          <span data-test-id="day-reminder">It is <b>{displayDayOfWeek(dayOfWeek)}</b>.</span>
                          <span className='App-note-weather'>It's currently <b>{currentConditions}</b> outside.</span>
                          <span>{pithy[pithIndex]}</span>
                        </>
                    </Hero>
                    <QuoteManager quoteService={quoteService} />
                </>}
            </>
        </Main>
        <footer className="App-footer">{footer}</footer>
    </div>);
}

export default (Quotr);