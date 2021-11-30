import React from "react";
import ReactDOM from "react-dom";
import "../index.css"

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

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
//style="text-align: center;"

function jsonDateReviver(key, value) {
	if (dateRegex.test(value)) return new Date(value);
	return value;
}

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
 
	async createIssue(issue) {//增加判断如果name存在
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
		<IssueAdd createIssue={this.createIssue}/>
		);
	}
}

export default SignUp;