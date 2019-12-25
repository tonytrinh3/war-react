import React from "react";

const RenderCard = (props) => {
    // console.log(props.card.image);
    // const image = props.card.image;
    // const code = props.card.code;

    const images = props.cards.map((card)=>{
        return <img className = {"card--" + props.playerNumber} src ={card.image} alt = {card.code}/>
    })
    
    return (
        
        <div>
        {images}
        </div>
    )
    

}

export default RenderCard;

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
