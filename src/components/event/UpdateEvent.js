


/*
-A react route that renders a form

-The form should be filled out with the existing data

-When changes are made in the form the state of the component updates

-When the submit button is clicked, it should make a PUT request to the 
correct resource with the updated data in the body

-After the fetch call is resolved, the page should route to the game/event’s detail page
*/

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllGames} from "../../managers/GameManager"

export const UpdateEvent = () => {
    const {eventId} = useParams()
    const navigate = useNavigate()
    const [games, setGame] = useState([])
    const [event, setEvent] = useState({})
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "", 
        game: 0,
        organizer: 0,
    })

    useEffect (()=> {
        getEventById(eventId).then((res)=> {
            setEvent(res)
            setCurrentEvent({
                ...currentEvent,
                description: res?.description,
                date: res?.date,
                time: res?.time,
                game: parseInt(res?.game?.id)
            })
        })
    }, [eventId, currentEvent])

    useEffect(()=> {
        getAllGames().then((data)=> setGames(data))
    }, [])

    const changeEventState = (evt) => {
        const {name, value} = evt.target
        setCurrentEvent({...currentEvent, [evt.target.name]: value})
    }

return(
    <form className="eventForm">
        <h2 className="eventForm_description">Update an Event</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description"> Description </label>
                <input
                    type="text"
                    name="description"
                    required
                    autoFocus
                    className="form-control"
                    value={currentEvent.description}
                    placeholder={event.description}
                    onChange={changeEventState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="date"> Date </label>
                <input
                    type="text"
                    name="date"
                    required
                    autoFocus
                    className="form-control"
                    value={currentEvent.date}
                    placeholder={event.date}
                    onChange={changeEventState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="time"> Time </label>
                <input
                    type="time"
                    name="time"
                    required
                    autoFocus
                    className="form-control"
                    value={currentEvent.time}
                    placeholder={event.time}
                    onChange={changeEventState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="title"> Title </label>
                <select name="game" pnChange={changeEventState}>
                    <option defaultValue={event?.game?.id}> {event?.game?.title}</option>
                    {games.map((game)=>(
                        <option key={game.id} value={game.id}>
                            {game.title}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>

        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const event = {
                    description: currentEvent.description,
                    date: currentEvent.date,
                    time: currentEvent.time,
                    game: parseInt(currentEvent.game)
                }

                // Send POST request to your API
                UpdateEvent(event, eventId)
                    .then(() => navigate("/events"))
            }}
            className="btn btn-primary">Update Event
            </button>
    </form>
)
}