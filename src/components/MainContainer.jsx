import React, { Component } from 'react'
import AppNav from './AppNav'
import FieldContainer from './FieldContainer'


export default class MainContainer extends Component{
  render(){
    return(
      <div id='main-container'>
        <AppNav/>
        <FieldContainer/>
      </div>
    )
  }
}
