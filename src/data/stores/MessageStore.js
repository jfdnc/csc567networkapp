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
      messages: {
        redMsg: '',
        blueMsg: ''
      },
      count: 0
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
    switch(this.messageState.count){
      case 0:
        console.log(`pushing blue msg: ${newMessage}`)
        this.messageState.messages.blueMsg = newMessage
        this.messageState.count += 1
        this.emit('change')
        break
      case 1:
      console.log(`pushing red msg: ${newMessage}`)
        this.messageState.messages.redMsg = newMessage
        this.messageState.count += 1
        this.emit('change')
        break
      default:
        console.log('Message queue full')
    }
  }

  clearMessages(){
    this.messageState = {
      messages: {
        redMsg: '',
        blueMsg: ''
      },
      count: 0
    }
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
      case 'CLEAR_MESSAGES':
        this.clearMessages()
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
