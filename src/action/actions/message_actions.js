import dispatcher from '../../data/Dispatcher'
import MessageActionTypes from '../types/MessageActionTypes'

export function addMessage(newMessage){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: MessageActionTypes.ADD_MESSAGE,
    message: newMessage,
  })
}
