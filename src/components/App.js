import React from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { BASE_URL } from '../index';
import ConversationForm from './ConversationForm';
import ConversationList from './ConversationList';

export default class App extends React.Component{
  state = {
    conversations: [],
    conversation: {}
  };
  updateState = () => {
    axios.get('/conversations')
      .then((res) => {
        this.setState({conversations: res.data});
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  updateConversation = (conversation) => {
    this.setState({conversation: conversation});
  };
  handleTextChange = (value) => {
    this.setState({conversation: {text: value}});
    console.log(this.state.conversation.text);
  };
  componentDidMount(){
    this.updateState();
  };
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <nav>
            <div className="nav-wrapper">
              <a href="/">Home</a>
            </div>
          </nav>
          <ConversationList conversations={this.state.conversations} updateState={this.updateState} updateConversation={this.updateConversation}/>
          <Switch>
            <Route path='/conversation/:id'>
              <ConversationForm conversation={this.state.conversation} onTextChange={this.handleTextChange}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};
