import React from 'react'
import cSprite from '../images/computersprite.png'
import rSprite from '../images/routersprite2.png'
import OSILayover from './OSILayover'

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
      <div className='node-container'
           id={this.state.id}
           style = {{
             gridRow: this.state.row,
             gridColumn: this.state.col,
           }}>
      <div className='node'
           onClick={this.handleClick}><img src={this.state.img}/>
           </div>
           {this.state.layover}
      </div>

    )
  }
}
