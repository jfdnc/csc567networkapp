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
    let activePage = this.state.activePage

    return(
      <Fade>
        <div id='intro-page-container'>
          <Collection header='Project Info' id='intro-page-nav'>
            <CollectionItem id='docs' className='intro-nav-item' onClick={()=>this.handleClick('docs')}>Documentation</CollectionItem>
            <CollectionItem id='test' className='intro-nav-item' onClick={()=>this.handleClick('test')}>Test Inputs</CollectionItem>
            <CollectionItem id='code' className='intro-nav-item' onClick={()=>this.handleClick('code')}>Code</CollectionItem>
          </Collection>
          <div id='intro-info'>
            <div id='code-page' className={`${activePage == 'code' ? 'active' : 'inactive'}`}>
              <h4>Code Info</h4>
            </div>
            <div id='test-page' className={`${activePage == 'test' ? 'active' : 'inactive'}`}>
              <h4>Test Info</h4>
            </div>
            <div id='docs-page' className={`${activePage == 'docs' ? 'active' : 'inactive'}`}>
              <h4>Documentation</h4>
              <Tabs>
                <Tab title='Assignment 1'>Assignment 1</Tab>
                <Tab title='Assignment 2'>Assignment 2</Tab>
                <Tab title='Assignment 3'>Assignment 3</Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}
