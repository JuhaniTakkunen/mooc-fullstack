import React from 'react'
import { connect } from 'react-redux'


class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (this.props.notification === null || this.props.notification[0] === null){
      return (<div className="notification"/>)
    }
    return (
      <div style={style} className={this.props.notification[1] ? 'notification error' : 'notification success'}>
        { this.props.notification[0] }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    isError: state.isError
  }
}

export default connect(
  mapStateToProps
)(Notification)
