//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class DisplayStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial log info
    this.displayState = {
      assignmentDisplayed: 'default'
    }
  }

  displayDefault(){
    this.displayState = {
      assignmentDisplayed: 'default'
    }
    this.emit("change")
  }

  displayA1(){
    this.displayState = {
      assignmentDisplayed: 'a1'
    }
    this.emit("change")
  }

  displayA2(){
    this.displayState = {
      assignmentDisplayed: 'a2'
    }
    this.emit("change")
  }

  displayA3(){
    this.displayState = {
      assignmentDisplayed: 'a3'
    }
    this.emit("change")
  }

  getCurrAssignment(){
    return this.displayState.assignmentDisplayed
  }


  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case 'DISPLAY_DEFAULT':
        this.displayDefault()
        break
      case 'DISPLAY_A1':
        this.displayA1()
        break
      case 'DISPLAY_A2':
        this.displayA2()
        break
      case 'DISPLAY_A3':
        this.displayA3()
        break
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const displayStore = new DisplayStore
//register dispatcher to this store to handle action passing
dispatcher.register(displayStore.handleActions.bind(displayStore))
export default displayStore
