import React from 'react'
import ReactDOM from 'react-dom'


function getRndInteger(min, max) {  // https://www.w3schools.com/js/js_random.asp
    return Math.floor(Math.random() * (max - min)) + min;
}

const Button = (props) => {
    return (
        <button onClick={props.event}>{props.label}</button>
    )
};


const Anecdote = (props) => {
    return (
        <p>{props.anecdotes[props.state.selected]}</p>
    )
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            pisteet: new Array(this.props.anecdotes.length).fill(0)

        };

    }

    changeSelected = () => {
        this.setState({
            selected: getRndInteger(0, this.props.anecdotes.length)
        })
    };

    addVote = () => {
        const kopio = [...this.state.pisteet];
        kopio[this.state.selected] += 1;

        this.setState({
            pisteet: kopio
        })
    };


    render() {
        return (
            <div>
                <Anecdote anecdotes={this.props.anecdotes} state={this.state}/>
                <Button event={this.changeSelected} label='next anecdote'/>
                <Button event={this.addVote} label='vote'/>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);
