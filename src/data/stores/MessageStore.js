//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'
import _ from 'lodash'
import NetworkStore from './NetworkStore'

class MessageStore extends EventEmitter {
  constructor(props){
    super(props)

    this.messageState = {
      messages: {
        blue: {
          content: '',
          node: '',
          layer: '',
        },
        red: {
          content: '',
          node: '',
          layer: ''
        }
      },
      paths: {
        blue:[],
        red:[]
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
    switch(this.messageState.count){
      case 0:
        let bluePath = NetworkStore.getNetworkState().pathStats.currPath.blue
        if(bluePath.length){
          console.log(`pushing blue msg: ${newMessage}`)
          this.messageState.paths.blue = bluePath
          this.messageState.messages.blue.content = newMessage
          this.messageState.messages.blue.node = bluePath[0].from
          this.messageState.count += 1
          this.emit('change')
        } else {
          console.log('No paths calculated.')
        }
        break
      case 1:
        let redPath = NetworkStore.getNetworkState().pathStats.currPath.red
        if(redPath.length){
          console.log(`pushing red msg: ${newMessage}`)
          this.messageState.paths.red = redPath
            this.messageState.messages.red.content = newMessage
            this.messageState.messages.red.node = redPath[0].from
            this.messageState.count += 1
            this.emit('change')
          } else {
            console.log('No paths calculated.')
          }
        break
      default:
        console.log('Message queue full.')
    }
  }

  clearMessages(){
    this.messageState = {
      messages: {
        blue: {
          content: '',
          node: '',
          layer: '',
        },
        red: {
          content: '',
          node: '',
          layer: ''
        }
      },
      paths: {
        blue: [],
        red: []
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
