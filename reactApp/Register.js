import React from 'react';
// import Redirect from 'react-router';
import axios from 'axios';
import {Redirect, Link} from 'react-router-DOM';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      registered: false
    };
  }

  register() {
    axios.post("http://localhost:3000/register", {
      username: this.state.username,
      password: this.state.password
    }, {
      withCredentials: true
    })
    .then((response)=>{
      console.log(response);
      this.setState({
        registered: true
      });
    });
  }

  render(){
    console.log(this.props.location.pathname);
    if (this.state.registered) {
      return(<Redirect to="/"></Redirect>);
    }

    return(
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>

        <h1>Register</h1>
        <br/>
        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={(e)=>(this.setState({username: e.target.value}))}/>
        <br/>
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(e)=>(this.setState({password: e.target.value}))}/>
        <div className = 'memberLink'>
          <button onClick={this.register.bind(this)}>
            Register
          </button>
        </div>
        <Link to='/'>
          <div style={{padding: '10px'}}>Back to Login</div>
        </Link>
      </div>
    );
  }

}

export default Register;
