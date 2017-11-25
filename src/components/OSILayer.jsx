import React from 'react'
import { Button } from 'react-materialize'
import { toggleReveal, setReveal } from '../action/actions/display_actions'
import DisplayStore from '../data/stores/DisplayStore'

export default class OSILayer extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(layer){
    toggleReveal()
    let newState = DisplayStore.revealToggled()

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
      let allLayers = document.getElementsByClassName('osi-layer')
      for(let i=0; i<allLayers.length; i++){
        allLayers[i].style = 'color: #2e5d67;'
      }
    }
  }

  render(){
    return(
      <Button id={`${this.props.layer}-layer`} className='osi-layer' onMouseOver={(e) => this.props.onMouseOver(e)} onClick={() => this.handleClick(this.props.layer)}>
        {this.props.layer}
      </Button>
    )
  }
}
