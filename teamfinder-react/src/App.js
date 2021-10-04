import React, { Component } from "react";
import "./App.css";
import PrimarySearchAppBar from "./components/appBar";
import axios from "axios";
import SearchField from "./components/search";
import ContainerGrid from "./components/containerGrid";
// server_path = os.environ["PORT"];
// server_path = "http://127.0.0.1:5000";
const LOGIN_URL = "/login";
const LOGOUT_URL = "/logout";

const CURRENT_USER_URL = "/user";
const FIND_USER_TEAM_URL = "/get_team/";

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
				console.log("RESPONSE", response);
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
	getTeam = (login, ind) => {
		console.log("From table#", ind, " get login: ", login);
		axios
			.get(FIND_USER_TEAM_URL + login, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response);
				const base_team = this.formTeam(response, login, ind);

				this.setState({
					...this.state,
					team: base_team,
				});
				console.log("new team state", this.state.team);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	formTeam = (response, login, ind) => {
		const new_team = [login].concat(response["data"]["team"]);
		let base_team = [...this.state.team].slice(0, ind + 1);
		console.log("state_team", this.state.team);
		console.log("new_team", new_team);
		console.log("baseteam", base_team);
		// console.log("base_team[0].length", base_team[0].length);
		if (ind === -1 || base_team[0].length === 0) {
			base_team = [new_team];
		} else {
			base_team.push(new_team);
		}
		console.log("team", base_team);
		return base_team;
	};
	onFindButtonClick = () => {
		if (!this.state.isAuth) {
			alert("Login First");
		} else {
			this.getTeam(this.state.input_text, -1);
		}
	};

	onNewSearchClick = (value, ind) => {
		console.log("clicked", value, ind);
		this.getTeam(value, ind);
		this.setState({
			search_login: value,
		});
	};
	onSearchInputStart = (event) => {
		this.setState({
			input_text: event.target.value,
		});
	};
	onLoginBtnClicked = (isAuth) => {
		// const cookie = Cookies.getJSON();

		// console.log("cookie", cookie);
		if (isAuth) {
			axios
				.get(LOGOUT_URL, {
					withCredentials: true,
				})
				.then((response) => {
					console.log(response);
					this.setState({
						...this.state,
						isAuth: false,
						team: [[]],
					});
				})
				.catch((error) => {
					console.log(error);
				});
			// console.log("cookie", cookie);
			// document.cookies
		} else {
			console.log("not logged in");
			window.location.href = LOGIN_URL;
			// axios.get(LOGIN_URL).then((response) => {
			// console.log(response);
			// });
		}
	};
	render() {
		let teamGrid = null;

		if (this.state.team && this.state.team[0].length != 0) {
			teamGrid = (
				<ContainerGrid
					content={this.state.team}
					search_user={this.state.search_login}
					onNewSearchClick={(value, ind) => {
						this.onNewSearchClick(value, ind);
					}}
				></ContainerGrid>
			);
		}
		return (
			<div className="App">
				<PrimarySearchAppBar
					isAuth={this.state.isAuth}
					auth_user={this.state.auth_user}
					login={() => this.onLoginBtnClicked(this.state.isAuth)}
				/>
				<SearchField
					onSearchInputChange={(event) => this.onSearchInputStart(event)}
					searchInput={this.state.input_text}
					onFindButtonClick={() => this.onFindButtonClick(this.state.isAuth)}
				/>
				{teamGrid}
			</div>
		);
	}
}
export default App;
