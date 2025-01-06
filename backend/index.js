const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateFile } = require('./generateFile')
const { executeCpp } = require('./executeCpp')


const app = express();
const port = 3000;
const updateNodesSequentially = require("./updateNodesSequentially");

const generateCode = require("./AI");

function cleanNodes(node) {
  if (Array.isArray(node)) {
    return node.map((n) => {
      if (typeof n === "object" && n !== null && !Array.isArray(n)) {
        return {
          type: n.type,
          PseudoCode: n.data.PseudoCode,
        };
      }
      return n;
    });
  } else if (typeof node === "object" && node !== null) {
    return {
      type: node.type,
      PseudoCode: node.data.PseudoCode,
    };
  }
  return node;
}

// Enable CORS
app.use(cors());

// Enable body-parser for JSON
app.use(bodyParser.json());

// Sample GET API
app.get("/api", (req, res) => {
  res.json({ message: "Hellooooo !!!" });
});

app.post("/api/ToCode", async (req, res) => {
  const NODES = req.body.NODES;
  const EDGES = req.body.EDGES;
  if (NODES && EDGES) {
    let Nodes = updateNodesSequentially(NODES, EDGES);
    Nodes = Nodes.map(cleanNodes);

    try {
      console.log("Loading ....");
      const response = await generateCode(
        `Convert this pseudo code into c++ code ${JSON.stringify(
          Nodes
        )} (Note that you only can respond with the code nothing else and do not use makdown to format and do not use escap charecter)`
      );
      res.json(response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Error: Please send both objects" });
  }
});

app.post("/api/ToFlowchart", async (req, res) => {
  const CODE = req.body.CODE;
  if (CODE) {
    try {
      console.log("Loading ....");
      const response = await generateCode(
        `Convert the following C++ code into Reactflow library's nodes and edges. Use only these custom node types: "StartNode", "EndNode", "InputNode", "OutputNode", "ProcessNode", and "DecisionNode". Each "DecisionNode" has two source handles: "TRUE" for when the condition is true and "FALSE" for when the condition is false. Each node must include a "PseudoCode" field containing a simple English pseudocode version of the original code, along with a "label" field. The response should only contain nodes and edges. Each edge should have an extra field "type" with the value "smoothstep" and should not be animated. Return the result as a JSON object.
        C++ Code: ${CODE}
        `
      );
      res.json(response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Error: Please send both objects" });
  }
});

app.post("/api/Run", async (req, res) => {
const {CODE} = req.body
if(CODE){
  try {
    const filePath = await generateFile(CODE)
    const output = await executeCpp(filePath)
    return res.json({output})
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error });
  }
}
else{
  res.status(400).json({ message: req.body });
}


});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
