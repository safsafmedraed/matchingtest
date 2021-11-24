import { useEffect, useState } from "react";
import Card from "./Card"
import Cercle from '../Utilities/Cercle'
import Triangle from '../Utilities/Triangle'
import Rectangle from '../Utilities/rectangle'


const Board = () => {
    const [openedCard, setOpenedCard] = useState([]);
    const [matched, setMatched] = useState([]);

    const Shapes = [{ id: 1, item: <Cercle /> }, { id: 2, item: <Triangle /> }, { id: 3, item: <Rectangle /> }]

    //currently there are 4 Shapes but we need the pair

    const pairOfPokemons = [...Shapes, ...Shapes];

    function flipCard(index) {
        setOpenedCard((opened) => [...opened, index]);

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
            <button>Restart Game</button>
        </div>)

}
export default Board