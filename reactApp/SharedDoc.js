import React from 'react';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';

class SharedDoc extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      shareddocid: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSharedDoc = this.addSharedDoc.bind(this);
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


  addSharedDoc() {
    // alert('A new document is added' + this.state.value);
    // event.preventDefault();
    console.log(this.props.user);
    axios.post('http://localhost:3000/addSharedDoc',{
      docid: this.state.shareddocid,
      userid: this.props.user
    })
    .then((response)=>{
      console.log(response);
      this.props.history.push(`/editor/${this.props.user}/${response.data._id}`);
      // this.props.history.pop();
    })
    .catch((err)=>{
      console.log('Error: ', err);
      return null;
    });
  }


  render(){
    return(
      <form>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <RaisedButton
          type="submit"
          value="Submit"
          label="Add shared document"
          onClick={this.openModal}
          backgroundColor = {String(colors.gray200)}
        />

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Add Shared Document</h2>
            <label>Document Id</label>
            <input type="text"
                  ref="shareddocid"
                  placeholder="Enter document Id"
                  onChange={(e)=>(this.setState({shareddocid: e.target.value}))}
                  value={this.state.shareddocid}
                /><br/>
            <button onClick = {()=>this.addSharedDoc()} >Submit </button><br/>
            <button onClick={this.closeModal}>close</button>
          </Modal>

          </div>
      </form>
    );
  }
}

export default SharedDoc;
