import React from 'react'
import NetNode from './NetNode'

export default class AssignmentPreset extends React.Component{
  constructor(props){
    super(props)

    this.mapNodes = this.mapNodes.bind(this)
  }

  mapNodes(nodeList){
    return(
      nodeList.map((node, i) =>{
        return(
          <NetNode obj={node} key={node.id}/>
        )
      })
    )
  }

  render(){
      switch(this.props.a){
        case 'd':
        return <h1>default display</h1>
        break
        case '1':
        return(
          <div id='node-field'>
            {this.mapNodes(presetOne.nodes)}
          </div>
        )
        break
        case '2':
        return(
          <div id='node-field'>
            {this.mapNodes(presetTwo.nodes)}
          </div>
        )
        break
        case '3':
        return(
          <div id='node-field'>
            {this.mapNodes(presetThree.nodes)}
          </div>
        )
        break
      }
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
