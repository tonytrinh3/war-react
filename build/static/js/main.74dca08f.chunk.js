(this["webpackJsonpwar-react"]=this["webpackJsonpwar-react"]||[]).push([[0],{10:function(e,a,t){e.exports=t(16)},16:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(4),l=t.n(c),s=t(1),i=t.n(s),o=t(5),p=t(6),d=t(8),y=t(7),u=t(9),k=(t(3),function(e){var a=2,t=3;return e.index===a||e.index===t?(a+=4,t+=4,n.a.createElement("img",{className:"playing-card playing-card--"+e.playerNumber,src:"https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg",alt:"back of card"})):n.a.createElement("img",{className:"playing-card playing-card--"+e.playerNumber,src:e.card.image,alt:e.card.code})}),m=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(d.a)(this,Object(y.a)(a).call(this,e))).cardNumber=function(e){var a=e.code.split("")[0];return"A"===a?14:"K"===a?13:"Q"===a?12:"J"===a?11:"0"===a?10:a},t.compareCards=function(e,a){var r;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if((r=[]).push(e,a),console.log(r),t.setState({renderCardArray:[]}),!(t.cardNumber(e)>t.cardNumber(a))){n.next=13;break}return t.state.playerOneDeck.splice(0,r.length/2),t.state.playerTwoDeck.splice(0,r.length/2),t.setState({playerOnePile:t.state.playerOnePile.concat(r),playerOneCurrentCard:t.state.playerOneDeck[0],playerTwoCurrentCard:t.state.playerTwoDeck[0],winnerToken:1,renderCardArray:r}),r=[],t.shufflePileDeck(),n.abrupt("return",t.renderCards(t.state.renderCardArray));case 13:if(!(t.cardNumber(a)>t.cardNumber(e))){n.next=22;break}return t.state.playerOneDeck.splice(0,r.length/2),t.state.playerTwoDeck.splice(0,r.length/2),t.setState({playerTwoPile:t.state.playerTwoPile.concat(r),playerOneCurrentCard:t.state.playerOneDeck[0],playerTwoCurrentCard:t.state.playerTwoDeck[0],winnerToken:2,renderCardArray:r}),r=[],t.shufflePileDeck(),n.abrupt("return",t.renderCards(t.state.renderCardArray));case 22:if(t.cardNumber(e)!==t.cardNumber(a)){n.next=25;break}return t.equalCardDuel(r),n.abrupt("return",t.renderCards(t.state.renderCardArray));case 25:case"end":return n.stop()}}))},t.equalCardDuel=function(e){for(var a=t.cardNumber(t.state.playerOneCurrentCard),r=t.cardNumber(t.state.playerTwoCurrentCard),n=1,c=2;a===r;){if(t.shufflePileDeck(),e.push(t.state.playerOneDeck[n],t.state.playerTwoDeck[n]),e.push(t.state.playerOneDeck[c],t.state.playerTwoDeck[c]),t.cardNumber(t.state.playerOneDeck[c])>t.cardNumber(t.state.playerTwoDeck[c])){t.state.playerOneDeck.splice(0,e.length/2),t.state.playerTwoDeck.splice(0,e.length/2),t.setState({playerOnePile:t.state.playerOnePile.concat(e),playerOneCurrentCard:t.state.playerOneDeck[c],playerTwoCurrentCard:t.state.playerTwoDeck[c],winnerToken:1,renderCardArray:e}),e=[];break}if(t.cardNumber(t.state.playerTwoDeck[c])>t.cardNumber(t.state.playerOneDeck[c])){t.state.playerOneDeck.splice(0,e.length/2),t.state.playerTwoDeck.splice(0,e.length/2),t.setState({playerTwoPile:t.state.playerTwoPile.concat(e),playerOneCurrentCard:t.state.playerOneDeck[c],playerTwoCurrentCard:t.state.playerTwoDeck[c],winnerToken:2,renderCardArray:e}),e=[];break}t.cardNumber(t.state.playerOneDeck[c])===t.cardNumber(t.state.playerTwoDeck[c])&&(a=t.cardNumber(t.state.playerOneDeck[c]),r=t.cardNumber(t.state.playerTwoDeck[c]),n+=2,c+=2)}},t.shufflePileDeck=function(){var e=function(e,a,r){var n,c;return i.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return n=function(e,a){return e.concat(a).map((function(e){return e.code}))},l.t0=i.a,l.next=4,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/".concat(t.state.deck_id,"/pile/").concat(e,"/add/?cards=").concat(n(a,r).toString())));case 4:return l.t1=l.sent.json(),l.next=7,l.t0.awrap.call(l.t0,l.t1);case 7:return l.sent,l.t2=i.a,l.next=11,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/".concat(t.state.deck_id,"/pile/").concat(e,"/shuffle/")));case 11:return l.t3=l.sent.json(),l.next=14,l.t2.awrap.call(l.t2,l.t3);case 14:return l.sent,l.t4=i.a,l.next=18,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/".concat(t.state.deck_id,"/pile/").concat(e,"/draw/?count=").concat(n(a,r).length)));case 18:return l.t5=l.sent.json(),l.next=21,l.t4.awrap.call(l.t4,l.t5);case 21:c=l.sent,console.log(c.cards),"playerOneDeck"===e?t.setState({playerOneDeck:c.cards,playerOnePile:[]}):"playerTwoDeck"===e&&t.setState({playerTwoDeck:c.cards,playerTwoPile:[]}),console.log(t.state.playerOneDeck),console.log(t.state.playerTwoDeck);case 27:case"end":return l.stop()}}))};3===t.state.playerOneDeck.length&&3===t.state.playerTwoDeck.length?(e("playerOneDeck",t.state.playerOneDeck,t.state.playerOnePile),e("playerTwoDeck",t.state.playerTwoDeck,t.state.playerTwoPile)):3===t.state.playerOneDeck.length?e("playerOneDeck",t.state.playerOneDeck,t.state.playerOnePile):3===t.state.playerTwoDeck.length&&e("playerTwoDeck",t.state.playerTwoDeck,t.state.playerTwoPile)},t.changeCard=function(){t.state.playerOneCurrentCard&&t.compareCards(t.state.playerOneCurrentCard,t.state.playerTwoCurrentCard)},t.renderCards=function(e){var a=e.map((function(e,a){return n.a.createElement(k,{card:e,playerNumber:a%2===0?1:2,key:e.code,index:a})}));if(t.state.renderCardArray)return a},t.state={deck_id:"",deckSize:52,playerOneDeck:[],playerTwoDeck:[],playerOnePile:[],playerTwoPile:[],playerOneCurrentCard:null,playerTwoCurrentCard:null,winnerToken:0,renderCardArray:[]},t}return Object(u.a)(a,e),Object(p.a)(a,[{key:"componentDidMount",value:function(){var e,a,t,r;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"));case 3:return e=n.sent,n.next=6,i.a.awrap(e.json());case 6:return a=n.sent,n.t0=i.a,n.next=10,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/".concat(a.deck_id,"/draw/?count=").concat(this.state.deckSize/2)));case 10:return n.t1=n.sent.json(),n.next=13,n.t0.awrap.call(n.t0,n.t1);case 13:return t=n.sent,n.t2=i.a,n.next=17,i.a.awrap(fetch("https://deckofcardsapi.com/api/deck/".concat(a.deck_id,"/draw/?count=").concat(this.state.deckSize/2)));case 17:return n.t3=n.sent.json(),n.next=20,n.t2.awrap.call(n.t2,n.t3);case 20:r=n.sent,this.setState({deck_id:a.deck_id,playerOneDeck:t.cards,playerTwoDeck:r.cards,playerOneCurrentCard:t.cards[0],playerTwoCurrentCard:r.cards[0]}),n.next=27;break;case 24:n.prev=24,n.t4=n.catch(0),alert(n.t4);case 27:case"end":return n.stop()}}),null,this,[[0,24]])}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"playing-area"},e.state.renderCardArray===[]?null:e.renderCards(e.state.renderCardArray),n.a.createElement("h3",{className:"playing-area-text"},0===e.state.winnerToken?null:1===e.state.winnerToken?"Player One wins this round":"Player Two wins this round")),n.a.createElement("div",{className:"playing-pile-area"},n.a.createElement("h1",{className:"playing-pile-text playing-pile-text--1"},"Player One Pile ",this.state.playerOnePile.length),e.state.playerOnePile===[]?null:e.state.playerOnePile.length>=2?n.a.createElement("img",{className:"playing-pile playing-pile--1",src:"https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg",alt:"back of card"}):void 0,n.a.createElement("h1",{className:"playing-pile-text playing-pile-text--2"},"Player Two Pile ",this.state.playerTwoPile.length),e.state.playerTwoPile===[]?null:e.state.playerTwoPile.length>=2?n.a.createElement("img",{className:" playing-pile playing-pile--2",src:"https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg",alt:"back of card"}):void 0),n.a.createElement("div",{className:"playing-deck-area"},n.a.createElement("h1",{className:"playing-deck-text playing-deck-text--1"},"Player One Deck ",this.state.playerOneDeck.length),e.state.playerOneDeck===[]?null:n.a.createElement("img",{className:"playing-deck playing-deck--1",src:"https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg",alt:"back of card"}),n.a.createElement("h1",{className:"playing-deck-text playing-deck-text--2"},"Player Two Deck ",this.state.playerTwoDeck.length),e.state.playerTwoDeck===[]?null:n.a.createElement("img",{className:"playing-deck playing-deck--2",src:"https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg",alt:"back of card"}),n.a.createElement("button",{className:"btn war-button",onClick:this.changeCard},"Time to War")),n.a.createElement("div",{className:"rule-text"},n.a.createElement("h1",null,"Note: This game will have bugs over time when you continue to play the game")))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},3:function(e,a,t){}},[[10,1,2]]]);
//# sourceMappingURL=main.74dca08f.chunk.js.map