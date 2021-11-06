import { useEffect, useState } from 'react';

import Card from './components/Card';

import './App.css';

const imagesSource = [
 { "src":"../img/helmet-1.png" , matched : false },
 { "src":"../img/potion-1.png" , matched : false },
 { "src":"../img/ring-1.png" , matched : false },
 { "src":"../img/scroll-1.png" , matched : false },
 { "src":"../img/shield-1.png" , matched : false },
 { "src":"../img/sword-1.png" , matched : false },
]

function App() {

  const [ Cards , setCards ] = useState([]);
  const [turns , setTurns ] = useState(0);

  const [choiceOne , setChoiceOne] = useState(null);
  const [choiceTwo , setChoiceTwo] = useState(null);
  
  // this function set Cards State with dupplicated items
  const createItems = ()=>{

    const shuffledImage = [ ...imagesSource , ...imagesSource ]
      //each time this query set a diffrent Cards order  
      .sort( ()=> Math.random() - 0.5 )
      // set a random ID for each Cards
      .map( item => ( {...item , id : Math.random() } ) );

    setCards([...shuffledImage]);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // control and check matched selection cards
  useEffect( ()=>{
    if (choiceOne && choiceTwo) {
      // Match selection
      if(choiceOne.src === choiceTwo.src){
        setCards( prevCard => {
          return prevCard.map( (card) => {
            if(card.src === choiceOne.src){
              return { ...card , matched:true }
            }else{
              return card;
            }
          })
        })
        resetChoices();
      }else{
        setTimeout(() => {
          resetChoices();
        }, 800);
      }
    }
  } , [ choiceOne , choiceTwo ] )
  
  // Reset the choices when we Selected two cards 
  const resetChoices = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn += 1 )
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <h1>{turns}</h1>
      <button onClick={createItems}>New Game</button>

      <div className="cards-container">
        {
          Cards.map( item => <Card 
                                key={item.id} 
                                handleChoice={handleChoice} 
                                item={item}
                                flipped = { item === choiceOne || item === choiceTwo || item.matched }
                              />)
        }

      </div>

    </div>
  );
}

export default App