import React from 'react'
import NetworkStore from '../data/stores/NetworkStore'
import DisplayStore from '../data/stores/DisplayStore'

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
      this.setState({
        nodes: NetworkStore.getNetworkState().nodes,
        links: NetworkStore.getNetworkState().links,
      })
      this.setState({
        svgs: this.mapLinks(this.state.nodes, this.state.links)
      })
    })
    DisplayStore.on('change', () => {
      if(DisplayStore.getCurrAssignment() == 'default'){
        this.clearLinks()
      }
    })
  }

  mapLinks(nodeArray, linkArray){
    return(
      linkArray.map((link,i) => {
        return(
          <h6 key={i}>{`link from ${link.from} to ${link.to}`}</h6>
        )
      })
    )
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
        {this.state.svgs}
      </div>
    )
  }
}
