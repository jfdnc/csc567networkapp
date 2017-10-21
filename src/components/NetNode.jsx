import React from 'react'
import cSprite from '../images/computersprite.png'
import rSprite from '../images/routersprite2.png'

export default class NetNode extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      id:  props.obj.id,
      row: props.obj.row,
      col: props.obj.col,
      type: props.obj.type,
      img: props.obj.type == 'host' ? cSprite : rSprite
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    console.log(`clicked ${this.state.id}`)
  }

  render(){
    return(
      <div className='node'
           id={this.state.id}
           style = {{
             gridRow: this.state.row,
             gridColumn: this.state.col
           }}
           onClick={this.handleClick}><img src={this.state.img}/></div>
    )
  }
}
