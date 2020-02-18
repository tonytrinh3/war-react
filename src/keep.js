
  compareCards= async (playerOneCurrentCard , playerTwoCurrentCard)=> {
    let cardPot = [];
    cardPot.push(playerOneCurrentCard,playerTwoCurrentCard);
  
  
    if (this.cardNumber(playerOneCurrentCard) > this.cardNumber(playerTwoCurrentCard)){

      this.setState({
        winnerToken: 1,
        playerOnePile: this.state.playerOnePile.concat(cardPot)//add card won onto pile for future use in deck api
      });



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
  
            // document.querySelector(`.war__button`).disabled = true;
  
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
            return this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
  
  
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
  
            // document.querySelector(`.war__button`).disabled = false;
  
            this.equalCardDuel(cardPot);
            return this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);

        } else {
            this.equalCardDuel(cardPot);
            return this.renderCards(this.state.playerOneCurrentCard, this.state.playerTwoCurrentCard);
        }
    }
  
  
  }


  equalCardDuel = (cardPot) => {
      let card1 = this.cardNumber(this.state.playerOneCurrentCard) ;
      let card2 = this.cardNumber(this.state.playerTwoCurrentCard);
      let odd = 1;
      let even =2;


      while(card1 === card2){

        cardPot.push(this.state.playerOneDeck[odd],this.state.playerTwoDeck[odd]);



        cardPot.push(this.state.playerOneDeck[even],this.state.playerTwoDeck[even]);

        console.log(this.state.playerOneDeck);
        console.log(this.state.playerTwoDeck);
        if (this.cardNumber(this.state.playerOneDeck[even]) > this.cardNumber(this.state.playerTwoDeck[even])){


          this.setState({
            winnerToken: 1,
            playerOnePile: this.state.playerOnePile.concat(cardPot)//add card won onto pile for future use in deck api
          });
            
            this.state.playerOneDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
            this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player two deck bc they lost
            
            this.setState({
              playerOneCurrentCard: this.state.playerOneDeck[even],
              playerTwoCurrentCard: this.state.playerTwoDeck[even]
            });

            console.log(this.state.playerOneDeck[even]);
            console.log(this.state.playerTwoDeck[even]);
            console.log(cardPot);
            cardPot = []; 

            

        
            break
        } else if (this.cardNumber(this.state.playerTwoDeck[even]) > this.cardNumber(this.state.playerOneDeck[even])){

          this.setState({
            winnerToken: 2,
            playerTwoPile: this.state.playerTwoPile.concat(cardPot)//add card won onto pile for future use in deck api
          });

            this.state.playerTwoDeck.splice(0,cardPot.length/2);//removes card from player one deck bc it is already in pile 
            this.state.playerOneDeck.splice(0,cardPot.length/2);

            this.setState({
              playerOneCurrentCard: this.state.playerOneDeck[even],
              playerTwoCurrentCard: this.state.playerTwoDeck[even]
            });

            console.log(this.state.playerOneDeck[even]);
            console.log(this.state.playerTwoDeck[even]);

            console.log(cardPot);
            cardPot = []; 

            break
        } else if (this.cardNumber(this.state.playerOneDeck[even]) === this.cardNumber(this.state.playerTwoDeck[even])){
            card1 = this.cardNumber(this.state.playerOneDeck[even]); 
            card2 = this.cardNumber(this.state.playerTwoDeck[even]);
            odd = odd + 2;
            even = even + 2;
        }
      }
      
  }
