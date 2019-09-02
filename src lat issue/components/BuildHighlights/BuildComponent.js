import React, { Component } from 'react'
import PlayersListingNew from './ContentArea/PlayersListingNew'
import { baseFormData } from '../../redux/sources/requestBody'

class BuildComponent extends Component {
  setFormData = () => {
    let formData = new FormData()
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key])
    }
    return formData
  }

  componentDidMount() {
    this.props.getPlayersData(this.setFormData())
    this.setState({ isLoading: false })
  }

  render() {
    console.log('renderMehtod', this.state, this.props, 'teams')

    return (
      <React.Fragment>
        {this.props.players ? (
          <PlayersListingNew
            isLoading={this.props.isLoading}
            players={this.props.players}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default BuildComponent