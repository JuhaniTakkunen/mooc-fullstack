import React from 'react';


const Notification = ({message, isError}) => {
    if (message === null) {
        return (
            <div className="notification"/>)
    }
    if (isError) {
        return (
            <div className="notification error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="notification success">
                {message}
            </div>
        )
    }
};

export default Notification
