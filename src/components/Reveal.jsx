import React from 'react'
import AppReveal from './reveals/AppReveal'
import PresReveal from './reveals/PresReveal'
import SessReveal from './reveals/SessReveal'
import TransReveal from './reveals/TransReveal'
import NetReveal from './reveals/NetReveal'
import DataReveal from './reveals/DataReveal'
import PhyReveal from './reveals/PhyReveal'

const Reveal = (props) => {
  let currReveal
  switch(props.layer){
    case 'Application':
      currReveal = <AppReveal/>
      break
    case 'Presentation':
      currReveal = <PresReveal/>
      break
    case 'Session':
      currReveal = <SessReveal/>
      break
    case 'Transport':
      currReveal = <TransReveal/>
      break
    case 'Network':
      currReveal = <NetReveal/>
      break
    case 'Data Link':
      currReveal = <DataReveal/>
      break
    case 'Physical':
      currReveal = <PhyReveal/>
      break
  }
  return(
    <div className='layer-reveal-content'>
      {currReveal}
    </div>
  )
}

export default Reveal
