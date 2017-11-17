//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import _ from 'lodash'

class MessageStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial message info
    /**
    *
    *
    messages = [
      {
        id: ''
        node: ''
        layer: ''
        contents: ''
      }
      ]
    *
    *
    *
    *
    **/
    this.messageState = {
      messages: []
    }
  }

  getMessageState(){
    return this.messageState
  }

  getMessages(){
    return this.messageState.messages
  }

  addMessage(newMessage){
    console.log(`pushing ${newMessage}`)
    this.messageState.messages.push(newMessage)
    this.emit('change')
  }


  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case 'ADD_MESSAGE':
        this.addMessage(action.message)
        break
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const messageStore = new MessageStore
//register dispatcher to this store to handle action passing
dispatcher.register(messageStore.handleActions.bind(messageStore))
export default messageStore
