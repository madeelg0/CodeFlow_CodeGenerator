import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import DagreLayout from '@/lib/nodeLayout'

import { saveAs } from "file-saver";

const Menu = ({
  nodes,
  edges,
  value,
  setValue,
  setNodes,
  setEdges,
  reactFlowInstance,
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  async function RunClicked() {
    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:3000/api/run", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ CODE: value }),
      });

      const data = await response.json()
      console.log(data)

  } catch (error) {
      console.error("Error:", error);
  }
  }

  function NewFlowchart() {
    setValue("");
    setEdges([]);
    setNodes([]);
  }

  function ExportJson() {
    const flowState = JSON.stringify(reactFlowInstance.toObject());
    const blob = new Blob([flowState], { type: "application/json" });
    saveAs(blob, "flow.json");
  }

  function ImportFlowchart(event) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const importedState = JSON.parse(e.target.result);
        if (importedState) {
          const { x = 0, y = 0, zoom = 1 } = importedState.viewport;
          setNodes(importedState.nodes || []);
          setEdges(importedState.edges || []);
          // setViewport({ x, y, zoom });
        }
      };
      fileReader.readAsText(file);
    } else {
      console.log("No file selected");
    }
  }

  async function ConvertToFlowchart() {
    try {
        // Send POST request to the backend
        const response = await fetch("http://localhost:3000/api/ToFlowchart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ CODE: value }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json()

        const nd_edg = JSON.parse(data.replace(/```json|```/g, ''))

        //this part of code is used for lay out
        // const nd = nd_edg.nodes
        // const edg = nd_edg.edges
        // const { layoutedNodes, layoutedEdges } = DagreLayout({
        //  nd,
        //  edg
        // });
        // setNodes(layoutedNodes)
        // setEdges(layoutedEdges)

        setNodes(nd_edg.nodes)
        setEdges(nd_edg.edges)

    } catch (error) {
        console.error("Error:", error);
    }
}


  async function ConvertToCode() {
    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:3000/api/ToCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ NODES: nodes, EDGES: edges }),
      });

      const data = await response.json();
      setValue(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex justify-between w-full p-3 z-10 fixed top-0">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={NewFlowchart}>New Flowchart</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={ExportJson}>Export JSON</MenubarItem>
                <MenubarItem >Export PNG</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="mx-2.5" htmlFor="flow.json">
                Import Flowchart
              </Label>
              <Input
                id="flow.json"
                type="file"
                accept=".json"
                onChange={ImportFlowchart}
              />
            </div>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Light Theme</MenubarCheckboxItem>
            <MenubarCheckboxItem>Dark Theme</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "StartNode")}
            draggable
          >
            Start
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "ProcessNode")}
            draggable
          >
            Process
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "InputNode")}
            draggable
          >
            Input
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "DecisionNode")}
            draggable
          >
            Decision
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "OutputNode")}
            draggable
          >
            Output
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="node_btn"
            onDragStart={(event) => onDragStart(event, "EndNode")}
            draggable
          >
            End
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger onClick={RunClicked}>Run</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Convert</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={ConvertToCode}>To Code</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={ConvertToFlowchart}>To Flowchart</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Menu;
