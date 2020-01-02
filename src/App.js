import React from 'react';
import RenderCard from "./view/RenderCard";
import SearchBar from "./SearchBar";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deck_id: "",
      playerOneDeck: [],
      playerTwoDeck: [],
      playerOnePile: [],
      playerTwoPile: [],
      playerOneCurrentCard:[],
      playerTwoCurrentCard:[]
    };
    //this binding is necessary to make "this" work in the callback function
    this.changeCard = this.changeCard.bind(this);

  }

  onSearchSubmit(term){
    console.log(term);
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
  

    } catch(error){
      alert(error);
    }
    console.log(this.state.playerOneDeck[1]);
  }

    //it seems like button is just trigger logic to render things or not 
    //im just thinking that the button should only be used to switch a logic to show and hide things..
    //this could technically be a separate component - the button 
    changeCard(){
      console.log("button clicked");
      console.log(this.state.playerOneDeck[0].image);
    };

    renderThis(){
      //so when fetching api, you need a conditional to render this if only the state has been updated, which takes a while since you are updating it after componentDidUpdate and not in componenWillUpdate
      if(this.state.playerOneDeck.length > 0){
        return (
        <div>
          <RenderCard cards = {this.state.playerOneDeck} playerNumber = {1}/>
          <RenderCard cards = {this.state.playerTwoDeck} playerNumber = {2}/>
        </div>
        )
      }
    }

  

    // you basically are passing a function down to this.props.onSubmit
  render(){
    return (
      <div>
      <h1>awef</h1>
      {this.renderThis()}
      <button onClick = {this.changeCard} >Time to War</button>
      <SearchBar onSubmit = {this.onSearchSubmit}/>
      </div>

    )
  }


}

export default App;


  // renRen(){
  //   // const playerOneCard = this.state.playerOneDeck.slice(1);
  //   console.log(this.state.playerOneDeck);

  //   this.setState({
  //     playerOneCurrentCard: this.state.playerOneDeck[0],
  //     playerTwoCurrentCard: this.state.playerTwoDeck[0],
  //   });

  //   // console.log(playerOneCurrentCard);

  //   return (
  //     <div>
  //       <RenderCard cards = {this.state.playerOneDeck} playerNumber = {1}/>
  //       <RenderCard cards = {this.state.playerTwoDeck} playerNumber = {2}/>
  //     </div>
  //   )
  // }
