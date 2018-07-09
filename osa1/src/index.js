import React from 'react'
import ReactDOM from 'react-dom'


const TitleFeedback = () => {
    return (
        <h1>anna palautetta</h1>
    )
};

const Statistics = (props) => {
    console.log(props);
    return (
        <div>
            <h1>statistiikka</h1>
            <p>Hyvä: {props.state.good}</p>
            <p>Neutraali: {props.state.neutral}</p>
            <p>Huono: {props.state.bad}</p>
        </div>
    )
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    addGood = () => {
        this.setState({
            good: this.state.good + 1
        });
        console.log(this.state);
    };

    addNeutral = () => {
        this.setState({
            neutral: this.state.neutral + 1
        });
        console.log(this.state);

    };
    addBad = () => {
        this.setState({
            bad: this.state.bad + 1
        });
        console.log(this.state);

    };

    render() {

        return (
            <div>
                <div>
                    <TitleFeedback />
                    <button onClick={this.addGood}>Hyvä</button>
                    <button onClick={this.addNeutral}>Neutraali</button>
                    <button onClick={this.addBad}>Huono</button>
                    <Statistics state={this.state}/>

                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
