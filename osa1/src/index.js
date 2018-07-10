import React from 'react'
import ReactDOM from 'react-dom'

const TitleFeedback = () => {
    return (
        <h1>anna palautetta</h1>
    )
};

const Statistic = (props) => {
    return (
        <p>{props.label}: {props.status}</p>
    )
};

const Statistics = (props) => {
    const state = props.state;
    const count = state.good + state.bad + state.neutral;
    const mean_ = state.good - state.bad;
    let positive_percent = "0%";


    if (count>0) {
        positive_percent = Math.round(100. * state.good / count) + "%";
        return (
            <div>
                <h1>statistiikka</h1>
                <Statistic label={'Hyvä'} status={state.good} />
                <Statistic label={'Neutraali'} status={state.neutral} />
                <Statistic label={'Huono'} status={state.bad} />

                <Statistic label={'Keskiarvo'} status={mean_} />
                <Statistic label={'Positiivisia'} status={positive_percent} />
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }



};

const Button = (props) => {
    return (
        <button onClick={props.event}>{props.label}</button>
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

    addFeedback = (type) => {
        return () => {
            this.setState({
                [type]: this.state[type] + 1
            })
        }
    };

    render() {

        return (
            <div>
                <div>
                    <TitleFeedback />
                    <Button event={this.addFeedback('good')} label={'Hyvä'} />
                    <Button event={this.addFeedback('neutral')} label={'Neutraali'} />
                    <Button event={this.addFeedback('bad')} label={'Huono'} />
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
