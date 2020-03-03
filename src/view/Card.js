import React from "react";

import '../sass/main.scss';

const Card = (props) => {

    let burnCardIndex1 = 2;
    let burnCardIndex2 =3;
    
    if (props.index === burnCardIndex1 || props.index === burnCardIndex2) {
        burnCardIndex1 += 4;//in array of cards to display, we want to show the back of the card for index 2 and 3 bc they are burn cards. if we have more than 6 cards in war, then we would add +4 into the index to burn card index 6 and 7, 10 and 11, etc.
        burnCardIndex2 += 4;
        return <img className = {"playing-card playing-card--" + props.playerNumber} src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg" alt = "back of card"/>;
    } else {
        return <img className = {"playing-card playing-card--" + props.playerNumber} src ={props.card.image} alt = {props.card.code}/>
    }
}

export default Card;

// const renderCard = (card, playerNumber) =>{
            
//     const displayCard = `<img class = "card--${playerNumber}" src = ${card.image} alt = ${card.code}/>`;

//     // const cardIndex = (playerNumber*10)+index+1;

//     document.querySelector(`.players-card__player-${playerNumber}`).insertAdjacentHTML('beforeend',displayCard);

//     //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
//     let style = document.createElement('style');
//     style.innerHTML = `
//     .players-card__card {
//     background-color: green;
//     }
//     `;
//     document.head.appendChild(style);
//     //passed down the cards array from json, cardindex that is relevant to changing the card, and player number
//     // renderNewCard(cards,index, playerNumber);

// };
