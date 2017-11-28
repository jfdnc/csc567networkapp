import React from 'react'
import Fade from './Fade'
import { Collection, CollectionItem, Tabs, Tab } from 'react-materialize'
import intropage from '../images/intropage.png'
import a1page from '../images/a1page.png'
import a2page1 from '../images/a2page1.png'
import a2page2 from '../images/a2page2.png'
import a3page from '../images/a3page.png'

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
                <img src={intropage} style={{width: '700px',height: '800px'}}/>
                </Tab>
                <Tab title='Assignment 1'>
                <br/>
                <img src={a1page} style={{width: '700px',height: '800px'}}/>
                </Tab>
                <Tab title='Assignment 2'>
                <br/>
                <img src={a2page1} style={{width: '700px',height: '800px'}}/>
                <img src={a2page2} style={{width: '700px',height: '800px'}}/>
                </Tab>
                <Tab title='Assignment 3'>
                <br/>
                <img src={a3page} style={{width: '700px',height: '800px'}}/>
                </Tab>
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
