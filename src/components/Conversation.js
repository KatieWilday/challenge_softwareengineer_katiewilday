import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

class Conversation extends React.Component {

  render() {
    return (
       <div className="Conversation">
          <h2>{this.props.conversation.conversationId</h2>
            <div className="Conversation-information-details">
              <p>{this.props.conversation.author}</p>
              <p>{this.props.conversation.text}</p>
            </div>
      </div>
    )
  }
}

export default Conversation
