import React from 'react';
import { useSpring, animated } from "react-spring";
import { DayOfWeek, PartOfDay } from "./services/Calendar";
import { QuoteService } from "./services/DailyQuotes";
import { WeatherService } from "./services/Weather";
import { useState, useCallback, useEffect } from "react";
import userDb, { User } from "./services/User";
import { Username } from "./Username";
import Hero from "./components/Hero";
import './components/Quote.scss'
import { Notes } from './components/Notes';

type CoreProps = {
    dayOfWeek: DayOfWeek,
    partOfDay: PartOfDay,
    quoteService: QuoteService,
    weatherService: WeatherService,
    startExpanded: boolean,
}

function Core({ partOfDay, dayOfWeek, quoteService, weatherService, startExpanded }: CoreProps) {
    const [showInput, setShowInput] = useState(false);
    const [isExpanded, unfold] = useState(startExpanded);

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        if (key === 'Enter') {
            if (isExpanded) {
                unfold(true);
            } else {
                // todo createNote();
            }
        }
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

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1500}
      })

    const notes = <Notes
        weatherService={weatherService}
        quoteService={quoteService}
        dayOfWeek={dayOfWeek}
    />;

    return (<>
        <Hero size={isExpanded ? 'medium' : 'large'}>
            <animated.span style={fadeIn} className="App-greeting">
                Good {partOfDay},{username}.
            </animated.span>
        </Hero>
        {isExpanded && notes}
    </>);
}

export default Core;