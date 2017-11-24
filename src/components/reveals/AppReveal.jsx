import React from 'react'
import NetworkStore from '../../data/stores/NetworkStore'
import { addMessage, clearMessages } from '../../action/actions/message_actions'

export default class AppReveal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      ...NetworkStore.getNetworkState().pathStats.currPath
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type){
    if(type === 'add'){
      addMessage('cats')
    } else if (type === 'del') {
      clearMessages()
    } else {
      console.log('error adding/deleting message')
    }
  }

  render(){
    console.log(this.state)
    return(
      <div className='layer-reveal-content-wrap'>
        <div className='layer-reveal-content-header'>Application Layer</div>
        <div className='layer-reveal-content-text'>
          <p>The application layer is a cool guy and doesn't afraid of anything</p>
        </div>
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
