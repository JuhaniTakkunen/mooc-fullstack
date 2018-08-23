import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


import CourseStatistics from './CourseStatistics';
import Countries from './Countries';
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
    launchAppCountries = () => {
        ReactDOM.render(<Countries />, document.getElementById('root'));
    };

    render() {
        return (
            <div>

                <Button event={this.launchAppCourseStatistics} label='CourseStatistics'/>
                <Button event={this.launchAppPhoneBook} label='PhoneBook'/>
                <Button event={this.launchAppCountries} label='Countries'/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
