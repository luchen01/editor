import React from 'react';
import NewDoc from './NewDoc';
import SharedDoc from './SharedDoc';
import axios from 'axios';
import { Link } from 'react-router-DOM';
import * as colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class DocumentPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      sharedDoc: [],
      user: ''
    };
  }

  componentWillMount(){
    axios.post('http://localhost:3000/getAllDocs', {
      userid: this.props.match.params.userid
    })
      .then((response) =>{
        console.log('response in document portal', response);
        console.log('user', this.props.match.params.userid );
        this.setState({
          files: response.data.ownDoc,
          sharedDoc: response.data.sharedDoc,
          user: this.props.match.params.userid
        });
        console.log('state', this.state);
      })
      .catch(err=>console.log(err));
  }

  logout(){
    axios.get('http://localhost:3000/logout')
    .then((resp) => {
      this.props.history.replace('/');
    })
    .catch(err=>console.log(err));
  }

  render() {
    return (
      <div>
      <h3>Document Portal</h3>
      CurrentUser: {this.props.match.params.userid} <br></br>
      <h6>Welcome!</h6>
      <NewDoc history = {this.props.history} user = {this.state.user}/>
      <div className = 'container'>
        <h3> My Documents </h3>
        <ul>
          {this.state.files.length > 0 ?
            this.state.files.map((doc)=>{
              return(
              <li key={doc._id}>
                 <Link to = {`/editor/${this.state.user}/${doc._id}`}>{doc.title}</Link>
              </li>
              );
            }) :
            <div>You don't have any documents yet.</div>
           }
      </ul>
      <h3> My Shared Documents</h3>
      <ul>
        {this.state.sharedDoc.length > 0 ?
          this.state.sharedDoc.map((doc)=>{
            return(
            <li key = {doc._id}>
              <Link to = {`/editor/${this.state.user}/${doc._id}`}>{doc.title}</Link>
            </li>);
          }) :
          <div>You don't have any shared documents.</div>
        }
    </ul>
      </div>
      <SharedDoc history = {this.props.history} user = {this.props.match.params.userid}/>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px'}}>
      <RaisedButton
        label="Logout"
        onClick={this.logout.bind(this)}
        backgroundColor = {String(colors.gray200)}
      />
    </div>
      </div>
    );
  }
}
export default DocumentPortal;
