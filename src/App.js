import { useEffect, useState } from 'react';

import Card from './components/Card';

import './App.css';
import Newgame from './components/NewGame';

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

  // this is an counter for set Player score
  const [turns , setTurns ] = useState(0);

  const [startNewGame , setStartNewGame] = useState(false);

  const [wasEnded , setWasEnded] = useState(true);

  // for disable another cards when compare two cards
  const [enableSelection , setEnableSelection] =useState(true);

  const [choiceOne , setChoiceOne] = useState(null);
  const [choiceTwo , setChoiceTwo] = useState(null);
  
  // this function set Cards State with dupplicated items
  const createItems = ()=>{
    setStartNewGame(true);
    setWasEnded(false);
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
      setEnableSelection(false);
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
  
  useEffect(()=>{
    checkEndGame();
  } , [ Cards ])
  
  // this function checked for Game was Ended Or not?
  const checkEndGame = () => {
    if (!Cards.some(item=> item.matched === false)) { 
      setWasEnded(true);
      setStartNewGame(false);
    }
  }
  
  // Reset the choices when we Selected two cards 
  const resetChoices = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn += 1 );
    setEnableSelection(true);
  }

  return (
    <div className="App">
      {!startNewGame && wasEnded ? 
        <Newgame turns={turns} createItems={createItems} /> 
      :
        <div className="wrapper">
            <h1>Magic Match</h1>
            <h1>{turns}</h1>

            <div className="cards-container">
              {
                Cards.map( item => <Card 
                                      key={item.id} 
                                      handleChoice={handleChoice} 
                                      item={item}
                                      flipped = { item === choiceOne || item === choiceTwo || item.matched }
                                      enableSelection ={ enableSelection }
                                    />)
              }

            </div>

        </div>
     }
    </div>
  );
}

export default App