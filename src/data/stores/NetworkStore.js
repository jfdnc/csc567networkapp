//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class NetworkStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial network info
    this.networkState = {
      nodes: [],
      nodeLocatons: [],
      links: []
    }
  }

  getNetworkState(){
    return this.networkState
  }

  addNode(newNode){
    //dont push if its already there!
    let check = this.networkState.nodes.map(node => node.id === newNode.id)
                                       .reduce((acc,ele)=>{return acc += ele ? 1 : 0},0)
    if(!check){this.networkState.nodes.push(newNode)}
    this.emit('change')
  }

  addLink(newLink){
    let check = this.networkState.links.map(link => link.links == newLink)
                                       .reduce((acc,ele) =>{ return acc += ele }, 0)
    if(!check){
      let linkObj = {
        w1: Math.floor(Math.random()*7 + 1),
        w2: Math.floor(Math.random()*7 + 1),
        links: newLink
      }
      this.networkState.links.push(linkObj)
    }
    this.emit('change')
  }

  addNodeLocation(newNodeLocation){
    this.networkState.nodeLocations.push(newNodeLocation)
    this.emit('change')
  }

  clearState(){
    this.networkState = {
      nodes: [],
      nodeLocations: [],
      links:[]
    }
    this.emit('change')
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case 'ADD_NODE':
        this.addNode(action.data)
        break
      case 'ADD_LINK':
        this.addLink(action.data)
        break
      case 'ADD_NODE_LOCATION':
        this.addNodeLocation(action.data)
        break
      case 'CLEAR_STATE':
        this.clearState()
        break
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const networkStore = new NetworkStore
//register dispatcher to this store to handle action passing
dispatcher.register(networkStore.handleActions.bind(networkStore))
export default networkStore
