import React,{ Profiler } from "react";
import ReactDOM from "react-dom";
import "../index.css"

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

// New information from user input
class IssueAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
 
	handleSubmit(e) {
		e.preventDefault();
		const form = document.forms.issueAdd;
		const issue = {name: form.name.value, password: form.password.value, id: form.name.value+form.password.value,}
		if (form.name.value.length==0){
			alert("Customer inofrmation can not be null!")
		}
		else {
			this.props.createIssue(issue);
			form.name.value = ""; form.password.value = "";
			alert("Sign up successfully! Go to login now!")
			window.location.assign('mainpage.html');
		}
	}
 
	render() {
		return (
		<form name="issueAdd" onSubmit={this.handleSubmit}>
			<input type="text"  placeholder="User Name" name="name"></input>  
			<input type="password"  placeholder="Password" name="password"></input>  
			<div ><button className="login" >Sign Up</button> </div> 
		</form> 
		);
	}
}

function jsonDateReviver(key, value) {
	if (dateRegex.test(value)) return new Date(value);
	return value;
}

// Graphql to fetch and send data
async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
}

// Main component to be exported to render in signup.html
class SignUp extends React.Component {
	constructor() {
		super();
		this.state = { issues: []};
		this.createIssue = this.createIssue.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}
 
	async loadData() {
		const query = `query {
			issueList {
				id name password
			}
		}`;
		const data = await graphQLFetch(query); 
		if (data) { 
			this.setState({ issues: data.issueList }); 
		}
	}
 
	async createIssue(issue) {
		const query = `mutation {
			issueAdd(issue:{
				id: "${issue.id}"
				name: "${issue.name}",
				password: "${issue.password}",
			}) {
			id
			}}`;
		const data = await graphQLFetch(query, { issue }); 
		if (data) { 
			this.loadData(); 
	}}

	render() {
	return(
		<Profiler id="IssueAdd" onRender={callback}>
		<IssueAdd createIssue={this.createIssue}/>
		</Profiler>
		);
	}
}

// Performance Evaluation
const callback = (
	id, // the "id" prop of the Profiler tree that has just committed
	phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
	actualDuration, // time spent rendering the committed update
	baseDuration, // estimated time to render the entire subtree without memoization
	startTime, // when React began rendering this update
	commitTime, // when React committed this update
	interactions // the Set of interactions belonging to this update
  ) => {
	console.log('id:', id, 'phase:', phase, 'actualDuration:', actualDuration, 'baseDuration:', baseDuration, 'startTime:', startTime, 'commitTime:', commitTime, 'interactions:', interactions)// Aggregate or log render timings...
}

export default SignUp;