import React from 'react'
import NetLink from './NetLink'
export default class LinkField extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div id='link-field-container'>
        <div id='link-field'>
          <NetLink />
        </div>
      </div>
    )
  }
}
