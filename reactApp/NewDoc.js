import React from 'react';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter, Switch, Route, Link} from 'react-router-DOM';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';

class NewDoc extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newdocname: '',
      newdocpw: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createNewDoc = this.createNewDoc.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
    this.subtitle.style.alignItems = 'center';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  createNewDoc() {
    // alert('A new document is added' + this.state.value);
    // event.preventDefault();
    console.log('create new doc', this.props.user);
    axios.post('http://localhost:3000/newdoc',{
      title: this.state.newdocname,
      body: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      user: this.props.user
    })
    .then((response)=>{
      console.log(response);
      console.log("url", '/editor/' + response.data._id );
      this.props.history.push(`/editor/${this.props.user}/${response.data._id}`);
      // this.closeModal();
    })
    .catch((err)=>{
      console.log('Error: ', err);
    });
  }

  render(){
    return(
    <form >
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <RaisedButton
        type="submit"
        value="Submit"
        label="Create new document"
        onClick={this.openModal}
        backgroundColor = {String(colors.gray200)}
      />
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>New Document</h2>
          <label>Document Name</label>
          <input type="text"
                ref="new_doc_name"
                placeholder="Enter new document name"
                onChange={(e)=>(this.setState({newdocname: e.target.value}))}
                value={this.state.newdocname}
              /><br/>
          {/* <label>Document Password</label>
          <input type="text"
                ref="new_doc_pw"
                placeholder="Enter new document password"
                onChange={(e)=>(this.setState({newdocpw: e.target.value}))}
                value={this.state.newdocpw} /><br/> */}
          <button onClick = {()=>this.createNewDoc()} >Submit </button><br/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
    </form>
    );
  }
}

export default NewDoc;
