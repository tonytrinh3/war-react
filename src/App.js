import React from 'react';
import Card from './view/Card';

import './sass/main.scss';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deck_id: "",
      deckSize: 20,
      playerOneDeck: [],
      playerTwoDeck: [],
      playerOnePile: [],
      playerTwoPile: [],
      playerOneCurrentCard:null,
      playerTwoCurrentCard:null,
      winnerToken: 0,
      renderCardArray:[]
    };

    //this binding is necessary to make "this" work in the callback function
    // this.changeCard = this.changeCard.bind(this);
    //this.onSearchSubmit = this.onSearchSubmit.bind(this);

  }

  //componentDidMount is where you fetch the data
  async componentDidMount (){
    try{
      const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await result.json();

  
      //this is an array of 5 
      const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${this.state.deckSize/2}`)).json();
      const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${this.state.deckSize/2}`)).json();

      this.setState({
        deck_id: data.deck_id,
        playerOneDeck: playerOne.cards,
        playerTwoDeck: playerTwo.cards,
        playerOneCurrentCard: playerOne.cards[0],
        playerTwoCurrentCard: playerTwo.cards[0]
      });

      //console.log(this.state.playerOneDeck);
      //console.log(this.state.playerTwoDeck);
    
      
    } catch(error){
      alert(error);
    }
    
  };
  
  cardNumber = (playerCard) =>{
    const splitCardCode= playerCard.code.split("");
    const cardNumTemp= splitCardCode[0];
    if (cardNumTemp === "A"){
        return 14;
    } else if (cardNumTemp === "K"){
        return 13;
    } else if (cardNumTemp === "Q"){
        return 12;
    } else if (cardNumTemp === "J"){
        return 11;
    } else if (cardNumTemp === "0"){
        return 10;
    } else {
        return cardNumTemp;
    }              
  };

    //it seems like button is just trigger logic to render things or not 
    //im just thinking that the button should only be used to switch a logic to show and hide things..
    //this could technically be a separate component - the button 

  

 

  compareCards= async (playerOneCurrentCard , playerTwoCurrentCard)=> {
    let cardPot = [];
    cardPot.push(playerOneCurrentCard,playerTwoCurrentCard);
    console.log(cardPot);

    this.setState({
      renderCardArray: []
    });
  
  
    if (this.cardNumber(playerOneCurrentCard) > this.cardNumber(playerTwoCurrentCard)){

      // console.log(this.state.playerOnePile);
      // console.log(this.state.playerOneCurrentCard);
      // console.log(this.state.playerTwoCurrentCard);

      this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
      this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

      this.setState({
      
        playerOnePile: this.state.playerOnePile.concat(cardPot),//add card won onto pile for future use in deck api
        playerOneCurrentCard: this.state.playerOneDeck[0],
        playerTwoCurrentCard: this.state.playerTwoDeck[0],
        winnerToken: 1,
        renderCardArray: cardPot
      });

      // console.log(this.state.playerOnePile);
      // console.log(this.state.playerOneCurrentCard);
      // console.log(this.state.playerTwoCurrentCard);

      //console.log(this.state.renderCardArray);
   
     cardPot = [];

     //console.log(this.state.playerOnePile);

     this.shufflePileDeck();

      
      return this.renderCards(this.state.renderCardArray);
    } else if (this.cardNumber(playerTwoCurrentCard) > this.cardNumber(playerOneCurrentCard)){


      // console.log(this.state.playerTwoPile);
      // console.log(this.state.playerOneCurrentCard);
      // console.log(this.state.playerTwoCurrentCard);

      this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
      this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost



      this.setState({
    
        playerTwoPile: this.state.playerTwoPile.concat(cardPot),//add card won onto pile for future use in deck api
        playerOneCurrentCard: this.state.playerOneDeck[0],
        playerTwoCurrentCard: this.state.playerTwoDeck[0],
        winnerToken: 2,
        renderCardArray: cardPot
      });

      
      // console.log(this.state.playerTwoPile);
      // console.log(this.state.playerOneCurrentCard);
      // console.log(this.state.playerTwoCurrentCard);



      cardPot = [];
      
      //console.log(this.state.renderCardArray);

      this.shufflePileDeck();


     return this.renderCards(this.state.renderCardArray);

    } 
    else if (this.cardNumber(playerOneCurrentCard) === this.cardNumber(playerTwoCurrentCard)){

        this.equalCardDuel(cardPot);
        return this.renderCards(this.state.renderCardArray);
        
    }
  
  
  }


  equalCardDuel = (cardPot) => {


      let card1 = this.cardNumber(this.state.playerOneCurrentCard) ;
      let card2 = this.cardNumber(this.state.playerTwoCurrentCard);
      let burnCardInd = 1;
      let even = 2;

      while(card1 === card2){

        this.shufflePileDeck();

        cardPot.push(this.state.playerOneDeck[burnCardInd],this.state.playerTwoDeck[burnCardInd]);
        cardPot.push(this.state.playerOneDeck[even],this.state.playerTwoDeck[even]);

        //console.log(this.state.playerOneDeck);
        //console.log(this.state.playerTwoDeck);
        if (this.cardNumber(this.state.playerOneDeck[even]) > this.cardNumber(this.state.playerTwoDeck[even])){

        this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
        this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

        this.setState({
          playerOnePile: this.state.playerOnePile.concat(cardPot),//add card won onto pile for future use in deck api
          playerOneCurrentCard: this.state.playerOneDeck[even],
          playerTwoCurrentCard: this.state.playerTwoDeck[even],
          winnerToken: 1,
          renderCardArray: cardPot
        });



          //console.log(this.state.playerOneDeck[even]);
          //console.log(this.state.playerTwoDeck[even]);
          //console.log(cardPot);
          cardPot = []; 


          break
        } else if (this.cardNumber(this.state.playerTwoDeck[even]) > this.cardNumber(this.state.playerOneDeck[even])){

          this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
          this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

          this.setState({
            playerTwoPile: this.state.playerTwoPile.concat(cardPot),//add card won onto pile for future use in deck api
            playerOneCurrentCard: this.state.playerOneDeck[even],
            playerTwoCurrentCard: this.state.playerTwoDeck[even],
            winnerToken: 2,
            renderCardArray: cardPot
          });



          //console.log(this.state.playerOneDeck[even]);
          //console.log(this.state.playerTwoDeck[even]);
          //console.log(cardPot);
          cardPot = []; 

          break
        } else if (this.cardNumber(this.state.playerOneDeck[even]) === this.cardNumber(this.state.playerTwoDeck[even])){
            card1 = this.cardNumber(this.state.playerOneDeck[even]); 
            card2 = this.cardNumber(this.state.playerTwoDeck[even]);
            burnCardInd = burnCardInd + 2;
            even = even + 2;
        }
      }
      
  };

  //get pile to s
  shufflePileDeck = () =>{

    const shuffleHelper = async(playerNameDeck, playerDeck, playerPile ) =>{


      //this changes cardpile into codes to be put into piles draw
      const cardPileToCode = (funcPlayerDeck,funcPlayerPile) =>{
        return funcPlayerDeck.concat(funcPlayerPile).map(card=>{
          return card.code;
        })
      };


      const deckAndPiles = await( await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerNameDeck}/add/?cards=${cardPileToCode(playerDeck, playerPile).toString()}`) ).json();
      const deckAndPilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerNameDeck}/shuffle/`)).json();
  
      //const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerNameDeck}/list/`)).json();
      // console.log(pilesList);
      const deckAndPilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerNameDeck}/draw/?count=${cardPileToCode(playerDeck,playerPile).length }`)).json();
      console.log(deckAndPilesDraw.cards)

       if (playerNameDeck==='playerOneDeck'){
          this.setState({
            playerOneDeck: deckAndPilesDraw.cards,
            playerOnePile: []
          });
        
       } else if (playerNameDeck==='playerTwoDeck'){
          this.setState({
            playerTwoDeck: deckAndPilesDraw.cards,
            playerTwoPile: []
          });
       };

       console.log(this.state.playerOneDeck);
       console.log(this.state.playerTwoDeck);

    };

 
   
   if (this.state.playerOneDeck.length === 3 && this.state.playerTwoDeck.length === 3 ) {
   
    shuffleHelper('playerOneDeck', this.state.playerOneDeck,this.state.playerOnePile );
    shuffleHelper('playerTwoDeck', this.state.playerTwoDeck,this.state.playerTwoPile);

  } else if (this.state.playerOneDeck.length === 3 ){
    shuffleHelper('playerOneDeck', this.state.playerOneDeck,this.state.playerOnePile );
   }else if (this.state.playerTwoDeck.length === 3 ){
    shuffleHelper('playerTwoDeck', this.state.playerTwoDeck,this.state.playerTwoPile);
   }

  };

  


  //im starting to think you just pass what card to render to the rendercard
  //all logic of what to render could be done in the rendercard but that doesn't separate Model view controller 

  changeCard=()=>{
    //only trigger this button when the api has pulled the cards
    if(this.state.playerOneCurrentCard){
    this.compareCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);

    }
  };


  renderCards=(cardArray)=>{
    //so when fetching api, you need a conditional to render this if only the state has been updated, which takes a while since you are updating it after componentDidUpdate and not in componenWillUpdate
    
    
    const cardLoop = cardArray.map((card, index) =>{
      return <Card card = {card} playerNumber = {index%2 === 0 ? 1 : 2} key ={card.code}/>
    })
    
    if(this.state.renderCardArray){

      return (
      <div className = "playing-cards">
        {cardLoop}
      </div>
      )
    }
  }


  render(){

    const showRoundWin = ()=>{
      return this.state.winnerToken === 0 ? null : this.state.winnerToken === 1 ? "!!Player One!! wins this round":"??Player Two?? wins this round";
    };

    const renderCardsLogic = () =>{
      return this.state.renderCardArray === [] ? null : this.renderCards(this.state.renderCardArray);
    };


    const renderPileLogicPlayer1= () =>{
      if (this.state.playerOnePile === []){
        return null
      } else if (this.state.playerOnePile.length  >= 2) {
        return <div className = "playing-pile playing-pile--1">sssss</div>
      }
    };

    const renderPileLogicPlayer2= () =>{
      if (this.state.playerTwoPile === []){
        return null
      } else if (this.state.playerTwoPile.length  >= 2){
        return <div className = "playing-pile playing-pile--2">ttttt</div>
      }
    };

    const renderDeckLogicPlayer1= () =>{
      if (this.state.playerOneDeck === []){
        return null
      } else  {
        return <div className = "playing-deck playing-deck--1">hi</div>
      }
    };

    const renderDeckLogicPlayer2= () =>{
      if (this.state.playerTwoDeck === []){
        return null
      } else {
        return <div className = "playing-deck playing-deck--2">bye</div>
      }
    };
    
    return (
      <div className = "container">
        <h1>War</h1>
        <div className = "playing-area">

          {renderCardsLogic()}
          
          <div>
          <h1>Player One Deck {this.state.playerOneDeck.length}</h1>
          <br/>
          <h1>Player One Pile {this.state.playerOnePile.length}</h1>
          </div>
          <div>
          <h1>Player Two Deck {this.state.playerTwoDeck.length}</h1>
          <br/>
          <h1>Player Two Pile {this.state.playerTwoPile.length}</h1>
          </div>

          <button className = "btn war-button" onClick = {this.changeCard} >Time to War</button>

        
          

          {renderDeckLogicPlayer1()}
          {renderDeckLogicPlayer2()}

          {renderPileLogicPlayer1()}
          {renderPileLogicPlayer2()}
       

          
          
        </div>
        <h1>{showRoundWin() }</h1>
      </div>

    )
  }
}

export default App;



// // const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()
// // https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

// const playWar = async () => {
//     try{
//         const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
//         const data = await result.json();
//         state.deck_id = data.deck_id;
    
        

//         //this is an array of 5 
//         const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=${52/2}`)).json();
      
        
//         const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=${52/2}`)).json();
       
