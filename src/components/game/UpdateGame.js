

/*
A react route that renders a form //? Imported to AppViews
The form should be filled out with the existing data
When changes are made in the form the state of the component updates
When the submit button is clicked, it should make a PUT request to the correct resource with the updated data in the body
After the fetch call is resolved, the page should route to the game/event’s detail page
*/


import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGames, getGameTypes} from "../../managers/GameManager"

export const UpdateGame = () => {

const {gameId} = useParams()
const navigate = useNavigate()
const [gameTypes, setGameTypes] = useState([])
const [game, setGame] = useState([])
const [currentGame, setCurrentGame] = useState({
    title:"",
    maker: "",
    number_of_players: "",
    skill_level: 0,
    game_types: 0
})

useEffect (()=> {
    getGameTypes(gameId).then((res)=> {
        setGame(res)
        setCurrentGame({
            ...currentGame,
            title: res?.title,
            maker: res?.maker,
            number_of_players: res?.number_of_players,
            skill_level: res?.skill_level,
            game_type: parseInt(res?.game_type?.id)
        })
    })
}, [gameId, currentGame])

useEffect(()=> {
    getGames().then((data)=> setGameTypes(data))
}, [])

const changeGameState = (evt) => {
    const {name, value} = evt.target
    setCurrentGame({ ...currentGame, [evt.target.name]: value })
}


return (
    <form className="gameForm">
        <h2 className="gameForm_description"> Update Game</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title"> Title </label>
                <input
                    type="text"
                    name="title"
                    required
                    autoFocus
                    className="form-control"
                    value={currentGame.title}
                    placeholder={game.title}
                    onChange={changeGameState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="maker"> Maker </label>
                <input
                    type="text"
                    name="maker"
                    required
                    autoFocus
                    className="form-control"
                    value={currentGame.maker}
                    placeholder={game.maker}
                    onChange={changeGameState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="number_of_players"> Number of Players </label>
                <input
                    type="text"
                    name="number_of_players"
                    required
                    autoFocus
                    className="form-control"
                    value={currentGame.number_of_players}
                    placeholder={game.number_of_players}
                    onChange={changeGameState}
                    />
            </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="game_type"> Game Type </label>
                <select name="game_type" onChange={changeGameState}>
                    <option defaultValue={game?.game_type?.id}> {game?.game_type?.label} </option>
                    {gameTypes.map((game_type)=> (
                        <option key={game_type.id} value={game_type.id}>
                            {game_type.label}
                        </option>
                    ))}


                </select>
            </div>
        </fieldset>

        
    <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const game = {
                    maker: currentGame.maker,
                    title: currentGame.title,
                    number_of_players: parseInt(currentGame.number_of_players),
                    skill_level: parseInt(currentGame.skill_level),
                    game_type: parseInt(currentGame.game_type)
                }

                // Send POST request to your API
                UpdateGame(game, gameId)
                    .then(() => navigate("/games"))
            }}
            className="btn btn-primary">Update Game
            </button>
</form>
)


}