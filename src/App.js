import React from 'react';
import Card from './view/Card';

import './sass/main.scss';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deck_id: "",
      playerOneDeck: [],
      playerTwoDeck: [],
      playerOnePile: [],
      playerTwoPile: [],
      playerOneCurrentCard:null,
      playerTwoCurrentCard:null,
      winnerToken: 0,
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

      const deckSize = 52;
    
  
      //this is an array of 5 
      const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${deckSize/2}`)).json();
      const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${deckSize/2}`)).json();

      this.setState({
        deck_id: data.deck_id,
        playerOneDeck: playerOne.cards,
        playerTwoDeck: playerTwo.cards,
        playerOneCurrentCard: playerOne.cards[0],
        playerTwoCurrentCard: playerTwo.cards[0],
      });

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
  changeCard=()=>{
    //only trigger this button when the api has pulled the cards
    if(this.state.playerOneCurrentCard){
    this.compareCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);

    }
  };

  

 

  compareCards= async (playerOneCurrentCard , playerTwoCurrentCard)=> {
    let cardPot = [];
    cardPot.push(playerOneCurrentCard,playerTwoCurrentCard);
  
  
    if (this.cardNumber(playerOneCurrentCard) > this.cardNumber(playerTwoCurrentCard)){

      this.setState({
        winnerToken: 1,
        playerOnePile: this.state.playerOnePile.concat(cardPot)//add card won onto pile for future use in deck api
      });

     console.log(this.state.winnerToken);

      this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
      this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

      this.setState({
        playerOneCurrentCard: this.state.playerOneDeck[0],
        playerTwoCurrentCard: this.state.playerTwoDeck[0]

      });
      
      cardPot = [];
      
      return this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
    } else if (this.cardNumber(playerTwoCurrentCard) > this.cardNumber(playerOneCurrentCard)){
      this.setState({
        winnerToken: 2,
        playerTwoPile: this.state.playerTwoPile.concat(cardPot)//add card won onto pile for future use in deck api
      });

      console.log(this.state.winnerToken);


      this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
      this.state.playerOneDeck.splice(0,cardPot.length/2)

      this.setState({
        playerOneCurrentCard: this.state.playerOneDeck[0],
        playerTwoCurrentCard: this.state.playerTwoDeck[0]
      });
      
      cardPot = []; 
      

     return this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);

    } 
    else if (this.cardNumber(playerOneCurrentCard) === this.cardNumber(playerTwoCurrentCard)){
        //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
        if (this.state.playerOneDeck.length + this.state.playerOnePile.length < 3){
        //     let style = document.createElement('style');
        //     style.innerHTML = `
        //     .winner h1{
        //         display:block;
        //     }
        // `;
        // document.head.appendChild(style);
        // document.querySelector(".war__button").disabled = true;
        // document.querySelector('.winner__header').innerHTML = "Player Two won!"
            //deal with end case where you have less then 3 cards but happen to draw same card on card number 2
        } else if (this.state.playerTwoDeck.length + this.state.playerTwoPile.length < 3) {
            // let style = document.createElement('style');
            // style.innerHTML = `
            //     .winner h1{
            //         display:block;
            //     }
            // `;
            // document.head.appendChild(style);
            // document.querySelector(".war__button").disabled = true;
            // document.querySelector('.winner__header').innerHTML = "Player One won!" 
        //edge case when you happen to draw equal card on card number 1 but don't have enough card in deck but enough in pile
        } else if (this.state.playerOneDeck.length < 3 && this.state.playerOnePile.length > 3) {
  
            document.querySelector(`.war__button`).disabled = true;
  
            const playerOneDeck = 'playerOneDeck';
  
            const piles = await( await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerOneDeck}/add/?cards=${this.state.playerOnePile.toString()}`) ).json();
            const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerOneDeck}/shuffle/`)).json();
  
            const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerOneDeck}/list/`)).json();
            console.log(pilesList);
            const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerOneDeck}/draw/?count=${this.state.playerOnePile.length }`)).json();
            console.log(pilesDraw);

            this.setState({
              playerOneDeck:this.state.playerOneDeck.concat(pilesDraw.cards),
              playerOnePile:[]
            });
       
  
            //  state.playerOneDeck = [...state.playerOneDeck, ...pilesDraw.cards]
         
            console.log(this.state.playerOneDeck);
            console.log(this.state.playerOnePile);
  
            // document.querySelector(`.war__button`).disabled = false;
  
            this.equalCardDuel(cardPot);
  
  
        } else if(this.state.playerTwoDeck.length < 3 && this.state.playerTwoPile.length > 3) {
  
            // document.querySelector(`.war__button`).disabled = true;
            const playerTwoDeck = 'playerTwoDeck';
            const piles = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerTwoDeck}/add/?cards=${this.state.playerTwoPile.toString()}`)).json();
  
            const pilesShuffle = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerTwoDeck}/shuffle/`)).json();
  
            const pilesList = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerTwoDeck}/list/`)).json();
            console.log(pilesList);
            const pilesDraw = await(await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${playerTwoDeck}/draw/?count=${this.state.playerTwoPile.length}`)).json();
            console.log(pilesDraw);
         

            this.setState({
              playerTwoDeck:this.state.playerOneDeck.concat(pilesDraw.cards),
              playerTwoPile:[]
            });
  
            // state.playerTwoDeck = [...state.playerTwoDeck, ...pilesDraw.cards];

  
            console.log(this.state.playerTwoDeck);
            console.log(this.state.playerTwoPile);
  
            document.querySelector(`.war__button`).disabled = false;
  
            this.equalCardDuel(cardPot);

        } else {
            this.equalCardDuel(cardPot);
        }
    }
  
  
  }


  equalCardDuel = (cardPot) => {
      let card1 = this.cardNumber(this.state.playerOneCurrentCard.code) ;
      let card2 = this.cardNumber(this.state.playerTwoCurrentCard.code);
      let odd = 1;
      let even =2;


      while(card1 === card2){

        cardPot.push(this.state.playerOneDeck[odd].code,this.state.playerTwoDeck[odd].code);



        cardPot.push(this.state.playerOneDeck[even].code,this.state.playerTwoDeck[even].code);


        if (this.cardNumber(this.state.playerOneDeck[even].code) > this.cardNumber(this.state.playerTwoDeck[even].code)){
            this.state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
            //state.playerOneDeck = state.playerOneDeck.concat(cardPot);//add card won onto pile for future use in deck api
            
            this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
            this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
            


            break
        } else if (this.cardNumber(this.state.playerTwoDeck[even].code) > this.cardNumber(this.state.playerOneDeck[even].code)){
            this.state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api

            //state.playerTwoDeck = state.playerTwoDeck.concat(cardPot);//add card won onto pile for future use in deck api

            this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
            this.state.playerOneDeck.splice(0,cardPot.length/2);

            break
        } else if (this.cardNumber(this.state.playerOneDeck[even].code) === this.cardNumber(this.state.playerTwoDeck[even].code)){
            card1 = this.cardNumber(this.state.playerOneDeck[even].code); 
            card2 = this.cardNumber(this.state.playerTwoDeck[even].code);
            odd = odd + 2;
            even = even + 2;
        }
      }
      
  }


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



  //im starting to think you just pass what card to render to the rendercard
  //all logic of what to render could be done in the rendercard but that doesn't separate Model view controller 


  renderCards=(playerOneCard, playerTwoCard)=>{
    //so when fetching api, you need a conditional to render this if only the state has been updated, which takes a while since you are updating it after componentDidUpdate and not in componenWillUpdate
    if(this.state.playerOneCurrentCard){
      return (
      <div className = "playing-cards">
        <Card cards = {playerOneCard} playerNumber = {1}/>
      
        <Card cards = {playerTwoCard} playerNumber = {2}/>
        
      </div>
      )
    }
  }


  render(){
    
    return (
      <div className = "container">
        <h1>War</h1>
        <div className = "playing-area">



          {this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard)}
          
   
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
          
        </div>
        <h1>{this.state.winnerToken === 1 ? "Player One!! wins this round":"Player Two?! wins this round" }</h1>
      </div>

    )
  }
}

