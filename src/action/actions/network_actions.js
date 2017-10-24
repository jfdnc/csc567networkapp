import dispatcher from '../../data/Dispatcher'
import NetworkActionTypes from '../types/NetworkActionTypes'

export function addNode(newNode){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.ADD_NODE,
    data: newNode,
  })
}

export function addNodeLocation(newNodeLocation){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.ADD_NODE_LOCATION,
    data: newNodeLocation,
  })
}

export function addLink(newLink){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.ADD_LINK,
    data: newLink,
  })
}

export function clearState(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.CLEAR_STATE
  })
}
