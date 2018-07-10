import React from 'react';
import ReactDOM from 'react-dom';

import Unicafe from './Unicafe';
import Anecdote, {anecdotes} from './Anecdote';
import CourseStatistics from './CourseStatistics';


const Button = (props) => {
    return (
        <button onClick={props.event}>{props.label}</button>
    )
};


class App extends React.Component {

    launchAppUnicafe = () => {
        ReactDOM.render(<Unicafe />, document.getElementById('root'));
    };
    launchAppAnecdote = () => {
        ReactDOM.render(<Anecdote anecdotes={anecdotes}/>, document.getElementById('root'));
    };
    launchAppCourseStatistics = () => {
        ReactDOM.render(<CourseStatistics />, document.getElementById('root'));
    };

    render() {
        return (
            <div>
                <Button event={this.launchAppUnicafe} label='Unicafe'/>
                <Button event={this.launchAppAnecdote} label='Anecdote'/>
                <Button event={this.launchAppCourseStatistics} label='CourseStatistics'/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
