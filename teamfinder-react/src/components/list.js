import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    maxHeight: 500,
    backgroundColor: theme.palette.background.paper,
    // overflow: "auto",
    // overflowX: "hidden",
    // overflowY: "scroll",
  },
  // gridList: {
  // width: 500,
  // height: 450,
  // },
}));
// rt default function ImageGridList() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={160} className={classes.gridList} cols={3}>
//         {tileData.map((tile) => (
//           <GridListTile key={tile.img} cols={tile.cols || 1}>
//             <img src={tile.img} alt={tile.title} />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }
const ListComponent = (props) => {
  const classes = useStyles();
  console.log("ListContent", props.content);

  return (
    // dense
    <List className={classes.root} subheader={<div />}>
      <ListSubheader>Team for {props.content[0]}</ListSubheader>
      {/* <lh>Team for {props.content[0]}</lh> */}

      <Divider />
      {props.content.map((value, ind) => {
        const labelId = `label-${ind}`;
        console.log("value", value);
        let result = (
          <ListItem
            key={ind}
            button
            onClick={() => props.onNewSearchClick(value, props.grid_key)}
          >
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`https://github.com/${value}.png`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
        // if (ind == 0) {
        //   result = (
        //     <ListSubheader>
        //       <ListItem key={ind} button>
        //         <ListItemAvatar>
        //           <Avatar
        //             alt={`Avatar n°${value + 1}`}
        //             // src={props.url}
        //           />
        //         </ListItemAvatar>
        //         <ListItemText id={labelId} primary={value} />
        //       </ListItem>
        //     </ListSubheader>
        //   );
        // }
        return result;
      })}
    </List>
  );
};

export default ListComponent;
