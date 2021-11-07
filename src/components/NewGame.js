import React from 'react';

import '../newGame.css';

export default function Newgame({turns , createItems }) {

    return (
        <>
            <div className="newGame">
                <p className="headText">Magic Match</p>
                { turns > 0 ? <h2 className="score">Score : {turns}</h2>: null }
                <button onClick={createItems}>{ turns > 0 ? "Play Again" : "Start a New Game" }</button>
                <p className="copy-right">this app was made by <span className="creator">Sajjad Khedmati</span></p>
            </div>
        </>
    )
}
