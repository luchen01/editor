import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter} from 'react-router-DOM';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from './Router';


require('../css/Draft.css');

// ReactDOM.render(
//   <MyEditor />pos,
//   document.getElementById('root')
// );
/* This can check if your electron app can communicate with your backend */
fetch('http://localhost:3000')
.then(resp => resp.text())
.catch(err => {throw err;});

ReactDOM.render(
  <HashRouter basename='/'>
    <MuiThemeProvider>
      <Route path={"/"} component={Router}/>
    </MuiThemeProvider>
  </HashRouter>,
   document.getElementById('root'));
