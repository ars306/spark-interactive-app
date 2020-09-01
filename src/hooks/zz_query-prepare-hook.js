import { useState } from "react";

export const useQueryPrepare = () => {
  const [code, setCode] = useState(null);
  const [selCode, setSelCode] = useState({});
  let query = "";
  // const [query, setQuery] = useState(null);

  const onChange = (newValue) => {
    // console.log(newValue);
    setCode(newValue);
  };

  const onSelectionChange = (selection, evt) => {
    // console.log("selection", selection.getRange());
    // console.log("selection", selection.getRange().start["row"]);
    // console.log("selection", selection.getRange().end["row"]);
    setSelCode({
      start: selection.getRange().start["row"],
      end: selection.getRange().end["row"],
      startCol: selection.getRange().start["column"],
      endCol: selection.getRange().end["column"],
    });
  };

  // console.log(selCode);

  if (code) {
    const codeArray = code.split("\n");

    codeArray.map((row, index) => {
      // console.log(row, index);
      if (index >= selCode.start && index <= selCode.end) {
        if (selCode.start !== selCode.end) {
          if (index === selCode.start) {
            row = row.substring(selCode.startCol);
          } else if (index === selCode.end) {
            row = row.substring(0, selCode.endCol);
          }
        } else {
          row = row.substring(selCode.startCol, selCode.endCol);
        }

        query = query + " " + row;
      }
      return query;
    });
  }

  // console.log(selection);
  return { onChange, onSelectionChange, query, code, selCode };
};
