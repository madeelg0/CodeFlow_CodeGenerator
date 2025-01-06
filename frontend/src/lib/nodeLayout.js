// DagreLayout.js
// import dagre from 'dagre';

// const nodeWidth = 172;
// const nodeHeight = 36;

// const getLayoutedElements = (nodes, edges, direction = 'TB') => {
//   const dagreGraph = new dagre.graphlib.Graph();
//   dagreGraph.setDefaultEdgeLabel(() => ({}));

//   const isHorizontal = direction === 'LR';
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     node.targetPosition = isHorizontal ? 'left' : 'top';
//     node.sourcePosition = isHorizontal ? 'right' : 'bottom';

//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     };

//     return node;
//   });

//   return { nodes, edges };
// };

// const DagreLayout = ({ nodes, edges }) => {
//   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
//     nodes,
//     edges,
//   );

//   return { layoutedNodes, layoutedEdges };
// };

// export default DagreLayout;
