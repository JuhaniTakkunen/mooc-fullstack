import React from 'react';
import ReactDOM from 'react-dom';

import CourseStatistics from './CourseStatistics';
import PhoneBook from './PhoneBook';


const Button = (props) => {
    return (
        <button onClick={props.event}>{props.label}</button>
    )
};


class App extends React.Component {


    launchAppCourseStatistics = () => {
        ReactDOM.render(<CourseStatistics />, document.getElementById('root'));
    };
    launchAppPhoneBook = () => {
        ReactDOM.render(<PhoneBook />, document.getElementById('root'));
    };

    render() {
        return (
            <div>

                <Button event={this.launchAppCourseStatistics} label='CourseStatistics'/>
                <Button event={this.launchAppPhoneBook} label='PhoneBook'/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
