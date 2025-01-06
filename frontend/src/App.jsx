import "./App.css";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Menu from "@/components/custom/Menu/menu";
import Canvas from "./components/custom/Canvas/Canvas";
import MyEditor from "./components/custom/Editor/Editor";

import { useState, useEffect } from "react";

import { useNodesState, useEdgesState } from "reactflow";

const App = () => {
  const [value, setValue] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const getAPI = async () => {
    try {
      const response = await fetch("http://localhost:3000/api");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    getAPI();
  }, [getAPI]);

  // useEffect(() => {
  //   console.log("Nodes : ", nodes);
  //   console.log("Edges : ", edges);
  // }, [nodes, edges]);

  return (
    <>
      <Menu
        nodes={nodes}
        edges={edges}
        value={value}
        setValue={setValue}
        setNodes={setNodes}
        setEdges={setEdges}
        reactFlowInstance={reactFlowInstance}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full">
            <MyEditor value={value} setValue={setValue} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full">
            <Canvas
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              edges={edges}
              setEdges={setEdges}
              onEdgesChange={onEdgesChange}
              reactFlowInstance={reactFlowInstance}
              setReactFlowInstance={setReactFlowInstance}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default App;
