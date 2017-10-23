//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class NetworkStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial network info
    this.networkState = {
      nodes: ['butts'],
      links: []
    }
  }

  getNetworkState(){
    return this.networkState
  }

  addNode(node){
    this.networkState.nodes.push(node)
    this.emit('change')
  }

  clearState(){
    this.networkState = {
      nodes: [],
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
