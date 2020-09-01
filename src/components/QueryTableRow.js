import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  descriptionCell: {
    // whiteSpace: "nowrap",
    // maxWidth: "300px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
  },
}));

const QueryTableRow = (props) => {
  // console.log("QueryTableRow");
  const classes = useStyles();
  return props.rows.map((row) => (
    <TableRow key={row.id}>
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => props.handleClick(event, row.id, row.status)}
        />
      </TableCell>
      <TableCell component="th" id={row.id} scope="row" padding="none">
        {row.id}
      </TableCell>
      <TableCell className={classes.descriptionCell}>{row.statement}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.output_status}</TableCell>
      {/* <TableCell>{row.submittedts}</TableCell> */}
    </TableRow>
  ));
};

export default QueryTableRow;
