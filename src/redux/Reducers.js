const initialState = {
  conversations: [],
  restaurant: {
    r_name: "",
    r_type: "",
    r_description: "",
    r_review: "",
    rating: "",
    likes: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CONVERSATIONS_SUCCESS":
      return {
        ...state,
        conversations: action.payload
      }
    case "UPDATE_CONVERSATION_SUCCESS":
      // we need to map over the state.restaurants and replace the old version of the restaurant with action.restsurant
      return {
        ...state,
        conversations: state.conversations.map(function(conversation) {
          //inspect each conversation
          if (restaurant.id === action.conversation.id) {
            return action.conversation
          } else {
            return conversation
          }

        })
      }

    default:
      return state
  }
}
