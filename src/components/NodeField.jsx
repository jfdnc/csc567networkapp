import React, { Component } from 'react'
import DisplayStore from '../data/stores/DisplayStore'
import PresetLoader from './PresetLoader'

export default class NodeField extends Component{
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
