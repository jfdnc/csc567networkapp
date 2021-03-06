import dispatcher from '../../data/Dispatcher'
import DisplayActionTypes from '../types/DisplayActionTypes'

export function displayDefault(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_DEFAULT
  })
}
export function displayA1(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_A1
  })
}
export function displayA2(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_A2
  })
}
export function displayA3(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.DISPLAY_A3
  })
}
export function toggleReveal(){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.TOGGLE_REVEAL
  })
}
export function setReveal(reveal){
  dispatcher.dispatch({
    //only use actions from ActionTypes - consistent communication!
    type: DisplayActionTypes.SET_REVEAL,
    reveal: reveal
  })
}
