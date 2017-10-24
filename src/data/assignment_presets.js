//preset nodes and links
var presetOne = {
  nodes: [
    {
      id: 'host0-a1',
      type: 'host',
      row:2,
      col:2,
    },{
      id: 'host1-a1',
      type: 'host',
      row:2,
      col:10,
    },{
      id: 'router0-a1',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router1-a1',
      type: 'router',
      row:5,
      col:8,
    }
  ],
  links: [
    {
      from: 'host0',
      to: 'router0'
    },{
      from: 'router0',
      to: 'router1'
    },{
      from: 'router1',
      to: 'host1'
    }
  ]
}
//assignment 2 layout
var presetTwo = {
  nodes: [
    {
      id: 'host0-a2',
      type: 'host',
      row:2,
      col:2,
    },{
      id: 'host1-a2',
      type: 'host',
      row:2,
      col:10,
    },{
      id: 'host2-a2',
      type: 'host',
      row:2,
      col:7,
    },{
      id: 'router0-a2',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router1-a2',
      type: 'router',
      row:5,
      col:8,
    },{
      id: 'router2-a2',
      type: 'router',
      row:3,
      col:5,
    }
  ],
  links: [
    {
      from: 'host0',
      to: 'router0'
    },{
      from: 'router0',
      to: 'router1'
    },{
      from: 'router1',
      to: 'host1'
    },{
      from: 'router0',
      to: 'router2'
    },{
      from: 'router2',
      to: 'host2'
    }
  ]
}

//assignment3 layout
var presetThree = {
  nodes: [
    {
      id: 'host0-a3',
      type: 'host',
      row:3,
      col:1,
    },{
      id: 'host1-a3',
      type: 'host',
      row:3,
      col:11,
    },{
      id: 'router0-a3',
      type: 'router',
      row:3,
      col:3,
    },{
      id: 'router1-a3',
      type: 'router',
      row:1,
      col:4,
    },{
      id: 'router2-a3',
      type: 'router',
      row:5,
      col:4,
    },{
      id: 'router3-a3',
      type: 'router',
      row:3,
      col:5,
    },{
      id: 'router4-a3',
      type: 'router',
      row:3,
      col:7,
    },{
      id: 'router5-a3',
      type: 'router',
      row:1,
      col:8,
    },{
      id: 'router6-a3',
      type: 'router',
      row:5,
      col:8,
    },{
      id: 'router7-a3',
      type: 'router',
      row:3,
      col:9,
    }
  ],
  links: [
    {
      from: 'host0',
      to: 'router0'
    },{
      from: 'router0',
      to: 'router1'
    },{
      from: 'router0',
      to: 'router2'
    },{
      from: 'router1',
      to: 'router3'
    },{
      from: 'router1',
      to: 'router5'
    },{
      from: 'router2',
      to: 'router3'
    },{
      from: 'router2',
      to: 'router6'
    },{
      from: 'router3',
      to: 'router4'
    },{
      from: 'router4',
      to: 'router5'
    },{
      from: 'router4',
      to: 'router6'
    },{
      from: 'router5',
      to: 'router7'
    },{
      from: 'router6',
      to: 'router7'
    },{
      from: 'router7',
      to: 'host1'
    }
  ]
}

module.exports = {
  presetOne,
  presetTwo,
  presetThree
}