export default App;



//   const state = {};





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






// compareCards = (playerOneCurrentCard , playerTwoCurrentCard) => {

  //   let cardPot = [];
  //   cardPot.push(playerOneCurrentCard,playerTwoCurrentCard);



  //   const cardsNotEqual = (playerOneCurrentCard,playerTwoCurrentCard) => {

  //     if (this.cardNumber(playerOneCurrentCard) > this.cardNumber(playerTwoCurrentCard)){

  //       this.state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
  //       this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
  //       this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

  //       this.setState({
  //       playerOneCurrentCard: this.state.playerOneDeck[0],
  //       playerTwoCurrentCard: this.state.playerTwoDeck[0]
  //       });
          
  //       cardPot = [];

  //       this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
        
  //     } else if (this.cardNumber(playerTwoCurrentCard) > this.cardNumber(playerOneCurrentCard)){
  
  //       this.state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
  //       this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
  //       this.state.playerOneDeck.splice(0,cardPot.length/2)

  //       this.setState({
  //         playerOneCurrentCard: this.state.playerOneDeck[0],
  //         playerTwoCurrentCard: this.state.playerTwoDeck[0]
  //       });
        
  //       cardPot = []; 

  //       this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
  //     } 
  //   }
    
  //   //playerOneCurrentCard is always changing bc the state of playerOneCurrentCard is changing as you move through this
  //   const equalCards = (playerOneCurrentCard,playerTwoCurrentCard) =>{
  //     console.log("equal cards");

  //     console.log(playerOneCurrentCard);
  //     console.log(playerTwoCurrentCard);

  //     let odd = 1;

  //     let even = 2;
  //     while (this.cardNumber(this.state.playerOneCurrentCard) === this.cardNumber(this.state.playerTwoCurrentCard)) {

  //       cardPot.push(this.state.playerOneDeck[odd],this.state.playerTwoDeck[odd],this.state.playerOneDeck[even],this.state.playerTwoDeck[even]);

  //       this.renderCards(this.state.playerOneDeck[odd], this.state.playerTwoDeck[odd]);
   
  //       this.renderCards(this.state.playerOneDeck[even], this.state.playerTwoDeck[even]);

  //       console.log(cardPot);

  //       this.setState({
  //         playerOneCurrentCard: this.state.playerOneDeck[even],
  //         playerTwoCurrentCard: this.state.playerTwoDeck[even]
  //       });
        
  //       odd += 2;
  //       even += 2;

  //       if (this.state.playerOneCurrentCard !== this.state.playerTwoCurrentCard ){
  //         cardsNotEqual(this.state.playerOneCurrentCard,this.state.playerTwoCurrentCard);
  //         break;
  //       } else {
  //         equalCards(this.state.playerOneCurrentCard,this.state.playerTwoCurrentCard);
  //       }
  //     }
  //   };

  //   if (this.cardNumber(playerOneCurrentCard) !== this.cardNumber(playerTwoCurrentCard)){
  //     return cardsNotEqual(playerOneCurrentCard,playerTwoCurrentCard)
  //   } else if (this.cardNumber(playerOneCurrentCard) === this.cardNumber(playerTwoCurrentCard)){
  //     return equalCards(playerOneCurrentCard,playerTwoCurrentCard);
  //   };

  // };


  // else if (this.cardNumber(playerOneCurrentCard) === this.cardNumber(playerTwoCurrentCard)){
  //   //playerOneCurrentCard is always changing bc the state of playerOneCurrentCard is changing as you move through this

  //   console.log("equal cards");

  //   console.log(playerOneCurrentCard);
  //   console.log(playerTwoCurrentCard);

  //   let odd = 1;

  //   let even = 2;
  //   while (this.cardNumber(this.state.playerOneCurrentCard) === this.cardNumber(this.state.playerTwoCurrentCard)) {

  //     cardPot.push(this.state.playerOneDeck[odd],this.state.playerTwoDeck[odd],this.state.playerOneDeck[even],this.state.playerTwoDeck[even]);

  //     this.renderCards(this.state.playerOneDeck[odd], this.state.playerTwoDeck[odd]);

  //     this.renderCards(this.state.playerOneDeck[even], this.state.playerTwoDeck[even]);

  //     console.log(cardPot);

  //     this.setState({
  //       playerOneCurrentCard: this.state.playerOneDeck[even],
  //       playerTwoCurrentCard: this.state.playerTwoDeck[even]
  //     });
      
  //     odd += 2;
  //     even += 2;

  //     this.compareCards(this.state.playerOneCurrentCard,this.state.playerTwoCurrentCard )
  //   }
  // }

   // compareCards = (playerOneCurrentCard , playerTwoCurrentCard) => {

  //   let cardPot = [];
  //   cardPot.push(playerOneCurrentCard,playerTwoCurrentCard);


  //   if (this.cardNumber(playerOneCurrentCard) > this.cardNumber(playerTwoCurrentCard)){

  //     this.state.playerOnePile.concat(cardPot);//add card won onto pile for future use in deck api
  //     this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
  //     this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost

  //     this.setState({
  //     playerOneCurrentCard: this.state.playerOneDeck[0],
  //     playerTwoCurrentCard: this.state.playerTwoDeck[0]
  //     });
        
  //     cardPot = [];

  //     this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
      
  //   } else if (this.cardNumber(playerTwoCurrentCard) > this.cardNumber(playerOneCurrentCard)){

  //     this.state.playerTwoPile.concat(cardPot);//add card won onto pile for future use in deck api
  //     this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
  //     this.state.playerOneDeck.splice(0,cardPot.length/2)

  //     this.setState({
  //       playerOneCurrentCard: this.state.playerOneDeck[0],
  //       playerTwoCurrentCard: this.state.playerTwoDeck[0]
  //     });
      
  //     cardPot = []; 

  //     this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
  //   } 
  // };