import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date} </div>
                        <div className="event__time">{event.time}</div>
                        <div className="event__game">{event.game}</div>
                        <div className="event__gamer">{event.gamer}</div>
                        <div className="event__attendees">{event.attendees}</div>
                    </section>
                })
            }
        </article>
    )
}