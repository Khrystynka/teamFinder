import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px",
  },
  search: {
    display: "flex",
    flexFlow: 1,
    borderRadius: 8,
    // border:
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(1, 2, 1, 2),

    color: "blue",
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    textDecoration: "underline",

    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
  findButton: {
    backgroundColor: "lightgray",
    color: "blue",
    borderRadius: 8,
    border: "None",
    "&:hover": {
      backgroundColor: "lightgray",
      border: "2px solid blue" /* Green */,
    },
  },
}));

const SearchField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          className={classes.inputInput}
          placeholder="Search team for …"
          inputProps={{ "aria-label": "search" }}
          onChange={props.onSearchInputChange}
        />
      </div>
      <Button
        className={classes.findButton}
        disabled={props.searchInput ? false : true}
        onClick={props.onFindButtonClick}
      >
        Find team
      </Button>
    </div>
  );
};

export default SearchField;
