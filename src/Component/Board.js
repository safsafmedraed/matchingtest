import { useEffect, useState } from "react";
import Card from "./Card"
import Cercle from '../Utilities/Cercle'
import Triangle from '../Utilities/Triangle'
import Rectangle from '../Utilities/rectangle'

const Shapes = [{ id: 1, item: <Cercle />, name: 'cer' }, { id: 2, item: <Triangle />, name: 'tri' }, { id: 3, item: <Rectangle />, name: 'rec' }]
const shuffleCards = (array) => {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}
const Board = () => {
    const [openedCard, setOpenedCard] = useState([]);
    const [matched, setMatched] = useState([]);
    const [steps, setSteps] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null)
    const [hide, setHide] = useState(true)
    const [winner, setWinner] = useState(0)
    const [timeWin, setTimeWin] = useState(0)

    const [pairOfshapes, setCards] = useState(() =>
    shuffleCards(Shapes.concat(Shapes))
  );
   

    useEffect(() => {

        if (openedCard < 2) return;

        const firstMatched = pairOfshapes[openedCard[0]];
        const secondMatched = pairOfshapes[openedCard[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {

            setMatched([...matched, firstMatched.id]);
            setWinner(winner + 1)

        }

        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 800);
        setTimeWin(seconds)
    }, [openedCard]);


    const flipCard = (index) => {

        setOpenedCard((opened) => [...opened, index]);
        setSteps(steps + 1)

    }

    const startCounting = () => {
        setHide(false)
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        setTimer(interval)
        shuffleCards(pairOfshapes)
    }




    const restartGame = () => {
        setMatched([])
        setSteps(0)
        clearInterval(timer);
        setSeconds(0)
        startCounting()
        setWinner(0)
        shuffleCards(pairOfshapes)
    }
    return (
        <div className="App">
            <h1>Technical Test Shipzzer</h1>
            <div className="cards">
                {pairOfshapes.map((shape, index) => {


                    let isFlipped = false;

                    if (openedCard.includes(index)) isFlipped = true;
                    if (matched.includes(shape.id)) isFlipped = true;
                    return (
                        <div
                            className={`board-card ${isFlipped ? "flipped" : ""} `}
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
                {winner === 3 ? <h6>Congratulation you won the game in {timeWin} seconds </h6> : <div></div>}
                <h6 hidden={hide}>  Steps: {steps}</h6>
                <button hidden={!hide} onClick={e => startCounting()}>Start Game</button>
                <button hidden={hide} onClick={e => restartGame()}>Restart Game</button></div>
        </div>)

}
export default Board