import React, { useState } from 'react';

import '../newGame.css';

export default function Newgame({turns , createItems }) {


    const [diff , setDiff] = useState('Easy');

    const getDiff = (e)=> {
        switch (e.target.id) {
            case "opt1":
                setDiff("Easy");
                break;
                case "opt2":
                    setDiff("Medium");
                    break;
                    case "opt3":
                        setDiff("Hard");
                        break;
        
            default:
                break;
        }
    }

    return (
        <>
            <div className="newGame">
                <p className="headText">Magic Match</p>
                { turns > 0 ? <h2 className="score">Score : {turns}</h2>: null }
                <div class="select" tabindex="1">
                    <input onClick={getDiff} class="selectopt" name="test" type="radio" id="opt1" checked/>
                    <label for="opt1" class="option">Easy</label>
                    <input onClick={getDiff} class="selectopt" name="test" type="radio" id="opt2"/>
                    <label for="opt2" class="option">Medium</label>
                    <input onClick={getDiff} class="selectopt" name="test" type="radio" id="opt3"/>
                    <label for="opt3" class="option">Hard</label>
                </div>
                <button onClick={() => {createItems(diff)}}>{ turns > 0 ? "Play Again" : "Start a New Game" }</button>
                <p className="copy-right">this app was made by <span className="creator">Sajjad Khedmati</span></p>
            </div>
        </>
    )
}
