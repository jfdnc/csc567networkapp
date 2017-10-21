import React, { Component } from 'react'
import NodeField from './NodeField'
import StatusBox from './StatusBox'
import { Button } from 'react-materialize'
var btnClr = 'teal lighten-4'

export default class FieldContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id='field-container'>
        <StatusBox/>
        <NodeField/>
        <Button floating fab='horizontal' icon='more_horiz' className={btnClr} large style={{bottom: '45px', right: '24px'}}>
        	<Button floating icon='navigate_before' className={btnClr}/>
        	<Button floating icon='navigate_next' className={btnClr}/>
        </Button>
      </div>
    )
  }
}
