import React from 'react'
import NetworkStore from '../data/stores/NetworkStore'
import DisplayStore from '../data/stores/DisplayStore'
import Fade from './Fade'

export default class LinkLayer extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      nodes: [],
      links: [],
      svgs: []
    }

    this.mapLinks = this.mapLinks.bind(this)
    this.clearLinks = this.clearLinks.bind(this)
  }

  componentDidMount(){
    NetworkStore.on('change', () => {
      let newState = NetworkStore.getNetworkState()
      this.setState({
        nodes: newState.nodes,
        links: newState.links,
        svgs: this.mapLinks(newState.nodes, newState.links)
      })
    })

    DisplayStore.on('change', () => {
      if(DisplayStore.getCurrAssignment() == 'default'){
        this.clearLinks()
      }
    })
  }

  mapLinks(nodeArray, linkArray){
    let nodeLocations = NetworkStore.getNetworkState().nodeLocations
    let x1,y1,x2,y2

    if(nodeLocations.length > 0 && nodeLocations.length == nodeArray.length){
      let tempKeys = {}
      for(var i in nodeLocations){
        let tempStr = [...Object.keys(nodeLocations[i])].toString()
        tempKeys[tempStr] = {...nodeLocations[i][tempStr]}
      }

      //TODO: figure out offsets - window scroll is odd also
      return(
        linkArray.map((link,i) => {
          let linkId = `${link.links.from}-${link.links.to}`
          x1 = tempKeys[link.links.from].x - 85
          y1 = tempKeys[link.links.from].y - 20
          x2 = tempKeys[link.links.to].x - 85
          y2 = tempKeys[link.links.to].y - 20
          return(
            <line id={linkId}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  style={{stroke:'#000000',strokeWidth:4}} key={i}/>
          )
        })
      )
    }
  }

  clearLinks(){
    this.setState({
      nodes: [],
      links: [],
      svgs: []
    })
  }

  render(){
    return(
        <div id='link-field'>
          <svg width={1000} height={755}>
            {this.state.svgs}
          </svg>
        </div>
    )
  }
}