//     //     const carArray = ["AS","2S","KS","QS"];
//     //     const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/add/?cards=${carArray.toString()}`)).json();
//     //     console.log(piles);
//     //     const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/shuffle/`)).json();
//     //     console.log(pilesShuffle);

        
//     //     const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/list/`)).json();
//     //    const pilesDraw =  await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${'funny'}/draw/?count=4`)).json();
//     //     console.log(pilesDraw.cards);
        
        
//         state.playerOneDeck = playerOne.cards;
       
 
//         state.playerTwoDeck = playerTwo.cards;
    

    

//         //https://stackoverflow.com/questions/33846682/react-onclic,k-function-fires-on-render/33846747
//         //Because you are calling that function instead of passing the function to onClick, change that line to this:

        
//         const renderCard = (card, playerNumber) =>{
            
//             const displayCard = `<img class = "card--${playerNumber}" src = ${card.image} alt = ${card.code}/>`;


//             document.querySelector(`.players-card__player-${playerNumber}`).insertAdjacentHTML('beforeend',displayCard);

//             //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
//             let style = document.createElement('style');
//             style.innerHTML = `
//             .players-card__card {
//             background-color: green;
//             }
//             `;
//             document.head.appendChild(style);
//             //passed down the cards array from json, cardindex that is relevant to changing the card, and player number

