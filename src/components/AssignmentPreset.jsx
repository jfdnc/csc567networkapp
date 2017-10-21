import React from 'react'

export default class AssignmentPreset extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
      switch(this.props.a){
        case 'd':
        return <h1>default display</h1>
        break
        case '1':
        return <h1>assignment 1</h1>
        break
        case '2':
        return <h1>assignment 2</h1>
        break
        case '3':
        return <h1>assignment 3</h1>
        break
      }
  }
}
