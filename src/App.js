import React from 'react';
import RenderCard from "./view/RenderCard";

class App extends React.Component{
  constructor(props){
    super(props);
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
    try{
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
  
      console.log(this.state.playerOneDeck[0].image);
  

    } catch(error){
      alert(error);

    }

  }




  render(){
    return (
      <div>
        found: {this.state.playerOneDeck.length} found
    

      <RenderCard cards = {this.state.playerOneDeck} playerNumber = {1}/>
      </div>
    )
  }


}

export default App;