//         };


//         state.playerOnePile = [];

//         state.playerTwoPile = [];

//         const cardNumber = (cardCode) =>{
//             const splitCardCode= cardCode.split("");
//             const cardNumTemp= splitCardCode[0];
//             if (cardNumTemp === "A"){
//                 return 14;
//             } else if (cardNumTemp === "K"){
//                 return 13;
//             } else if (cardNumTemp === "Q"){
//                 return 12;
//             } else if (cardNumTemp === "J"){
//                 return 11;
//             } else if (cardNumTemp === "0"){
//                 return 10;
//             } else {
//                 return cardNumTemp;
//             }              
//         };


//         // const compareCards = (playerOneCard,playerTwoCard) => {
//         //     const cardPot = [];
//         //     cardPot.push(playerOneCard,playerTwoCard);
//         //     if (cardNumber(playerOneCard) > cardNumber(playerTwoCard)){
//         //         state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
//         //         state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//         //         state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
//         //     } else if (cardNumber(playerTwoCard) > cardNumber(playerOneCard)){
//         //         state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
//         //         state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//         //         state.playerOneDeck.splice(0,cardPot.length/2);
//         //     } else if (cardNumber(playerOneCard) === cardNumber(playerTwoCard)){

//         //     }
//         // };

//         const equalCardDuel = (cardPot) =>{
//             let card1 = cardNumber(state.playerOneDeck[0].code) ;
//             let card2 = cardNumber(state.playerTwoDeck[0].code);
//             let odd = 1;
//             let even =2
    
