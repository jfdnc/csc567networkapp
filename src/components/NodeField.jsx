import React, { Component } from 'react'
import DisplayStore from '../data/stores/DisplayStore'
import MessageStore from '../data/stores/MessageStore'
import NetworkStore from '../data/stores/NetworkStore'
import PresetLoader from './PresetLoader'

export default class NodeField extends Component{
  constructor(props){
    super(props)

    this.state = {
      assignment: this.loadView(DisplayStore.getCurrAssignment()),
    }

    this.loadView = this.loadView.bind(this)
    this.mountMessage = this.mountMessage.bind(this)
  }

  componentWillMount(){
    DisplayStore.on("change", () => {
      this.setState({
        assignment: this.loadView(DisplayStore.getCurrAssignment())
      })
    })
    MessageStore.on("change", () => {
      this.mountMessage(MessageStore.getMessageState())
    })
  }

  loadView(a){
    switch(a){
      case 'default':
      return <PresetLoader a='d' />
      case 'a1':
      return <PresetLoader a='1' />
      break
      case 'a2':
      return <PresetLoader a='2' />
      break
      case 'a3':
      return <PresetLoader a='3' />
      break
    }
  }

  mountMessage(messageState){
    let prevBlue = document.getElementById('new-message-div-blue')
    let prevRed = document.getElementById('new-message-div-red')

    if(prevBlue){prevBlue.parentElement.removeChild(prevBlue)}
    if(prevRed){prevRed.parentElement.removeChild(prevRed)}
    for(let i=0; i<messageState.count; i++){
      let currColor = Object.keys(messageState.messages)[i]
      let currMessage = messageState.messages[currColor]
      let currPath = messageState.paths[currColor]
      let hostId = `${currPath[0].from}-${DisplayStore.getCurrAssignment()}`
      let hostNode = document.getElementById(hostId)
      let newMessageDiv = document.createElement('div')
      newMessageDiv.className = 'new-message-div'
      newMessageDiv.id = `new-message-div-${currColor}`
      newMessageDiv.style = `background-color: ${currColor}; transform: translateY(-${hostNode.clientHeight}px);`
      hostNode.appendChild(newMessageDiv)
    }
  }

  render(){
    return(
      <div id='node-field-container'>
        <div id='node-field'>
          {this.state.assignment}
        </div>
      </div>
    )
  }
}
