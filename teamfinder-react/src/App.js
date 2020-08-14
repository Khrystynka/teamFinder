import React, { Component } from "react";
import "./App.css";
import PrimarySearchAppBar from "./components/appBar";
import axios from "axios";
import SearchField from "./components/search";
import ContainerGrid from "./components/containerGrid";

const LOGIN_URL = "http://127.0.0.1:5000/login";
const LOGOUT_URL = "http://127.0.0.1:5000/logout";

const CURRENT_USER_URL = "http://127.0.0.1:5000/user";
const FIND_USER_TEAM_URL = "http://127.0.0.1:5000/get_team/";

const onLoginBtnClicked = (isAuth) => {
  if (isAuth) {
    console.log("You are successfully logged in!");
  } else {
    console.log("not logged in");
    window.location.href = LOGIN_URL;
    // axios.get(LOGIN_URL).then((response) => {
    // console.log(response);
    // });
  }
};

class App extends Component {
  state = {
    search_login: "",
    isAuth: false,
    auth_user: "",
    team: [[]],
  };
  componentDidMount() {
    // constructor() {
    // super();
    this.get_user();
  }
  get_user = () => {
    axios
      .get(CURRENT_USER_URL, { withCredentials: true })
      // .get(CURRENT_USER_URL)
      .then((response) => {
        const isAuth = response.data["isAuth"] ? true : false;
        const current_user = response.data["auth_user"];
        console.log("RESPONSE", response.data["isAuth"]);
        this.setState({
          isAuth: isAuth,
          auth_user: current_user,
        });
        console.log("State", this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getTeam = (login) => {
    let team = [];
    console.log("login from getteam", login);
    axios
      .get(FIND_USER_TEAM_URL + login, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const new_team = [this.state.search_login].concat(
          response["data"]["team"]
        );
        let base_team = [...this.state.team];
        console.log("baseteam", base_team);
        if (base_team[0].length === 0) {
          base_team = [new_team];
        } else {
          base_team.push(new_team);
        }
        console.log("team", base_team);

        this.setState({
          ...this.state,
          team: base_team,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onFindButtonClick = () => {
    if (!this.state.isAuth) {
      console.log("Login First");
    } else {
      this.getTeam(this.state.search_login);
    }
  };

  onNewSearchClick = (value) => {
    this.getTeam(value);
    this.setState({
      search_login: value,
    });
  };
  onSearchInputStart = (event) => {
    this.setState({
      search_login: event.target.value,
    });
  };
  render() {
    let teamGrid = null;

    if (this.state.team[0].length != 0) {
      teamGrid = (
        <ContainerGrid
          content={this.state.team}
          search_user={this.state.search_login}
          onNewSearchClick={(value) => {
            this.onNewSearchClick(value);
          }}
        ></ContainerGrid>
      );
    }
    return (
      <div className="App">
        <PrimarySearchAppBar
          isAuth={this.state.isAuth}
          auth_user={this.state.auth_user}
          login={() => onLoginBtnClicked(this.state.isAuth)}
        />
        <SearchField
          onSearchInputChange={(event) => this.onSearchInputStart(event)}
          searchInput={this.state.search_login}
          onFindButtonClick={() => this.onFindButtonClick(this.state.isAuth)}
        />
        {teamGrid}
      </div>
    );
  }
}
export default App;
