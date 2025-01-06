import React from "react";
import { useState } from "react";
import "@/components/custom/CustomNodes/CustomNodes.css";

import { Handle, Position } from "reactflow";

export const StartNode = ({ isConnectable }) => {
  return (
    <div className="StartNode">
      Start
      <Handle
        type="source"
        position={Position.Bottom}
        id="sn"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export const EndNode = ({ isConnectable }) => {
  return (
    <div className="EndNode">
      <Handle
        type="target"
        id="en"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      End
    </div>
  );
};

export const InputNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.PseudoCode);

  const handleChange = (event) => {
    setText(event.target.value);
    data.PseudoCode = event.target.value; // Update the node label
  };
  return (
    <div className="InputNode">
      <div className="InputNodeContent">
        <Handle
          type="target"
          id="ina"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <input
          className="InputInput"
          type="text"
          placeholder="Input"
          value={text}
          onChange={handleChange}
        />

        <Handle
          type="source"
          position={Position.Bottom}
          id="inb"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};

export const OutputNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.PseudoCode);

  const handleChange = (event) => {
    setText(event.target.value);
    data.PseudoCode = event.target.value;
  };
  return (
    <div className="OutputNode">
      <div className="OutputNodeContent">
        <Handle
          type="target"
          id="ona"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <input
          className="OutputInput"
          type="text"
          placeholder="Output"
          value={text}
          onChange={handleChange}
        />

        <Handle
          type="source"
          position={Position.Bottom}
          id="onb"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};

export const ProcessNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.PseudoCode);

  const handleChange = (event) => {
    setText(event.target.value);
    data.PseudoCode = event.target.value; // Update the node label
  };
  return (
    <div className="ProcessNode">
      <Handle
        type="target"
        id="pna"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <input
        className="processInput"
        type="text"
        placeholder="Process"
        value={text}
        onChange={handleChange}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="pnb"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export const DecisionNode = ({ data, isConnectable }) => {
  const [text, setText] = useState(data.PseudoCode);

  const handleChange = (event) => {
    setText(event.target.value);
    data.PseudoCode = event.target.value; // Update the node label
  };
  return (
    <div className="DecisionNodeContainer">
      <div className="DecisionNode">
        <div className="DecisionNodeContent">
          <input
            className="DecisionInput"
            type="text"
            placeholder="Decision"
            value={text}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="DecisionNodeHandels">
        <Handle
          type="target"
          id="dna"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="FALSE"
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="TRUE"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};
