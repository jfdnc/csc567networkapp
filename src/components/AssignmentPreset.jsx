import React from 'react'
import NetNode from './NetNode'
import { addNode } from '../action/actions/network_actions'

export default class AssignmentPreset extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      thisPreset: <h1>default display</h1>
    }

    this.mapNodes = this.mapNodes.bind(this)
  }

  componentWillReceiveProps(props){
    switch(props.a){
      case 'd':
      this.setState({thisPreset: <h1>default display</h1>})
      break
      case '1':
      this.setState({thisPreset: this.mapNodes(presetOne.nodes)})
      break
      case '2':
      this.setState({thisPreset: this.mapNodes(presetTwo.nodes)})
      break
      case '3':
      this.setState({thisPreset: this.mapNodes(presetThree.nodes)})
      break
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

  render(){
    return(this.state.thisPreset)
  }
}

//6 rows 12 cols
//assignemnt 1 layout
var presetOne = {
  nodes: [
    {
      id: 'host0-a1',
      type: 'host',
      row:2,
      col:2,
    },{
      id: 'host1-a1',
      type: 'host',
      row:2,
      col:10,
    },{
      id: 'router0-a1',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router1-a1',
      type: 'router',
      row:5,
      col:8,
    }
  ]
}
//assignment 2 layout
var presetTwo = {
  nodes: [
    {
      id: 'host0-a2',
      type: 'host',
      row:2,
      col:2,
    },{
      id: 'host1-a2',
      type: 'host',
      row:2,
      col:10,
    },{
      id: 'host2-a2',
      type: 'host',
      row:2,
      col:7,
    },{
      id: 'router0-a2',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router1-a2',
      type: 'router',
      row:5,
      col:8,
    },{
      id: 'router2-a2',
      type: 'router',
      row:3,
      col:5,
    }
  ]
}

//assignment3 layout
var presetThree = {
  nodes: [
    {
      id: 'host0-a3',
      type: 'host',
      row:3,
      col:1,
    },{
      id: 'host1-a3',
      type: 'host',
      row:3,
      col:11,
    },{
      id: 'router0-a3',
      type: 'router',
      row:3,
      col:3,
    },{
      id: 'router1-a3',
      type: 'router',
      row:1,
      col:4,
    },{
      id: 'router2-a3',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router3-a3',
      type: 'router',
      row:3,
      col:5,
    },{
      id: 'router4-a3',
      type: 'router',
      row:3,
      col:7,
    },{
      id: 'router5-a3',
      type: 'router',
      row:1,
      col:8,
    },{
      id: 'router6-a3',
      type: 'router',
      row:5,
      col:8,
    },{
      id: 'router7-a3',
      type: 'router',
      row:3,
      col:9,
    }
  ]
}
