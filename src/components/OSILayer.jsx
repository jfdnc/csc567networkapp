import React from 'react'
import { Button } from 'react-materialize'
import { setReveal } from '../action/actions/display_actions'

export default class OSILayer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      layerOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(layer){
    let newState
    let prevReveal = this.props.currRevealDisplayed
    if(prevReveal === layer){
      newState = false
    } else {
      newState = true
    }
    setReveal(layer)

    let parentDiv = document.getElementById(this.props.parent),
        revealDiv = document.getElementById(this.props.reveal)

    if(newState){
      if(this.props.type === 'host'){
        parentDiv.style = 'transform: translateX(-180px)'
        revealDiv.style = 'width: 500px; height:322px; border-radius: 0 8px 8px 0'
      } else {
        parentDiv.style = 'transform: translateX(-145px)'
        revealDiv.style = 'width: 500px; height:322px; border-radius: 0 8px 8px 8px'
      }
    } else {
      parentDiv.style = 'transform: translateX(0)'
      revealDiv.style = 'width: 0px; visibility: hidden'
    }

    this.setState({
      layerOpen: newState
    })
  }

  render(){
    return(
      <Button id={`${this.props.layer}-layer`} className='osi-layer' onClick={() => this.handleClick(this.props.layer)}>
        {this.props.layer}
      </Button>
    )
  }
}
