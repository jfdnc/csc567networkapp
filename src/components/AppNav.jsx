import React, { Component } from 'react'
import { Navbar, NavItem, Dropdown, Button, Row, Col } from 'react-materialize'
import { displayDefault, displayA1, displayA2, displayA3 } from '../action/actions/display_actions'
import { clearState } from '../action/actions/network_actions'
import NetworkStore from '../data/stores/NetworkStore'
import DisplayStore from '../data/stores/DisplayStore'

export default class AppNav extends Component{
  constructor(props){
    super(props)

    this.state ={
      check: DisplayStore.getCurrAssignment()
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount(){
    DisplayStore.on('change',() => {
      this.setState({check: DisplayStore.getCurrAssignment()})
    })
  }

  handleClick(a,e){
    e.preventDefault()
    document.getElementsByClassName('App')[0].scrollTop = 0
    clearState()
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
    let check = DisplayStore.getCurrAssignment()

    return(
      <div id='app-nav-container'>
        <Navbar id='app-nav'>
          <Row>
          <Col sm={2}>
            <Button onClick={(e) => this.handleClick('default',e)}>About</Button>
          </Col>
            <Col sm={2}>
              <Dropdown trigger={
                <Button>Select Assignment</Button>
              }>
                <NavItem className={this.state.check == 'a1' ? 'disabled' : ''} onClick={(e) => this.handleClick('a1',e)}>Assignment 1</NavItem>
                <NavItem className={this.state.check == 'a2' ? 'disabled' : ''} onClick={(e) => this.handleClick('a2',e)}>Assignment 2</NavItem>
                <NavItem className={this.state.check == 'a3' ? 'disabled' : ''} onClick={(e) => this.handleClick('a3',e)}>Assignment 3</NavItem>
              </Dropdown>
            </Col>
            <Col sm={2}>
              <Button onClick={() => console.log(NetworkStore.getNetworkState())}>log</Button>
            </Col>
          </Row>
        </Navbar>
      </div>
    )
  }
}
