import React, { Component } from 'react'
import MessageStore from '../data/stores/MessageStore'
import DisplayStore from '../data/stores/DisplayStore'
import PathDisplay from './PathDisplay'
import { Button } from 'react-materialize'

export default class StatusBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      currAssignment: DisplayStore.getCurrAssignment(),
      activeTab: 'network',
      messageState: MessageStore.getMessageState(),
      currStatus: props.status,
      prevStatus: props.status
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.generateMessageList = this.generateMessageList.bind(this)
    this.sendMessages = this.sendMessages.bind(this)
    this.calculateHop = this.calculateHop.bind(this)
  }

  componentWillMount(){
    MessageStore.on('change', ()=> {
      if(MessageStore.getMessageState().count > 0){
        document.getElementById('submit-message-button').style = 'pointer-events: auto;color:#2e5d67;background:#bfd2d1;'
      } else {
        document.getElementById('submit-message-button').style = 'pointer-events: none;color:#cdcdcd;background:#898989;'
      }
      this.setState({messageState: MessageStore.getMessageState()})
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

  generateMessageList(msgCount){
    if(msgCount == 0 ){
      return false
    } else if(msgCount == 1){
      return(
        <ul>
          <li className='message-list-item'>
            <b style={{color:'blue'}}>{this.state.messageState.messages.blue.content}</b>
          </li>
        </ul>
      )
    } else {
      return(
        <ul>
          <li className='message-list-item'>
            <b style={{color:'blue'}}>{this.state.messageState.messages.blue.content}</b>
          </li>
          <li className='message-list-item'>
            <b style={{color:'red'}}>{this.state.messageState.messages.red.content}</b>
          </li>
        </ul>
      )
    }
  }

  sendMessages(){
    document.getElementById('submit-message-button').style = 'pointer-events: none;color: #cdcdcd;background: #898989;'
    let mState = Object.assign({},this.state.messageState)
    let assignment = this.state.currAssignment

    let [ blueTotal,redTotal ] =
    [...Object.values(MessageStore.getMessageState().paths)
      .map(colorArr => colorArr
        .map(ele => ele.weight).reduce((acc,next) => acc += next)
      )]
    let totalWeights = {
      blue: blueTotal,
      red: redTotal
    }

    for(let i=0; i<mState.count; i++){
      let color = Object.keys(mState.messages)[i]
      let thisState = Object.assign({},
        mState.messages[color],
        {path:mState.paths[color]}
      )

      let errorAdded = false
      for(let i=0; i<thisState.path.length; i++){
        let randomNum = Math.floor(Math.random()*1000)
        let faultRange = 500
        if(!errorAdded && randomNum < faultRange && i > 0 && i < thisState.path.length){
          let errorPath = []
          for(let j=i; j>=0; j--){
            errorPath.push(
              {
                from: thisState.path[j].to,
                to: thisState.path[j].from,
                weight: (Math.floor(totalWeights[color]/i)/2),
                ackFrame: true,
                errorPath: true,
                droppedOnFrame: j == i ? true : false
              }
            )
          }

          let returnPath = thisState.path.slice(0,i+1).map((path,i) => {
            return (
              {
                from: path.from,
                to: path.to,
                weight: path.weight,
                repeatFrame: true,
                errorPath: true,
                rootNodeResend: i == 0 ? true : false
              }
            )
          })
          thisState.path = thisState.path.slice(0,i+1)
                                         .concat(errorPath)
                                         .concat(returnPath)
                                         .concat(thisState.path.slice(i+1))
        errorAdded = true
        }
      }

      let revPath = thisState.path.slice().map(path => {
          return(
            {
              from: path.to,
              to: path.from,
              hostAckFrame: true,
              weight: 1,
              returningPath: true,
              errorPath: path.errorPath ? true : false
            }
          )
      }).reverse()

      revPath = revPath.slice().filter(path => !path.errorPath)
      //speed it up!
      let weightScale = .3
      thisState.path = thisState.path.concat(revPath).map(pathSegment => Object.assign({},pathSegment, {weight:weightScale*pathSegment.weight}))


      let waitTime = 0
      let thisTransitTime = 0
      for(let i=0; i<thisState.path.length; i++){
        thisTransitTime = thisState.path[i].weight
        let dels = this.calculateHop(thisState.path[i])
        let thisMessage = document.getElementById(`new-message-div-${color}`)
        setTimeout(() => {
          let leavingNode = document.getElementById(`${thisState.path[i].from}-${this.state.currAssignment}`)
          let ding = document.createElement('div')
          ding.id = 'ding'
          ding.style = `transform: translate(${(leavingNode.clientWidth/2)-10}px,-${leavingNode.clientHeight}px); color: yellow;`
          if(thisState.path[i].ackFrame){
            if(thisState.path[i].droppedOnFrame){
              ding.innerHTML = 'CRC Failed: Packet Dropped'
            }
            leavingNode.appendChild(ding)
            setTimeout(() => {
            ding.style = `opacity: 0; transform: translate(${(leavingNode.clientWidth/2)-10}px,-${leavingNode.clientHeight+15}px); color: yellow;`
          },weightScale*2000)
            thisMessage.style.visibility = 'hidden'
          } else if(thisState.path[i].hostAckFrame && thisState.path[i].from == 'host1'){
            ding.innerHTML = `Host 0 <b style="color:${color};">${color}</b> Message Received: Sending ACK`
            ding.style.color = 'green'
            leavingNode.appendChild(ding)
            setTimeout(() => {
            ding.style = `opacity: 0; transform: translate(${(leavingNode.clientWidth/2)-10}px,-${leavingNode.clientHeight+15}px);`
          },weightScale*3500)
            thisMessage.style.visibility = 'visibile'
            thisMessage.style.background = 'green'
            thisMessage.style.boxShadow = `0 0 10px 3px ${color}`
            thisMessage.style.width = '19px'
            thisMessage.style.height = '19px'
          } else if(thisState.path[i].hostAckFrame){
            thisMessage.style.visibility = 'visibile'
            thisMessage.style.background = 'green'
            thisMessage.style.boxShadow = `0 0 10px 3px ${color}`
            thisMessage.style.width = '19px'
            thisMessage.style.height = '19px'
          } else if(thisState.path[i].repeatFrame){
            if(thisState.path[i].rootNodeResend){
              ding.innerHTML = `TIMEOUT: Retransmitting ${color} message`
            }
            ding.style.color = `${color}`
            leavingNode.appendChild(ding)
            setTimeout(() => {
            ding.style = `opacity: 0; transform: translate(${(leavingNode.clientWidth/2)-10}px,-${leavingNode.clientHeight+15}px);`
          },weightScale*2000)
            thisMessage.style.visibility = 'visible'
            thisMessage.style.background = `${color}`
            thisMessage.style.boxShadow = '0 0 6px rgba(226,240,24,.7)'
            thisMessage.style.width = '25px'
            thisMessage.style.height = '25px'
          } else {
            thisMessage.style.visibility = 'visible'
            thisMessage.style.background = `${color}`
            thisMessage.style.boxShadow = '0 0 6px rgba(226,240,24,.7)'
            thisMessage.style.width = '25px'
            thisMessage.style.height = '25px'
          }
          thisMessage.style.transition = `transform ${thisState.path[i].weight}s linear`
          thisMessage.style.transform += `translate(${dels.delX}px,${dels.delY}px)`
        }, waitTime)
        waitTime += 1000*thisTransitTime
      }
    }
  }

  calculateHop(pathState){
    let from = document.getElementById(`${pathState.from}-${this.state.currAssignment}`).getBoundingClientRect()
    let to = document.getElementById(`${pathState.to}-${this.state.currAssignment}`).getBoundingClientRect()

    let delX = to.x - from.x
    let delY = to.y - from.y

    return {
      delX: delX.toFixed(2),
      delY: delY.toFixed(2)
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
             <div style={{fontSize:'12px'}}>System Messages
             <hr/>
             </div>
             <div id='message-list'>
              {this.generateMessageList(this.state.messageState.count) || 'No messages in system'}
             </div>
             <Button id='submit-message-button' onClick = {() => this.sendMessages()}>Send</Button>
        </div>
      </div>
    )
  }
}
