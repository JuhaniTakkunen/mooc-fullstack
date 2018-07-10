import React from 'react';
import ReactDOM from 'react-dom';

import CourseStatistics from './CourseStatistics';


const Button = (props) => {
    return (
        <button onClick={props.event}>{props.label}</button>
    )
};


class App extends React.Component {


    launchAppCourseStatistics = () => {
        ReactDOM.render(<CourseStatistics />, document.getElementById('root'));
    };

    render() {
        return (
            <div>

                <Button event={this.launchAppCourseStatistics} label='CourseStatistics'/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