//             while(card1 === card2){
//                 setTimeout(renderCard(state.playerOneDeck[odd], 1),10000);
//                 setTimeout(renderCard(state.playerTwoDeck[odd], 2),10000);
//                 cardPot.push(state.playerOneDeck[odd].code,state.playerTwoDeck[odd].code);
//                 //cardPot.push(state.playerOneDeck[odd],state.playerTwoDeck[odd]);
    
//                 setTimeout(renderCard(state.playerOneDeck[even], 1),10000);
//                 setTimeout(renderCard(state.playerTwoDeck[even], 2),10000);
//                 cardPot.push(state.playerOneDeck[even].code,state.playerTwoDeck[even].code);
//                 //cardPot.push(state.playerOneDeck[even],state.playerTwoDeck[even]);
    
//                 if (cardNumber(state.playerOneDeck[even].code) > cardNumber(state.playerTwoDeck[even].code)){
//                     state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
//                     //state.playerOneDeck = state.playerOneDeck.concat(cardPot);//add card won onto pile for future use in deck api
//                     state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//                     state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
//                     break
//                 } else if (cardNumber(state.playerTwoDeck[even].code) > cardNumber(state.playerOneDeck[even].code)){
//                     state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
//                     //state.playerTwoDeck = state.playerTwoDeck.concat(cardPot);//add card won onto pile for future use in deck api
//                     state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//                     state.playerOneDeck.splice(0,cardPot.length/2);
//                     break
//                 } else if (cardNumber(state.playerOneDeck[even].code) === cardNumber(state.playerTwoDeck[even].code)){
//                     card1 = cardNumber(state.playerOneDeck[even].code); 
//                     card2 = cardNumber(state.playerTwoDeck[even].code);
//                     odd = odd + 2;
//                     even = even + 2;
//                 }
//             }
            
//         }



//         const dummy = async () =>{

            
//             renderCard(state.playerOneDeck[0], 1);
//             renderCard(state.playerTwoDeck[0], 2);
    



//             let style = document.createElement('style');
//             style.innerHTML = `
        
//             `;
//             document.head.appendChild(style);

