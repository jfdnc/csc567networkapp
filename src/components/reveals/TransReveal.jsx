import React from 'react'

const TransReveal = (props) => {
  return(
    <div className='layer-reveal-content-wrap'>
    <div className='layer-reveal-content-header'>Transport Layer</div>
    <div className='layer-reveal-content-widget'>
      <div className='data-packet-widget'>
        <div className='tcp-header'>
          <div className='tcp-source-port packet-cell'>Source Port Number (16 bits)</div>
          <div className='tcp-destintation-port packet-cell'>Destination Port Number (16 bits)</div>
          <div className='tcp-seq-num packet-cell'>Sequence Number (16 bits)</div>
          <div className='tcp-ack-num packet-cell'>Acknowledgement Number (16 bits)</div>
          <div className='tcp-compact-row'>
            <div className='tcp-data-offset packet-cell'>Data Offset (4 bits)</div>
            <div className='tcp-reserved packet-cell'>Reserved<br/>(6 bits)</div>
            <div className='tcp-control-bits packet-cell'>Control Bits<br/>(6 bits)</div>
          </div>
          <div className='tcp-window packet-cell'>Window Size (16 bits)</div>
          <div className='tcp-checksum packet-cell'>Checksum (16 bits)</div>
          <div className='tcp-urgent-pointer packet-cell'>Urgent Pointer (16 bits)</div>
          <div className='tcp-options packet-cell'>Options (variable)</div>
          <div className='tcp-data packet-cell'>Data</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TransReveal
