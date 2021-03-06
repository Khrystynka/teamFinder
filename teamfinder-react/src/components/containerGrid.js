import React from "react";
import Grid from "@material-ui/core/Grid";
import ItemGrid from "./itemGrid";

const ContainerGrid = (props) => {
  const gridItems = props.content.map((item, ind) => {
    return (
      <ItemGrid
        key={ind}
        grid_key={ind}
        content={item}
        onNewSearchClick={props.onNewSearchClick}
      />
    );
  });
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      wrap="wrap"
      spacing={3}
    >
      {gridItems}
    </Grid>
  );
};
export default ContainerGrid;
