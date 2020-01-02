import React from "react";

class SearchBar extends React.Component{

    state = {term: ''};

    //call method when someone changes the text within input
    //event object - contains a bunch of information of the event that just occurred
    //you need to call big arrow function in order to use this.onInputchange within the return - need this point back to the searchbar class
    onInputChange =(event)=>{
        //value of the input 
        
        this.setState({term: event.target.value});
        //this will allow you to pass this.state.term - whatever search term you type into the search bar - back to the function onSubmit of the props
        //onSubmit is a function that is passed down from App.js - and then you are passing this.state.term through the function
        //and then the console.log of app is reading the state.term
        this.props.onSubmit(this.state.term);
    }

    onFormSubmit = (event) =>{
        //event object has preventdefault that is given in by either javascript or react 
        //you do this in order to prevent the page to refresh when you press button or enter to submit data 
        event.preventDefault();
        console.log(this.state.term);
    }

    //we want the value from the html world and put it into the React world - into our state - we want to keep what value is input in html in react 
    render(){
        return (
            <div>
            <form onSubmit = {this.onFormSubmit}>
                <input 
                type = "text" 
                value = {this.state.term} 
                onChange={this.onInputChange}/>
            </form>

            </div>

        )
    }
}

export default SearchBar;