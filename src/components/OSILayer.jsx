import React from 'react'
import { Button } from 'react-materialize'

export default class OSILayer extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <Button className='osi-layer'>
        {this.props.layer}
      </Button>
    )
  }
}
