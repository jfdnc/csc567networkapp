import React from 'react'
import cSprite from '../images/computersprite.png'
import rSprite from '../images/routersprite2.png'
import OSILayover from './OSILayover'
import Fade from './Fade'
import { addNodeLocation } from '../action/actions/network_actions'

export default class NetNode extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      id:  props.obj.id,
      row: props.obj.row,
      col: props.obj.col,
      type: props.obj.type,
      img: props.obj.type == 'host' ? cSprite : rSprite,
      layover: <div/>,
      layoverVisible: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.addLocation = this.addLocation.bind(this)
  }

  componentDidMount(){
    //needs to wait to render??
    setTimeout(this.addLocation, 200)
  }

  addLocation(){
    let thisRect = document
                      .getElementById(this.state.id)
                      .getBoundingClientRect(),
    thisNodeLocation = {}
    thisNodeLocation[`${this.state.id.split('-')[0]}`] = {
      x:thisRect.x,
      y:thisRect.y
    }

    addNodeLocation(thisNodeLocation)
  }

  handleClick(){
    let newLayoverState = !this.state.layoverVisible
    if(newLayoverState){
      let layoverOffsetX = document
                            .getElementById(this.state.id)
                            .getBoundingClientRect()
                            .width
      let layoverOffsetY = -(document
                            .getElementById(this.state.id)
                            .getBoundingClientRect()
                            .height)

      this.setState({
        layover: <OSILayover type={this.state.type}
                             hostName={this.state.id.split('-')[0]}
                             offsetX={layoverOffsetX} offsetY={layoverOffsetY}/>
      })
    } else {
      this.setState({
        layover: <div/>
      })
    }
    this.setState({layoverVisible: newLayoverState})
  }

  render(){
    return(
      <Fade>
        <div className='node-container'
             id={this.state.id}
             style = {{
               gridRow: this.state.row,
               gridColumn: this.state.col,
             }}>
        <div className='node'
             onClick={this.handleClick}><img src={this.state.img}/>
             <div style={{position:'absolute',color:'rgba(200,200,200,0.6)'}}>{this.state.id.split('-')[0]}</div>
             </div>
             {this.state.layover}
        </div>
      </Fade>
    )
  }
}
