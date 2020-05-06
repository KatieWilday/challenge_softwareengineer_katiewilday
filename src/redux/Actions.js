export const fetchConversations = () => dispatch => {
  return fetch("http://localhost:3000/dev")
    .then(res => res.json())
    .then(conversations =>
      dispatch({ type: "FETCH_CONVERSATIONS_SUCCESS", payload: conversations })
    )
}

export const handleNoResults = () => {
  return {
    type: "NO_RESULTS"
  }
}

export const handleError = (errorCode, errorMsg) => {
  return {
    type: "ERROR",
    payload: [errorCode, errorMsg]
  }
}

export const updateConversation = conversation => {
  return {
    type: "UPDATE_CONVERSATION_SUCCESS",
    conversation: conversation
  }
}
