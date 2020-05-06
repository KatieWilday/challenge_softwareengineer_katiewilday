import React from "react"
import { connect } from "react-redux"
import { fetchRestaurants } from "../redux/actions/restaurantsActions"
import RestaurantListItem from "../components/Restaurant"
import "../App.css"

class ConversationsList extends Component {


  componentDidMount() {
    this.props.fetchConversations()
  }


  render() {
    this.props.conversations.sort(function(a, b) {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      return 0;
    });

    if (this.props.conversations.length === 0) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="list-style">
        <ul className="list-style-list">
          {this.props.conversationss.map(restaurant => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.conversations.conversations
  }
}

export default connect( mapStateToProps, { fetchCovns } )(RestaurantsContainer)
