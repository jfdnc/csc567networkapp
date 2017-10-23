import dispatcher from '../../data/Dispatcher'
import NetworkActionTypes from '../types/NetworkActionTypes'

export function addNode(newNode){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.ADD_NODE,
    data: newNode,
  })
}

export function updateNode(newData){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: NetworkActionTypes.UPDATE_NODE,
    data: newData,
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
