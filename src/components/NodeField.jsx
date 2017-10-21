import React, { Component } from 'react'
import DisplayStore from '../data/stores/DisplayStore'
import AssignmentPreset from './AssignmentPreset'

export default class MainContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      assignment: this.loadView(DisplayStore.getCurrAssignment())
    }

    this.loadView = this.loadView.bind(this)
  }

  componentWillMount(){
    DisplayStore.on("change", () => {
      this.setState({
        assignment: this.loadView(DisplayStore.getCurrAssignment())
      })
    })
  }

  loadView(a){
    switch(a){
      case 'default':
      return <AssignmentPreset a='d' />
      case 'a1':
      return <AssignmentPreset a='1' />
      break
      case 'a2':
      return <AssignmentPreset a='2' />
      break
      case 'a3':
      return <AssignmentPreset a='3' />
      break
    }
  }

  render(){
    return(
      <div id='node-field-container'>
        {this.state.assignment}
      </div>
    )
  }
}