//             const cardPot = [];
//             cardPot.push(state.playerOneDeck[0].code,state.playerTwoDeck[0].code);
//             //cardPot.push(state.playerOneDeck[0],state.playerTwoDeck[0]);
            

//             if (cardNumber(state.playerOneDeck[0].code) > cardNumber(state.playerTwoDeck[0].code)){
//                 state.playerOnePile = state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
//                 //state.playerOneDeck = state.playerOneDeck.concat(cardPot);//add card won onto pile for future use in deck api
//                 state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//                 state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
//             } else if (cardNumber(state.playerTwoDeck[0].code) > cardNumber(state.playerOneDeck[0].code)){
//                 state.playerTwoPile = state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
//                 //state.playerTwoDeck = state.playerTwoDeck.concat(cardPot);//add card won onto pile for future use in deck api
//                 state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
//                 state.playerOneDeck.splice(0,cardPot.length/2);
//             } else if (cardNumber(state.playerOneDeck[0].code) === cardNumber(state.playerTwoDeck[0].code)){
//                 //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
//                 if (state.playerOneDeck.length + state.playerOnePile.length < 3){
//                     let style = document.createElement('style');
//                     style.innerHTML = `
//                     .winner h1{
//                         display:block;
//                     }
//                 `;
//                 document.head.appendChild(style);
//                 document.querySelector(".war__button").disabled = true;
//                 document.querySelector('.winner__header').innerHTML = "Player Two won!"
//                     //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
//                 } else if (state.playerTwoDeck.length + state.playerTwoPile.length < 3) {
//                     let style = document.createElement('style');
//                     style.innerHTML = `
//                         .winner h1{
//                             display:block;
//                         }
//                     `;
//                     document.head.appendChild(style);
//                     document.querySelector(".war__button").disabled = true;
//                     document.querySelector('.winner__header').innerHTML = "Player One won!" 
//                 //edge case when you happen to draw equal card on card number 1 but don't have enough card in deck but enough in pile
//                 } else if (state.playerOneDeck.length < 3 && state.playerOnePile.length > 3) {
                    
//                     document.querySelector(`.war__button`).disabled = true;

//                     const playerOneDeck = 'playerOneDeck';

//                     const piles = await( await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/add/?cards=${state.playerOnePile.toString()}`) ).json();
//                     const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/shuffle/`)).json();
                
//                     const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/list/`)).json();
//                     console.log(pilesList);
//                     const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/draw/?count=${state.playerOnePile.length }`)).json();
//                     console.log(pilesDraw);
//                     state.playerOneDeck = state.playerOneDeck.concat(pilesDraw.cards);

//                     //  state.playerOneDeck = [...state.playerOneDeck, ...pilesDraw.cards]
//                     state.playerOnePile=[];
//                     console.log(state.playerOneDeck);
//                     console.log(state.playerOnePile);

//                     document.querySelector(`.war__button`).disabled = false;

//                     equalCardDuel(cardPot);
                    

//                 } else if(state.playerTwoDeck.length < 3 && state.playerTwoPile.length > 3) {
                    
//                     document.querySelector(`.war__button`).disabled = true;
//                     const playerTwoDeck = 'playerTwoDeck';
//                     const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/add/?cards=${state.playerTwoPile.toString()}`)).json();
                    
//                     const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/shuffle/`)).json();
             
//                     const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/list/`)).json();
//                     console.log(pilesList);
//                     const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/draw/?count=${state.playerTwoPile.length}`)).json();
//                     console.log(pilesDraw);
//                     state.playerTwoDeck = state.playerTwoDeck.concat(pilesDraw.cards);
    
//                     // state.playerTwoDeck = [...state.playerTwoDeck, ...pilesDraw.cards];
//                     state.playerTwoPile=[];
                    
//                     console.log(state.playerTwoDeck);
//                     console.log(state.playerTwoPile);
    
//                     document.querySelector(`.war__button`).disabled = false;

//                     equalCardDuel(cardPot);
//                 } else {
//                     equalCardDuel(cardPot);
//                 }
//             }

//             console.log(state.playerOneDeck);
//             console.log(state.playerOnePile);
//             console.log(state.playerTwoDeck);
//             console.log(state.playerTwoPile);

           

//             document.querySelector('.card-count__player-1').innerHTML = `${state.playerOneDeck.length + state.playerOnePile.length } in the deck`;
//             document.querySelector('.card-count__player-2').innerHTML = `${state.playerTwoDeck.length + state.playerTwoPile.length } in the deck`;

