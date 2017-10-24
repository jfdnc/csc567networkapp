import React, { Component } from 'react'

export default class StatusBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      activeTab: 'network'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    document.getElementById(`${this.state.activeTab}-status-tab`).className = 'status-tab status-tab-active'
  }

  handleClick(tab){
    let prevActiveTab = this.state.activeTab
    if(!(tab === prevActiveTab)){
      document.getElementById(`${prevActiveTab}-status-tab`).className = 'status-tab'
      document.getElementById(`${tab}-status-tab`).className = 'status-tab status-tab-active'
      this.setState({activeTab:tab})
    }
  }

  render(){
    return(
      <div id='status-box'>
        <div id='status-box-tabs'>
          <div onClick={()=>this.handleClick('network')} className='status-tab' id='network-status-tab'>
            Network
          </div>
          <div onClick={()=>this.handleClick('message')} className='status-tab' id='message-status-tab'>
            Messages
          </div>
        </div>
        <div id='status-box-window-container'>
          <div id='status-box-window'>
          </div>
        </div>
      </div>
    )
  }
}
