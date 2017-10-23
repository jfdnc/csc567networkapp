import React, { Component } from 'react'

const StatusBox = (props) => {
    return(
      <div id='status-box'>
        {props.status.nodes.map((node,i)=><h5 key={i}>{node.id}</h5>)}
      </div>
    )
}

export default StatusBox
