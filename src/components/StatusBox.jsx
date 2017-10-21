import React, { Component } from 'react'

export default class MainContainer extends Component{
  render(){
    return(
      <div id='status-box'>
        <div id='status-header'>
          <div id='queued-msgs'>
          Queued Message
          </div>
          <div id='blue-msg-content'>
          </div>
          <div id='blue-dot'>
          </div>
        </div>
        <div id='status-info'>
        </div>
      </div>
    )
  }
}
