import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListComponent from "./list";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 530,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemGrid = (props) => {
  const classes = useStyles();

  return (
    // zeroMinWidth
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
      <Paper elevation={3} style={{ height: 500, overflow: "auto" }}>
        <ListComponent
          content={props.content}
          grid_key={props.grid_key}
          // search_user={props.search_user}
          onNewSearchClick={props.onNewSearchClick}
        />
      </Paper>
    </Grid>
  );
};
export default ItemGrid;
