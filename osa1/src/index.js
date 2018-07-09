import React from 'react'
import ReactDOM from 'react-dom'

const TitleFeedback = () => {
    return (
        <h1>anna palautetta</h1>
    )
};

const Statistics = (props) => {
    const state = props.state;
    const count = state.good + state.bad + state.neutral;
    const mean_ = state.good - state.bad;
    let positive_percent = 0;


    if (count>0) {
        positive_percent = Math.round(100. * state.good / count);
    }

    return (
        <div>
            <h1>statistiikka</h1>
            <p>Hyvä: {state.good}</p>
            <p>Neutraali: {state.neutral}</p>
            <p>Huono: {state.bad}</p>

            <p>Keskiarvo: {mean_}</p>
            <p>Positiivisia: {positive_percent}%</p>
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
