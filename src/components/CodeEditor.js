import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    marginLeft: "auto",
  },
  code: {
    paddingTop: theme.spacing(1),
  },
}));

const CodeEditor = (props) => {
  // console.log("Code Editor");
  const classes = useStyles();

  return (
    <div>
      <div className={classes.code}>
        <AceEditor
          mode="mysql"
          theme="github"
          onChange={props.onChange}
          onSelectionChange={props.onSelectionChange}
          name="code-editor"
          editorProps={{ $blockScrolling: false }}
          height="300px"
          width="100%"
          minLines={100}
          wrapEnabled={false}
          showPrintMargin={false}
          //   className="editor"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
