import React from 'react';
import { ReactNode, useState, useEffect } from "react";
import { DayOfWeek, displayDayOfWeek } from "../services/Calendar";
import { WeatherService } from "../services/Weather";
import { QuoteService, Quote } from "../services/DailyQuotes";
import Hero from "./Hero";
// import { AnimatedList } from "react-animated-list";

type NoteProps = {
    intent: string,
    children: ReactNode,
    onClick: () => void,
};

type NoteData = { id: number, message: ReactNode, intent: string }

export function Note({ intent, onClick, children }: NoteProps) {
    const [hover, setHover] = useState(false)
    return <div
        className="Note"
        onClick={() => onClick()}
        onMouseOut={() => setHover(false)}
        onMouseOver={() => setHover(true)}>
        <div className="Note-spacer" />
        <div className="Note-content">
            {children}
        </div>
        <div className="Note-intent">
            {hover && intent}
        </div>
    </div>;
};

type NotesProps = {
    dayOfWeek: DayOfWeek,
    weatherService: WeatherService,
    quoteService: QuoteService,
}

export function Notes({ dayOfWeek, weatherService, quoteService }: NotesProps) {
    let inspiring =[
        <>Don't forget your <b>towel</b></>,
        <>Wash your <b>hands</b></>,
        <>You're <b>doing great</b></>,
        <>Onward.</>,
        <>Remember to <b>breathe</b>.</>,
        <>"I am calm."</>,
        <>"I am peace."</>,
    ]

    let pithy = [
        <><b>One step</b> at a time.</>,
        <>Keep <b>moving forward</b>.</>,
        <>Everything is <b>fine</b>.</>,
        <><b>Deep breath</b>.</>,
        <>Keep it up.</>,
        <>You've <b>got this</b>.</>,
        <>Keep <b>going</b>.</>,
        <>Let's <b>execute</b>.</>,
        <><i>Engage</i>.</>,
    ]
    let [pithIndex, setPith] = useState(
        1 + Math.floor(Math.random() * pithy.length - 1)
    )

    let [notes, setNotes] = useState([
        {
            id: -2,
            intent: 'Affirm',
            message: <span data-test-id="day-reminder">
                It is <b>{displayDayOfWeek(dayOfWeek)}</b>.
          </span>
        },
        // {
        //     id: -1,
        //     intent: 'Yep',
        //     message: <span data-test-id="daily-affirmation">
        //         All systems operational.
        //   </span>
        // },
    ]);
    const notesWithout = (testNote: NoteData) => notes.filter(note =>
        note.id !== testNote.id
    )
    // const addNote = (message: ReactNode) => setNotes([
    //     ...notes,
    //     {
    //         id: notes.length+1,
    //         intent: 'Acknowledge',
    //         message: <>{message}</>
    //     }
    // ])


    useEffect(() => {
        async function getPosition() {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject); //, options);
            });
          }

        async function lookupWeather() {
            let position: any = await getPosition();
            // navigator.geolocation.getCurrentPosition(async (pos) => {
            let { coords } = position;
            let theWeather = await weatherService.lookOutside(coords.latitude, coords.longitude)
            let currentConditions = (theWeather.summary);
            return <>Forecast: <b>{currentConditions}</b>.</>;
            // })
            // return <>Forecast: Unknown</>;
        };

        async function lookupQuote() {
            let quotes: Quote[] = await quoteService.quotes();
            let quote: Quote = quotes[0]
            console.log("GOT QUOTE", quote)
            return <><i>{quote.message}</i> -{quote.author}</>;
                // }
            // ])
        }

        async function lookups() {
            let notesToAdd: ReactNode[] = []
            notesToAdd.push(await lookupQuote());
            notesToAdd.push(await lookupWeather());
            setNotes([
                ...notes,
                ...(notesToAdd.map((message, index) => {
                    return {
                        id: notes.length + 1 + index,
                        intent: 'Acknowledge',
                        message: <>{message}</>
                    }
                }))
        ])
            // notesToAdd.each(note => addNote(note));
        }

        lookups();
    }, []) //quoteService, notes, setNotes])

    const loadPith = () => {
        setNotes([...notes, {
            id: notes.length + 1, intent: 'Thank u', message: inspiring[
                1 + Math.floor(Math.random() * inspiring.length - 1)
            ]
        }])
    }

    return <>
        <Hero size='small' className='Notes'>
            <>
                <Note
                    intent='Cycle'
                    onClick={() => setPith((pithIndex + 1) % (pithy.length))}
                >
                    {pithy[pithIndex]}
                </Note>
                {/* <AnimatedList
                    animation={"grow"}
                    initialAnimationDuration={2000}
                > */}
                    {notes.map(note => <Note
                        key={note.id}
                        onClick={() => setNotes(notesWithout(note))}
                        intent={note.intent}>
                        {note.message}
                    </Note>)}
                {/* </AnimatedList> */}

            </>
        </Hero>

        <br /><br />
        <button className="btn btn-primary" onClick={loadPith}>
            Inspire Me!
        </button>
    </>
}

