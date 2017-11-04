import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertFromRaw, convertToRaw} from 'draft-js';
import {Map} from 'immutable';

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  right: {
    wrapper: <div className = "right-align"/>
  },
  center: {
    wrapper: <div className = "center-align"/>
  }
}));


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {editorState: EditorState.createEmpty()};
    // this.onChange = (editorState) => this.setState({editorState});
    this.state = {
      open: false
    };
  }

  render() {
    var DatetoShow = new Date(parseInt(this.props.date));
    console.log(DatetoShow);
    console.log(typeof DatetoShow.toTimeString());
    var historyContent = this.props.editorState;
    var editorStateHistory = EditorState.createWithContent(convertFromRaw(JSON.parse(historyContent.EditorState)));
    return (
      <div>
      <RaisedButton
        backgroundColor = "#FFCA28"
        onMouseDown = {()=>{this.setState({open: !this.state.open});}}
        label = {DatetoShow.toString()}
      />
      {this.state.open ?
          <Editor
            blockRenderMap={myBlockTypes}
            editorState={editorStateHistory}
          /> : <div></div>
            }
          </div>
    );
  }
}


class ViewHistory extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in view history', props.history);
  }

  render(){
    return(
      <div>
      <h5>Previous Versions</h5>
      <ul>
        {/* object keys: {Object.keys(this.props.history)} */}
      { Object.keys(this.props.history).map((date)=>{
        // console.log('date', date);
        return(
          <li key = {date} style = {{padding: '5px'}}>
            <MyEditor date = {date} key = {date} editorState = {this.props.history[date]} />
            <br></br>
        </li>
        );
      })}
    </ul>
  </div>
    );
  }

}

export default ViewHistory;
