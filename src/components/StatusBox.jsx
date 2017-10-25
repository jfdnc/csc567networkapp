import React, { Component } from 'react'
import MessageStore from '../data/stores/MessageStore'

export default class StatusBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      activeTab: 'network',
      messages: MessageStore.getMessageState().messages
    }

    this.handleClick = this.handleClick.bind(this)
    this.generateMessageList = this.generateMessageList.bind(this)
  }

  componentWillMount(){
    MessageStore.on('change', ()=> {
      this.setState({messages: MessageStore.getMessageState().messages})
    })
  }

  handleClick(tab){
    if(!(tab === this.state.activeTab)){
      this.setState({activeTab:tab})
    }
  }

  generateMessageList(list){
    if(list.length == 0 ){
      return false
    } else {
      return(
        <ul>
          {
            list.map((message,i)=>{
              return(
                <li key={i} className='message-list-item'>
                  {message.id}
                </li>
              )
            })
          }
        </ul>
      )
    }
  }

  render(){
    let activeTab = this.state.activeTab
    return(
      <div id='status-box'>
        <div id='status-box-tabs'>
          <div onClick={()=>this.handleClick('network')}
               className={`${activeTab == 'network' ? 'status-tab status-tab-active' : 'status-tab'}`}
               id='network-status-tab'>
            Network
          </div>
          <div onClick={()=>this.handleClick('message')}
               className={`${activeTab == 'message' ? 'status-tab status-tab-active' : 'status-tab'}`}
               id='message-status-tab'>
            Messages
          </div>
        </div>
        <div id='status-box-window-container'>
          <div id='status-box-window'>
            <div className={`${activeTab == 'network' ? 'active' : 'inactive'}`}
                 id='network-status-content'>
                 network content
            </div>
            <div className={`${activeTab == 'message' ? 'active' : 'inactive'}`}
                 id='message-status-content'>
              <div id='message-id'>
                Message ID:
               </div>
               <div id='message-node'>
                Node:
               </div>
               <div id='message-current-layer'>
                OSI Layer:
               </div>
               <div id="message-detail">

               </div>
            </div>
          </div>

        </div>
        <div className={`${activeTab == 'message' ? 'active' : 'inactive'}`}
             id='message-list-container'>
             <div style={{fontSize:'12px'}}>System Messages</div>
             <hr/>
             <div id='message-list'>
              {this.generateMessageList(this.state.messages) || 'No messages in system'}
             </div>
        </div>
      </div>
    )
  }
}
