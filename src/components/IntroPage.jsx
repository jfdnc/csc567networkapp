import React from 'react'
import Fade from './Fade'
import { Collection, CollectionItem } from 'react-materialize'

export default class IntroPage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      activePage: 'code'
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
            <CollectionItem id='code' className='intro-nav-item' onClick={()=>this.handleClick('code')}>Code</CollectionItem>
            <CollectionItem id='test' className='intro-nav-item' onClick={()=>this.handleClick('test')}>Test Inputs</CollectionItem>
            <CollectionItem id='docs' className='intro-nav-item' onClick={()=>this.handleClick('docs')}>Documentation</CollectionItem>
          </Collection>
          <div id='intro-info'>
            {this.state.activePage}
          </div>
        </div>
      </Fade>
    )
  }
}
