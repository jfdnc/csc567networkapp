import React from 'react'
import NetNode from './NetNode'
import IntroPage from './IntroPage'
import { addNode, addLink } from '../action/actions/network_actions'
import LinkLayer from './LinkLayer'
import presets from '../data/assignment_presets'

export default class PresetLoader extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      thisPreset: <IntroPage/>
    }

    this.mapNodes = this.mapNodes.bind(this)
    this.mapLinks = this.mapLinks.bind(this)
    this.toggleTop = this.toggleTop.bind(this)
  }

  componentWillReceiveProps(props){
    switch(props.a){
      case 'd':
        this.setState({thisPreset: <IntroPage/>})
        this.toggleTop(0)
      break
      case '1':
        this.setState({thisPreset: this.mapNodes(presets.presetOne.nodes)})
        this.mapLinks(presets.presetOne.links)
        this.toggleTop(1)
      break
      case '2':
        this.setState({thisPreset: this.mapNodes(presets.presetTwo.nodes)})
        this.mapLinks(presets.presetTwo.links)
        this.toggleTop(1)
      break
      case '3':
        this.setState({thisPreset: this.mapNodes(presets.presetThree.nodes)})
        this.mapLinks(presets.presetThree.links)
        this.toggleTop(1)
      break
    }
  }

  toggleTop(t){
    if(t){
      document.getElementById('status-box').style.height = '158px'
      document.getElementById('node-field-container').style.paddingTop = '185px'
    } else {
      document.getElementById('status-box').style.height = '0'
      document.getElementById('node-field-container').style.paddingTop = '0'
    }
  }

  mapNodes(nodeList){
    return(
      nodeList.map((node, i) =>{
        addNode(node)
        return(
          <NetNode obj={node} key={node.id}/>
        )
      })
    )
  }

  mapLinks(linkList){
    linkList.map(link => {
      addLink(link)
    })
  }

  render(){
    return(this.state.thisPreset)
  }
}
