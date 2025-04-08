import React from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/mode/htmlmixed/htmlmixed";

export default function Editor({ language, displayName, value, onChange }) {
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  function handleEditorDidMount(editor) {
    editor.on("inputRead", (cm, event) => {
      if (!cm.state.completionActive && event.text[0].match(/[\w<]/)) {
        CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
      }
    });
  }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expandbtn"
          onClick={() => {
            setOpen((preOpen) => !preOpen);
          }}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      {/* <ControlledEditor
            onBeforeChange = {handleChange}
            value = {value}
            className = "code-mirror-wrapper"
            options ={{
                lineWrapping: true,
                lint: true,
                theme: "material",
                lineNumbers: true,
                mode: language
            }}
            /> */}

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: { name: language, globalVars: true },
          theme: "material",
          lineNumbers: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
        }}
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
}
