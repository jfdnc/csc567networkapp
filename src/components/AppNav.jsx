import React, { Component } from 'react'
import { Navbar, NavItem, Dropdown, Button, Row, Col } from 'react-materialize'
import { displayDefault, displayA1, displayA2, displayA3 } from '../action/actions/display_actions'

export default class AppNav extends Component{
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(a,e){
    e.preventDefault()
    switch(a){
      case 'default':
      displayDefault()
      break
      case 'a1':
      displayA1()
      break
      case 'a2':
      displayA2()
      break
      case 'a3':
      displayA3()
      break
    }
  }
  render(){
    return(
      <div id='app-nav-container'>
        <Navbar id='app-nav'>
          <Row>
            <Col sm={2}>
              <Dropdown trigger={
                <Button>Select Assignment</Button>
              }>
                <NavItem onClick={(e) => this.handleClick('a1',e)}>Assignment 1</NavItem>
                <NavItem onClick={(e) => this.handleClick('a2',e)}>Assignment 2</NavItem>
                <NavItem onClick={(e) => this.handleClick('a3',e)}>Assignment 3</NavItem>
              </Dropdown>
            </Col>
            <Col sm={2}>
              <Button onClick={(e) => this.handleClick('default',e)}>Reset</Button>
            </Col>
          </Row>
        </Navbar>
      </div>
    )
  }
}
