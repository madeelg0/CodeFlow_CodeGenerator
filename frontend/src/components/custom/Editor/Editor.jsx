import "./Editor.css";
import { React, useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

const Editor = ({ value, setValue }) => {
  const onChange = useCallback((val) => {
    setValue(val);
  }, []);
  useEffect(() => {
    setValue(value)
  }, [value]);

 
  return (
    <CodeMirror
      className="myEditor"
      value={value}
      height="100%"
      theme={"light"}
      onChange={onChange}
      extensions={[cpp()]}
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
    />
  );
};

export default Editor;
