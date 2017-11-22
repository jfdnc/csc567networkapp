import React from 'react'
import OSILayer from './OSILayer'
import Fade from './Fade'
import { Icon, Button } from 'react-materialize'
import { addMessage } from '../action/actions/message_actions'
import DisplayStore from '../data/stores/DisplayStore'
import Reveal from './Reveal'

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
      type: props.type,
      revealDisplayed: DisplayStore.getRevealDisplayed()
    }

    this.state.layers = this.state.type == 'host' ? OSILayers : OSILayers.slice(-3)
  }


  componentWillMount(){
    DisplayStore.on('change', ()=> {
      this.setState({revealDisplayed: DisplayStore.getRevealDisplayed()})
    })
  }

  render(){
    return(
        <Fade>
          <div
            style={{
              transform: `translateX(${this.state.offsetX}px) translateY(${this.state.offsetY}px)`,
            }}>

            <div id={`${this.state.hostName}-reveal-container`}
                 className='layer-reveal-container'>
                 <Reveal layer={this.state.revealDisplayed}/>
            </div>

            <div className='osi-layover handle'
                   id={`${this.state.hostName}-osi-layover`}>

            <div className='osi-layover-header'>
              <div className='host-name'>
                {this.state.hostName}
              </div>
            </div>

            {this.state.layers.map((thisLayer,i)=>
              <OSILayer key={i}
                        parent={`${this.state.hostName}-osi-layover`}
                        reveal={`${this.state.hostName}-reveal-container`}
                        type={this.state.type}
                        layer={thisLayer}
                        currRevealDisplayed={this.state.revealDisplayed}/>)}

            </div>
          </div>
        </Fade>
    )
  }
}
