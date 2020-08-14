import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {},
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();
  const loginButton = (
    <Button color="inherit" onClick={props.login}>
      {props.isAuth ? "Logout" : "Git Login"}
    </Button>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TeamFinder
          </Typography>

          <div className={classes.grow} />
          <p>{props.isAuth ? "Hi, " + props.auth_user + "!" : null}</p>

          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
