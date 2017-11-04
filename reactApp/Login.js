import React from 'react';
import Redirect from 'react-router';
import {BrowserRouter, Switch, Route, Link} from 'react-router-DOM';
import axios from 'axios';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  login() {
    axios.post('http://localhost:3000/login',{
      username: this.state.username,
      password: this.state.password
    })
    .then((response)=>{
      this.props.history.push('/document/'+response.data._id);
    })
    .catch((err)=>{
      console.log('Error: ', err);
      return null;
    });
  }

  render(){
    console.log(this.props.location.pathname);
    return(
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h1>LOGIN</h1>
        <br/>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={(e)=>(this.setState({username: e.target.value}))}/>
        <br/>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={(e)=>(this.setState({password: e.target.value}))}/>
        <div className = 'memberLink' style={{margin: '20px'}}>
          <button onClick={this.login.bind(this)}>
            Login
          </button>
        </div>
        <Link to='/register'>
          <div style={{padding: '10px'}}>Not a member? Click Here to Register</div>
        </Link>
        {/* <Route path="/editor" component = {Main}/> */}
      </div>
    );
  }


}

export default Login;
