import React from 'react'
import { CSSTransition } from 'react-transition-group'

const Fade = (props) => {
  return (
    <CSSTransition
       in={true}
       appear={true}
       classNames='fade'
       timeout={150}>
       {props.children}
    </CSSTransition>
  )
}

export default Fade
