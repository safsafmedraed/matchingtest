import { useEffect, useState } from "react";
import Card from "./Card"
import Cercle from '../Utilities/Cercle'
import Triangle from '../Utilities/Triangle'
import Rectangle from '../Utilities/rectangle'

const Shapes = [{ id: 1, item: <Cercle />, name: 'cer' }, { id: 2, item: <Triangle />, name: 'tri' }, { id: 3, item: <Rectangle />, name: 'rec' }]
const Board = () => {
    const [openedCard, setOpenedCard] = useState([]);
    const [matched, setMatched] = useState([]);
    const [steps, setSteps] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [timer,setTimer]=useState(null)
    const [hide,setHide]=useState(true)

    //currently there are 4 Shapes but we need the pair

    const pairOfPokemons = [...Shapes, ...Shapes];

    function flipCard(index) {

        setOpenedCard((opened) => [...opened, index]);
        setSteps(steps + 1)

    }

    const startCounting = () => {
        setHide(false)
        const interval =setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
         setTimer(interval) 
       
    }

   

    useEffect(() => {
        
        if (openedCard < 2) return;

        const firstMatched = pairOfPokemons[openedCard[0]];
        const secondMatched = pairOfPokemons[openedCard[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {

            setMatched([...matched, firstMatched.id]);

        }

        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);

    }, [openedCard]);
    const restartGame = () => {
        setMatched([])
        setSteps(0)
        clearInterval(timer);
        setSeconds(0)
        startCounting()
    }
    return (
        <div className="App">
            <h1>Technical Test Shipzzer</h1>
            <div className="cards">
                {pairOfPokemons.map((shape, index) => {
                    //lets flip the card

                    let isFlipped = false;

                    if (openedCard.includes(index)) isFlipped = true;
                    if (matched.includes(shape.id)) isFlipped = true;
                    return (
                        <div
                            className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
                            key={index}
                            onClick={() => flipCard(index, shape)}
                            hidden={hide}
                        >
                            <div className="inner">
                                <div className="front">
                                    <Card Shapes={shape.item} />

                                </div>
                                <div className="back"></div>

                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <h6>  Steps: {steps}</h6>
                <h6> time:{seconds}</h6>
                <button hidden={!hide}  onClick={e => startCounting()}>Start Game</button>
                <button hidden={hide}  onClick={e => restartGame()}>Restart Game</button></div>
        </div>)

}
export default Board