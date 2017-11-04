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
      <div>
        <AppBar title = "RE_EDIT" />
        <Route path={"/"} exact component = {Login} />
        <Route path={"/register"} exact component = {Register} />
        <Route path={"/editor/:userid/:docid"} exact component = {Main} />
        <Route path={"/document/:userid"} exact component = {DocumentPortal} />
        <Route path={"/newdocument"} exact component = {NewDoc} />
      </div>
    );
  }


}

export default Router;
