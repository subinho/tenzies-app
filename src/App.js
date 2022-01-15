import './App.css';
import React, {useState, useEffect} from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [count, setCount] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);

    useEffect(() => {
        let isHeld = dice.every(die => die.isHeld)
        let isEqual = dice.every(die => die.value === dice[0].value)
        if(isEqual && isHeld) {
            setTenzies(true)
            console.log('You won!')
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function newGame() {
        setDice(allNewDice())
        setTenzies(false)
        addGame()
        setCount(0)
    }
    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        addRoll();
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function addRoll() {
      setCount(prev => prev + 1)
    }
    
    function addGame() {
      setGamesPlayed(prev => prev + 1)
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div>
            {tenzies && <Confetti />}
            <main>
                {/* {tenzies && <Confetti />} */}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same.<br />
                Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <div className="dice-count">
                <h2 className="roll-count">Rolls: {count}</h2>
                <h2 className="roll-count">Games Played: {gamesPlayed}</h2>
                </div>
                <button 
                    className="roll-dice" 
                    onClick={tenzies ? newGame : rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </main>
        </div>
    )
}
