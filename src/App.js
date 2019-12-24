import React from 'react';
import renderCard from "./view/renderCard";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      deck_id: "",
      playerOneDeck: [],
      playerTwoDeck: [],
      playerOnePile: [],
      playerTwoPile: []
    }
  }

  //componentDidMount is where you fetch the data
  async componentDidMount (){
    const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await result.json();
  

    //this is an array of 5 
    const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${52/2}`)).json();
    const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${52/2}`)).json();

    this.setState({
      deck_id: data.deck_id,
      playerOneDeck: playerOne.cards,
      playerTwoDeck: playerTwo.cards
    });

  }



  render(){
    return (
      <renderCard />
    )
  }


}

export default App;
