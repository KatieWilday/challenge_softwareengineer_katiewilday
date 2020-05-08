import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {BASE_URL} from '../index';

export default function ConversationList(props){
  let history = useHistory();

/*  function handleClick(conversation){
    let id = conversation._id;
    let url = `/conversation/${id}`
    // let url = BASE_URL + `/conversation/${id}`
    history.push(`/conversation/${id}`);
    axios.get(url)
      .then((response) => {
        console.log('Response: ' + response);
        props.updateConversation(response.data);
      })
      .catch((error) => {
        console.log('Error: ' + error)
      });
  };
*/

  function handleClick(conversation){
    let id = conversation.id
    conversation.preventDefault();
    console.log('The link was clicked')
  }

  function handleDelete(conversation){
    let url = '/conversations';
    // let url = BASE_URL + '/conversations';
    axios.delete(url, {data: {id: conversation.id}})
      .then((response) => {
        console.log('Response: ' + response)
        props.updateState();
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
  }

    return (
      <div>
      <ul className="collection">
        {props.conversations.map((conversation) => (
          <button className="collection-item" key={conversation.id} onClick={handleClick.bind(this)}>
            <div>{conversation.text}
              <div onClick={handleDelete.bind(this)} className="content">
                <button className="btn-effect" type="submit" name="action">Delete</button>
              </div>
            </div>
          </button>
        ))}
      </ul>
      </div>
    )
}
