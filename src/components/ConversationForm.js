import React from 'react';
import Select from 'react-select';
//import {BASE_URL} from '../index';

export default class ConversationForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      author: '',
      text: ''
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  };

  handleChangeText(event){
    this.props.onTextChange(event.target.value);
  };

  handleChangeInput(event){
    this.setState({author: event.value});
  };

  handleOnSubmit(event){
    event.preventDefault();
    var originalText = this.state.conversation;
    var newText = event.target.conversationText.value;
    console.log(originalText, newText);
    //const url = BASE_URL + '/mutations'
    const form = {
      conversationId: this.props.conversation.id, // "index": 15,
      text: event.target.conversationText.value,
      author: this.state.author
    }
    console.log(form);
  };

  render(){
    const text = this.props.conversation.text;
    const options = [
      { value: 'Alice', label: 'Alice' },
      { value: 'Bob', label: 'Bob' }
    ];
    return(
    <div>
      <div className="row-text">
        <form onSubmit={this.handleOnSubmit}>
          <div className="select">
            <Select options={options} onChange={this.handleChangeInput}/>
          </div>
          <div className="row">
            <h4>Enter Text:</h4>
            <div className="input-field">
              <textarea onChange={this.handleChangeText} id="conversationText" className="textarea" value={text} type="text"></textarea>
            </div>
          </div>
          <div className="row">
            <button className="btn-effect" type="submit" name="action">Send</button>
          </div>
        </form>
      </div>
    </div>
    );
  };
};
