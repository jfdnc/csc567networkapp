//for receiving actions via dispatcher
import dispatcher from '../Dispatcher'
//for emitting events to UI components concerned with this store
import { EventEmitter } from 'events'

class NetworkStore extends EventEmitter {
  constructor(props){
    super(props)

    //initial network info
    this.networkState = {
      nodes: [],
      nodeLocations: [],
      links: [],
      pathStats: {
        runs: 0,
        avgPathWeight: {
          red:  0,
          blue: 0
        },
        wins: {
          red:  0,
          blue: 0,
          tie: 0
        }
      }
    }
  }

  getNetworkState(){
    return this.networkState
  }

  addNode(newNode){
    //dont push if its already there!
    let check = this.networkState.nodes.map(node => node.id === newNode.id)
                                       .reduce((acc,ele)=>{return acc += ele ? 1 : 0},0)
    if(!check){this.networkState.nodes.push(newNode)}
    this.emit('change')
  }

  addLink(newLink){
    let check = this.networkState.links.map(link => link.links == newLink)
                                       .reduce((acc,ele) =>{ return acc += ele }, 0)
    if(!check){
      let linkObj = {
        w1: Math.floor(Math.random()*7 + 1),
        w2: Math.floor(Math.random()*7 + 1),
        links: newLink
      }
      this.networkState.links.push(linkObj)
    }
    this.emit('change')
  }

  updateWeights(){
    let updatedLinks = this.networkState.links.map(link => {
      return(
        {
          w1: Math.floor(Math.random()*7 + 1),
          w2: Math.floor(Math.random()*7 + 1),
          links: link.links
        }
      )
    })

    this.networkState.links = updatedLinks
    this.emit('change')
  }

  addColors(hotLinks){
    let checkBlue = hotLinks.blue.map(blueLink => {
      return(
        this.networkState.links.map(link => {
          return(
            link.links.from === blueLink.from && link.links.to === blueLink.to
          )
        })
      )
    })
    //console.log(checkBlue)

    let combinedBlue = new Array(checkBlue[0].length).fill(false)
    for(let i=0;i<checkBlue.length;i++){
      for(let j=0;j<checkBlue[0].length;j++){
        if(checkBlue[i][j] == true){
          combinedBlue[j] = true
        }
      }
    }

    let checkRed = hotLinks.red.map(redLink => {
      return(
        this.networkState.links.map(link => {
          return(
            link.links.from === redLink.from && link.links.to === redLink.to
          )
        })
      )
    })
    //console.log(checkBlue)

    let combinedRed = new Array(checkRed[0].length).fill(false)
    for(let i=0;i<checkRed.length;i++){
      for(let j=0;j<checkRed[0].length;j++){
        if(checkRed[i][j] == true){
          combinedRed[j] = true
        }
      }
    }

    let coloredLinks = this.networkState.links.map((link,i) => {
      let linkColor = combinedRed[i] && combinedBlue[i] ? 'purple' : combinedBlue[i] ? 'blue' : combinedRed[i] ? 'red' : '#000'
      return(
        {
          w1: Math.floor(Math.random()*7 + 1),
          w2: Math.floor(Math.random()*7 + 1),
          links: link.links,
          color: linkColor
        }
      )
    })

    this.networkState.links = coloredLinks
    this.emit('change')
  }

  setPathStats(newPathStats){
    this.networkState.pathStats = newPathStats
  }

  getPathStats(){
    return this.networkState.pathStats
  }

  resetPathStats(){
    this.networkState.pathStats =
    {
      runs: 0,
      avgPathWeight: {
        red:  0,
        blue: 0
      },
      wins: {
        red:  0,
        blue: 0,
        tie: 0
      }
    }
  }

  addNodeLocation(newNodeLocation){
    this.networkState.nodeLocations.push(newNodeLocation)
    this.emit('change')
  }

  clearState(){
    this.networkState = {
      nodes: [],
      nodeLocations: [],
      links:[],
      pathStats: {
        runs: 0,
        avgPathWeight: {
          red:  0,
          blue: 0
        },
        wins: {
          red:  0,
          blue: 0,
          tie: 0
        }
      }
    }
    this.emit('change')
  }

  /*
  switch on action type to determine what to do with action from dispatcher
  */
  handleActions(action){
    switch(action.type){
      case 'ADD_NODE':
        this.addNode(action.data)
        break
      case 'ADD_LINK':
        this.addLink(action.data)
        break
      case 'UPDATE_WEIGHTS':
        this.updateWeights()
        break
      case 'SET_PATH_STATS':
        this.setPathStats(action.newPathStats)
        break
      case 'RESET_PATH_STATS':
        this.resetPathStats()
        break
      case 'ADD_COLORS':
        this.addColors(action.hotLinks)
        break
      case 'ADD_NODE_LOCATION':
        this.addNodeLocation(action.data)
        break
      case 'CLEAR_STATE':
        this.clearState()
        break
    }
  }
}

/*
create new instance of this store type to export
files importing TestStore get this new instance of TestStore
*/
const networkStore = new NetworkStore
//register dispatcher to this store to handle action passing
dispatcher.register(networkStore.handleActions.bind(networkStore))
export default networkStore
