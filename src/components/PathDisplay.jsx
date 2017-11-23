import React from 'react'
import NetworkStore from '../data/stores/NetworkStore'
import DisplayStore from '../data/stores/DisplayStore'
import { addColors } from '../action/actions/network_actions'

export default class PathDisplay extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      ...NetworkStore.getNetworkState(),
      pathList: props.pathList
    }

    this.handleClick = this.handleClick.bind(this)
    this.shortestPath = this.shortestPath.bind(this)
    this.constructPath = this.constructPath.bind(this)
    this.outputPaths = this.outputPaths.bind(this)
  }

  componentWillMount(){
    NetworkStore.on('change', () => {
    this.setState({...NetworkStore.getNetworkState()})
    })
  }

  handleClick(){
    //do this on mount based on assignment
    let thisAssignment = DisplayStore.getCurrAssignment()
    let thisAdjMatrix = this.constructAdjacencyMatrix(this.state.nodes,this.state.links)
    let blueInfo = this.shortestPath(thisAdjMatrix,this.state.nodes.length,0,'w1')
    let redInfo = this.shortestPath(thisAdjMatrix,this.state.nodes.length,0,'w2')
    this.outputPaths(blueInfo,redInfo)
  }

  constructAdjacencyMatrix(nodes, links){
    nodes = nodes.map(nodeobj => nodeobj.id.split('-')[0])
    var _ = Infinity
    var adjMatrix = []
    for(let i=0; i<nodes.length;i++){
      adjMatrix.push(new Array(nodes.length).fill(0))
    }

    for(let i=0; i<nodes.length;i++){
      for(let j=0; j<nodes.length;j++){
        adjMatrix[i][j] = {w1:_,w2:_,edge:`${nodes[i]}-${nodes[j]}`}
      }
    }

    links = links.map(link => {
      return(
        {
          w1: link.w1,
          w2: link.w2,
          edge: `${link.links.from}-${link.links.to}`
        }
      )
    })


    adjMatrix = adjMatrix.map(row => {
                  return(
                    row.map(ele => {
                      let weightedEdge = links.filter(link => link.edge === ele.edge)
                      return (
                        weightedEdge.length ? weightedEdge[0] : _
                      )
                    })
                  )
                })
    return(adjMatrix)

  }

  shortestPath(edges, numVertices, startVertex, wNum) {
    edges = edges.map(row => {
              return(
                row.map(ele => {
                  if(ele !== Infinity){
                    return ele[wNum]
                  } else {
                    return Infinity
                  }
                })
              )
            })

    var done = new Array(numVertices)
    done[startVertex] = true
    var pathLengths = new Array(numVertices)
    var predecessors = new Array(numVertices)
    for (var i = 0; i < numVertices; i++) {
      pathLengths[i] = edges[startVertex][i]
      if (edges[startVertex][i][wNum] != Infinity) {
        predecessors[i] = startVertex;
      }
    }
    pathLengths[startVertex] = 0;
    for (var i = 0; i < numVertices - 1; i++) {
      var closest = -1
      var closestDistance = Infinity
      for (var j = 0; j < numVertices; j++) {
        if (!done[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }
      done[closest] = true;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j]) {
          var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
          if (possiblyCloserDistance < pathLengths[j]) {
            pathLengths[j] = possiblyCloserDistance;
            predecessors[j] = closest;
          }
        }
      }
    }
    return { "startVertex": startVertex,
             "pathLengths": pathLengths,
             "predecessors": predecessors }
}

constructPath(shortestPathInfo, endVertex) {
  var path = []
  while (endVertex != shortestPathInfo.startVertex) {
    path.unshift(endVertex);
    endVertex = shortestPathInfo.predecessors[endVertex]
  }
  return path;
}

  outputPaths(blueInfo,redInfo){
    let nodeArr = this.state.nodes.map(node => node.id.split('-')[0])
    let spBlue = this.constructPath(blueInfo,1),
        spRed = this.constructPath(redInfo, 1)
    let spBlueNames = spBlue.map(index => nodeArr[index])
    let spRedNames = spRed.map(index => nodeArr[index])
    let nodeColorArgs = {red:[],blue:[]}
    //todo switch red path for particular assignment - a2
    let currStep = 'host0'
    let totalWeight = 0
    let newPathList =
      <div id='path-list'>
      <div id='blue-path-list'>
        <h6 style={{'color':'blue'}}>Blue Path <b style={{fontSize:'12px',color:'black'}}> to host1</b></h6>
        <ul style={{marginTop:'0px'}}>
          {spBlueNames.map((step,i) => {
            let thisWeight = this.state.links.filter(link => link.links.from === currStep && link.links.to === step)[0].w1
            nodeColorArgs.blue.push({from:currStep,to:step})
            let listOut = <li key={i}>{currStep} to {step} => weight: <b style={{'color':'blue'}}>{thisWeight}</b></li>
            totalWeight += thisWeight
            currStep = step
            return(
              listOut
            )
          })}
          <li><b>Total Minimum Path Weight:</b> <b style={{'color':'blue'}}>{totalWeight}</b></li>
        </ul>
        </div>
        <div id='red-path-list'>
        <h6 style={{'color':'red'}}>Red Path <b style={{fontSize:'12px',color:'black'}}> to host1</b></h6>
        <ul style={{marginTop:'0px'}}>
          {spRedNames.map((step,i) => {
            if(i == 0){currStep = 'host0'; totalWeight = 0;}
            let thisWeight = this.state.links.filter(link => link.links.from === currStep && link.links.to === step)[0].w2
            nodeColorArgs.red.push({from:currStep,to:step})
            let listOut = <li key={i}>{currStep} to {step} => weight: <b style={{'color':'red'}}>{thisWeight}</b></li>
            totalWeight += thisWeight
            currStep = step
            return(
              listOut
            )
          })}
          <li><b>Total Minimum Path Weight:</b> <b style={{'color':'red'}}>{totalWeight}</b></li>
        </ul>
        </div>
      </div>
      
      addColors(nodeColorArgs)
      this.setState({pathList: newPathList})
  }


  render(){
    return(
      <div id='path-display'>
        <b style={{color:'black'}}>Shortest Paths from Host0:</b>
        <a id='path-calc-btn' onClick={() => this.handleClick()}> Calculate</a>
        <div id='path-list-container'>
          {this.state.pathList}
        </div>
      </div>
    )
  }
}
