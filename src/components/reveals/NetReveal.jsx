import React from 'react'

const NetReveal = (props) => {
  return(
    <div className='layer-reveal-content-wrap'>
    <div className='layer-reveal-content-header'>Network Layer</div>
    <div className='layer-reveal-content-text'>
      <p>The netowrk layer is a cool guy and doesn't afraid of anything</p>
    </div>
    <div className='layer-reveal-content-widget'>
      <div className='data-packet-widget'>
        <div className='ip-datagram'>
          <div className='ip-ver packet-cell'>VER<br/>(4 bits)</div>
          <div className='ip-hlen packet-cell'>HLEN<br/>(4 bits)</div>
          <div className='ip-service-type packet-cell'>Service Type<br/>(8 bits)</div>
          <div className='ip-total-length packet-cell'>Total Length (16 bits)</div>
          <div className='ip-id packet-cell'>Identification (16 bits)</div>
          <div className='ip-flags packet-cell'>Flags<br/>(3 bits)</div>
          <div className='ip-fragoffset packet-cell'>Fragmentation Offset (13 bits)</div>
          <div className='ip-ttl packet-cell'>TTL (8 bits)</div>
          <div className='ip-protocol packet-cell'>Protocol (8 bits)</div>
          <div className='ip-checksum packet-cell'>Checksum (16 bits)</div>
          <div className='ip-source-ip packet-cell'>Source IP Address</div>
          <div className='ip-destination-ip packet-cell'>Destination IP Address</div>
          <div className='ip-option packet-cell'>Options</div>
          <div className='ip-data packet-cell'>Data</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NetReveal
