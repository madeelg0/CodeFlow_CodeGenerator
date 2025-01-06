function updateNodesSequentially(nodes, edges) {
  function getNode(id) {
    return nodes.find((node) => node.id === id);
  }

  function getStartNode() {
    return nodes.find((node) => node.type === "StartNode");
  }

  function getEdge(sourceID) {
    const edge = edges.find((edg) => edg.source === sourceID);
    return edge || 0;
  }

  function treversePath(sourceID) {
    let tempNodes = [];
    let id = sourceID;

    while (true) {
      let edg = getEdge(id);
      if (edg === 0) {
        break;
      }

      let nd = getNode(edg.target);

      if (nd.type === "DecisionNode") {
        let truePath = [];
        let falsePath = [];
        let temp


        let trueEdge = edges.find(
          (e) => e.source === nd.id && e.sourceHandle === "TRUE"
        );
        truePath.push(getNode(trueEdge.source))
        truePath.push(getNode(trueEdge.target))
        temp = treversePath(trueEdge.target);
        temp.forEach(nd => truePath.push(nd))




        let falseEdge = edges.find(
          (e) => e.source === nd.id && e.sourceHandle === "FALSE"
        );
        falsePath.push(getNode(falseEdge.source))
        falsePath.push(getNode(falseEdge.target))
        temp = treversePath(falseEdge.target);
        temp.forEach(nd => falsePath.push(nd))

        truePath.unshift("In Case condition is true")
        falsePath.unshift("In Case condition is false")

        tempNodes.push(truePath)
        tempNodes.push(falsePath)
        return tempNodes

      } else {
        tempNodes.push(nd);
        id = edg.target;
      }
    }

    return tempNodes;
  }

  let updatedNodes = [];
  const startNode = getStartNode();
  updatedNodes.push(startNode);
  updatedNodes = updatedNodes.concat(treversePath(startNode.id));

  // console.log(updatedNodes);

  return updatedNodes;
}

module.exports = updateNodesSequentially