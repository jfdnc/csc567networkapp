import React from 'react'
import Fade from './Fade'
import { Collection, CollectionItem, Tabs, Tab } from 'react-materialize'

export default class IntroPage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      activePage: 'docs'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(newPage){
    if(newPage != this.state.activePage){
      this.setState({activePage:newPage})
    }
  }

  render(){
    return(
      <Fade>
        <div id='intro-page-container'>
          <Collection header='Project Info' id='intro-page-nav'>
            <CollectionItem id='docs' className='intro-nav-item' onClick={()=>this.handleClick('docs')}>Documentation</CollectionItem>
            <CollectionItem id='code' className='intro-nav-item' onClick={()=>this.handleClick('code')}>Code</CollectionItem>
          </Collection>
          <div id='intro-info'>
            <div id='docs-page' className={`${this.state.activePage == 'docs' ? 'active' : 'inactive'}`}>
              <h4>Documentation</h4>
              <hr/>
              <Tabs>
                <Tab title='Project'>
                <br/>
                
                </Tab>
                <Tab title='Assignment 1'>Assignment 1</Tab>
                <Tab title='Assignment 2'>Assignment 2</Tab>
                <Tab title='Assignment 3'>Assignment 3</Tab>
              </Tabs>
            </div>
            <div id='code-page' className={`${this.state.activePage == 'code' ? 'active' : 'inactive'}`}>
              <h4>Code Info</h4>
              <hr/>
              <br/>
              <h5>All project code can be found <a href='https://github.com/jfdnc/csc567networkapp' target="_blank">here</a></h5>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}
