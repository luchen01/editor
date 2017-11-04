import React from 'react';
import { Route } from 'react-router-DOM';
import AppBar from 'material-ui/AppBar';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import DocumentPortal from './DocumentPortal';
import NewDoc from './Router';
class Router extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div >
        <AppBar title = "Editor" style = {{backgroundColor: '#9E9E9E'}}/>
        <div className = 'background'>
        <Route path={"/"} exact component = {Login} />
        <Route path={"/register"} exact component = {Register} />
        <Route path={"/editor/:userid/:docid"} exact component = {Main} />
        <Route path={"/document/:userid"} exact component = {DocumentPortal} />
        <Route path={"/newdocument"} exact component = {NewDoc} />
      </div>
      </div>
    );
  }


}

export default Router;
