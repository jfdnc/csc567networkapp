import React, { Component } from 'react'
import MessageStore from '../data/stores/MessageStore'
import DisplayStore from '../data/stores/DisplayStore'
import PathDisplay from './PathDisplay'

export default class StatusBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      currAssignment: DisplayStore.getCurrAssignment(),
      activeTab: 'network',
      messages: MessageStore.getMessageState().messages,
      currStatus: props.status,
      prevStatus: props.status
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.generateMessageList = this.generateMessageList.bind(this)
  }

  componentWillMount(){
    MessageStore.on('change', ()=> {
      this.setState({messages: MessageStore.getMessageState().messages})
    })
    DisplayStore.on('change', ()=> {
      this.setState({currAssignment: DisplayStore.getCurrAssignment()})
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({currStatus:nextProps.status, prevStatus:this.state.currStatus})
  }

  handleClick(tab){
    if(!(tab === this.state.activeTab)){
      this.setState({activeTab:tab})
    }
  }

  handleMouseOver(element){
    if(element.id){
      let node = document.getElementById(element.id)
      let nodeLabel = document.createElement('div')
      nodeLabel.style.position = 'absolute'
      nodeLabel.style.color = 'rgba(64,200,220,0.7)'
      nodeLabel.innerHTML = `${element.id.split('-')[0]}`
      nodeLabel.id = 'node-label'
      node.style.background = 'rgba(64,200,220,0.4)'
      node.style.borderRadius = '8px'
      node.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)'
      node.appendChild(nodeLabel)
    } else {
      let from = document.getElementById(`${element.links.from}-${this.state.currAssignment}`)
      let fromLabel = document.createElement('div')
      fromLabel.style.position = 'absolute'
      fromLabel.style.color = '#32cd32'
      fromLabel.innerHTML = `${element.links.from}`
      fromLabel.id = 'from-label'
      from.style.background = 'rgba(64,200,64,0.4)'
      from.style.borderRadius = '8px'
      from.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)'
      from.appendChild(fromLabel)

      let to = document.getElementById(`${element.links.to}-${this.state.currAssignment}`)
      let toLabel = document.createElement('div')
      toLabel.style.position = 'absolute'
      toLabel.style.color = '#32cd32'
      toLabel.innerHTML = `${element.links.to}`
      toLabel.id = 'to-label'
      to.style.background = 'rgba(64,200,64,0.4)'
      to.style.borderRadius = '8px'
      to.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)'
      to.appendChild(toLabel)
    }
  }
  handleMouseOut(element){
    if(element.id){
      let node = document.getElementById(element.id)
      let nodeLabel = document.getElementById('node-label')
      node.style.background = ''
      node.style.borderRadius = ''
      node.style.boxShadow = ''
      node.removeChild(nodeLabel)
    } else {
      let from = document.getElementById(`${element.links.from}-${this.state.currAssignment}`)
      let fromLabel = document.getElementById('from-label')
      from.style.background = ''
      from.style.borderRadius = ''
      from.style.boxShadow = ''
      fromLabel.parentNode.removeChild(fromLabel)

      let to = document.getElementById(`${element.links.to}-${this.state.currAssignment}`)
      let toLabel = document.getElementById('to-label')
      to.style.background = ''
      to.style.borderRadius = ''
      to.style.boxShadow = ''
      toLabel.parentNode.removeChild(toLabel)
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
    let netStat = this.state.prevStatus
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
              <div id='status-nodes'>
              Nodes:
              <ul>
                {netStat.nodes.length ? netStat.nodes.map((node,i) => {
                  return(
                    <li key={i} onMouseOver={() => this.handleMouseOver(node)} onMouseOut={() => this.handleMouseOut(node)}>
                      <b>{node.id.split('-')[0]}</b>
                    </li>
                  )
                }) : ''}
              </ul>
              </div>
              <div id='status-links'>
              Links and Weights:
              <ul>
                {netStat.links.length ? netStat.links.map((link,i) => {
                  return(
                    <li key={i} onMouseOver={() => this.handleMouseOver(link)} onMouseOut={() => this.handleMouseOut(link)}>
                      <b>{link.links.from}</b>-<b>{link.links.to}</b>: (<b style={{color:'blue'}}>{link.w1}</b>,<b style={{color:'red'}}>{link.w2}</b>)
                    </li>
                  )
                }) : ''}
              </ul>
              </div>
              <div id='path-display-container'>
                <PathDisplay {...this.props.status}/>
              </div>
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
