import React from 'react'
import NetworkStore from '../../data/stores/NetworkStore'
import { addMessage, clearMessages } from '../../action/actions/message_actions'

export default class AppReveal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      paths:{
        ...NetworkStore.getNetworkState().pathStats.currPath
      },
      locations:{
        ...NetworkStore.getNetworkState().nodeLocations
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type){
    let input = document.getElementById('message-input')
    if(type === 'add'){
      if(input.value.length){addMessage(input.value)}
      input.value = ''
    } else if (type === 'del') {
      clearMessages()
      input.value = ''
    } else {
      console.log('error adding/deleting message')
    }
  }

  render(){
    return(
      <div className='layer-reveal-content-wrap'>
        <div className='layer-reveal-content-header'>Application Layer</div>
        <div className='layer-reveal-content-widget'>
        <div className='app-widget'>
          <input id='message-input'></input>
          <button id='queue-message' onClick={() => this.handleClick('add')}>Queue Message</button>
          <button id='clear-message' onClick={() => this.handleClick('del')}>Clear Queue</button>
        </div>
        </div>
      </div>
    )
  }
}
