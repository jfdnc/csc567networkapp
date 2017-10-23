import React from 'react'
import OSILayer from './OSILayer'
import Fade from './Fade'
import { Icon } from 'react-materialize'

let OSILayers = [
  'Application',
  'Presentation',
  'Session',
  'Transport',
  'Network',
  'Data Link',
  'Physical'
]

export default class OSILayover extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      hostName: props.hostName,
      type: props.type
    }

    this.state.layers = this.state.type == 'host' ? OSILayers : OSILayers.slice(-3)
  }


  componentWillMount(){

  }

  render(){
    return(
        <Fade>
          <div
            style={{
              transform: `translateX(${this.state.offsetX}px) translateY(${this.state.offsetY}px)`,
            }}
            className='osi-layover handle'
            id={`${this.state.hostName}-osi-layover`}>
          <div className='osi-layover-header'>
            <div className='host-name'>
              {this.state.hostName}
            </div>
            <Icon className='icon-close'>close</Icon>
          </div>
          {this.state.layers.map((thisLayer,i)=><OSILayer key={i} layer={thisLayer}/>)}
          </div>
        </Fade>
    )
  }
}