//             //document.querySelector('.card-count__player-1').innerHTML = `${state.playerOneDeck.length } in the deck`;
//             //document.querySelector('.card-count__player-2').innerHTML = `${state.playerTwoDeck.length } in the deck`;

//             //pileToDeck();
//         };

//         const pileToDeck = async () => {
//             if (state.playerOneDeck.length === 0){

//                 document.querySelector(`.war__button`).disabled = true;

//                 const playerOneDeck = 'playerOneDeck';

//                 const piles = await( await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/add/?cards=${state.playerOnePile.toString()}`) ).json();
//                 const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/shuffle/`)).json();
              
//                 const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/list/`)).json();
//                console.log(pilesList);
//                const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerOneDeck}/draw/?count=${state.playerOnePile.length }`)).json();
//                 console.log(pilesDraw);
//                 state.playerOneDeck = state.playerOneDeck.concat(pilesDraw.cards);

//                 //  state.playerOneDeck = [...state.playerOneDeck, ...pilesDraw.cards]
//                 state.playerOnePile=[];
//                 console.log(state.playerOneDeck);
//                 console.log(state.playerOnePile);

//                 document.querySelector(`.war__button`).disabled = false;
                
//             } 
            
//             if (state.playerTwoDeck.length === 0){

//                 document.querySelector(`.war__button`).disabled = true;
//                 const playerTwoDeck = 'playerTwoDeck';
//                 const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/add/?cards=${state.playerTwoPile.toString()}`)).json();
                
//                 const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/shuffle/`)).json();
         
//                 const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/list/`)).json();
//                 console.log(pilesList);
//                 const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/${playerTwoDeck}/draw/?count=${state.playerTwoPile.length}`)).json();
//                 console.log(pilesDraw);
//                 state.playerTwoDeck = state.playerTwoDeck.concat(pilesDraw.cards);

//                 // state.playerTwoDeck = [...state.playerTwoDeck, ...pilesDraw.cards];
//                 state.playerTwoPile=[];
                
//                 console.log(state.playerTwoDeck);
//                 console.log(state.playerTwoPile);

//                 document.querySelector(`.war__button`).disabled = false;
//             } 

//         };


//         const winnerLog = () =>{
//             if (state.playerOneDeck.length + state.playerOnePile.length === 0 ){
//                 let style = document.createElement('style');
//                 style.innerHTML = `
//                     .winner h1{
//                         display:block;
//                     }
//                 `;
//                 document.head.appendChild(style);
              

//                 document.querySelector('.winner__header').innerHTML = "Player Two won!"
//                 document.querySelector(`.war__button`).disabled = true;

//             } else if (state.playerTwoDeck.length + state.playerTwoPile.length === 0 ){
//                 let style = document.createElement('style');
//                 style.innerHTML = `
//                     .winner h1{
//                         display:block;
//                     }
//                 `;
//                 document.head.appendChild(style);
                
//                 document.querySelector('.winner__header').innerHTML = "Player One won!" 
//                 document.querySelector(`.war__button`).disabled = true;
//             }
//         }
        
//         document.querySelector(`.war__button`).addEventListener('click', () =>{
//             //i only did this to trigger the if function
//             let el1 = document.querySelector(`.card--1`);
//             let el2 = document.querySelector(`.card--2`);

//             if (el1 && el2){
//                 //https://www.w3schools.com/jsref/met_node_removechild.asp
//                 //select all card
//                 //it is an array
//                 el1 = document.querySelectorAll(`.card--1`);
            
//                 el2 = document.querySelectorAll(`.card--2`);
                
//                 //remove all cards by going through each element of array
//                 el1.forEach((curEl)=>{
//                     curEl.parentElement.removeChild(curEl);
//                 })
                
//                 el2.forEach((curEl)=>{
//                     curEl.parentElement.removeChild(curEl);
//                 })


//                 dummy();


               



//                 if (state.playerOneDeck < 52 || state.playerTwoDeck < 52){
//                     pileToDeck();
//                 }
            
                
               
//             } else {

//                 dummy();
            
//             }

//             winnerLog();
//         });

        

    
//     } catch (error){
//         alert(error);
//     }
    
// };

// playWar();



