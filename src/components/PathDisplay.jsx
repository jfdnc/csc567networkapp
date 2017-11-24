import React from 'react'
import DisplayStore from '../data/stores/DisplayStore'
import { addColors, setPathStats, resetPathStats } from '../action/actions/network_actions'

export default class PathDisplay extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      ...props,
      pathList: '',
      pathSummary: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.shortestPath = this.shortestPath.bind(this)
    this.constructPath = this.constructPath.bind(this)
    this.outputPaths = this.outputPaths.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({...newProps,pathList:this.state.pathList})
  }

  handleClick(){
    //do this on mount based on assignment
    let loops = 50,
        delta = 150
    for(let i=1; i<loops+1; i++){
      setTimeout(() => {
        let thisAssignment = DisplayStore.getCurrAssignment()
        let thisAdjMatrix = this.constructAdjacencyMatrix(this.state.nodes,this.state.links)
        let blueInfo = this.shortestPath(thisAdjMatrix,this.state.nodes.length,0,'w1')
        let redInfo = this.shortestPath(thisAdjMatrix,this.state.nodes.length,0,'w2')
        this.outputPaths(blueInfo,redInfo)
      }, delta*i)
    }
    setTimeout(()=> {
      let pathSummary =
      <div id='path-display-summary'>
        <div id='path-display-summary-header'>
          <b style={{color:'black'}}><u>Summary</u></b>
        </div>
        <div id='runs'>
          <b>Runs:</b> {this.state.pathStats.runs}
        </div>
        <div id='red-wins'>
          <b>Red Wins:</b> <b style={{color:'red'}}>{this.state.pathStats.wins.red}</b>
        </div>
        <div id='blue-wins'>
          <b>Blue Wins:</b> <b style={{color:'blue'}}>{this.state.pathStats.wins.blue}</b>
        </div>
        <div id='ties'>
          <b>Ties:</b> <b style={{color:'purple'}}>{this.state.pathStats.wins.tie}</b>
        </div>
        <div id='red-avg'>
          <b>Red Avg:</b> <b style={{color:'red'}}>{this.state.pathStats.avgPathWeight.red.toFixed(2)}</b>
        </div>
        <div id='blue-avg'>
          <b>Blue Avg:</b> <b style={{color:'blue'}}>{this.state.pathStats.avgPathWeight.blue.toFixed(2)}</b>
        </div>
      </div>

      this.setState({pathSummary:pathSummary})
    },loops*delta)
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
    let totalBlueWeight = 0
    let totalRedWeight = 0
    let newPathList =
      <div id='path-list'>
      <div id='blue-path-list'>
        <h6 style={{'color':'blue'}}>Blue Path <b style={{fontSize:'12px',color:'black'}}> to host1</b></h6>
        <ul style={{marginTop:'0px'}}>
          {spBlueNames.map((step,i) => {
            let thisWeight = this.state.links.filter(link => link.links.from === currStep && link.links.to === step)[0].w1
            nodeColorArgs.blue.push({from:currStep,to:step})
            let listOut = <li key={i}>{currStep} to {step} => weight: <b style={{'color':'blue'}}>{thisWeight}</b></li>
            totalBlueWeight += thisWeight
            currStep = step
            return(
              listOut
            )
          })}
          <li><b>Total Minimum Path Weight:</b> <b style={{'color':'blue'}}>{totalBlueWeight}</b></li>
        </ul>
        </div>
        <div id='red-path-list'>
        <h6 style={{'color':'red'}}>Red Path <b style={{fontSize:'12px',color:'black'}}> to host1</b></h6>
        <ul style={{marginTop:'0px'}}>
          {spRedNames.map((step,i) => {
            if(i == 0){currStep = 'host0';}
            let thisWeight = this.state.links.filter(link => link.links.from === currStep && link.links.to === step)[0].w2
            nodeColorArgs.red.push({from:currStep,to:step})
            let listOut = <li key={i}>{currStep} to {step} => weight: <b style={{'color':'red'}}>{thisWeight}</b></li>
            totalRedWeight += thisWeight
            currStep = step
            return(
              listOut
            )
          })}
          <li><b>Total Minimum Path Weight:</b> <b style={{'color':'red'}}>{totalRedWeight}</b></li>
        </ul>
        </div>
      </div>

      let prevPathStats = this.state.pathStats
      let prevRedAvg = prevPathStats.avgPathWeight.red,
          prevBlueAvg = prevPathStats.avgPathWeight.blue,
          prevRuns = prevPathStats.runs
      let newRedAvg =  prevRedAvg ? prevRedAvg*(((totalRedWeight/prevRedAvg)+prevRuns)/(++prevRuns))
                                  : totalRedWeight,
          newBlueAvg = prevBlueAvg ? prevBlueAvg*(((totalBlueWeight/prevBlueAvg)+prevRuns)/(++prevRuns))
                                   : totalBlueWeight
      let newPathStats =
        {
          runs: prevPathStats.runs + 1,
          avgPathWeight: {
            red: newRedAvg,
            blue: newBlueAvg
          },
          wins: {
            red: totalRedWeight < totalBlueWeight ? ++prevPathStats.wins.red : prevPathStats.wins.red,
            blue: totalBlueWeight < totalRedWeight ? ++prevPathStats.wins.blue : prevPathStats.wins.blue,
            tie: totalRedWeight === totalBlueWeight ? ++prevPathStats.wins.tie : prevPathStats.wins.tie
          }
        }

      setPathStats(newPathStats)
      addColors(nodeColorArgs)
      this.setState(
        {
          pathList: newPathList,
        }
      )
  }


  render(){
    return(
      <div id='path-display'>
        <b style={{color:'black'}}>Shortest Paths from Host0:</b>
        <a id='path-calc-btn' onClick={() => this.handleClick()}> Calculate</a>
        <div id='path-list-container'>
          {this.state.pathList}
            <hr/>
          {this.state.pathSummary}
        </div>
      </div>
    )
  }
}
