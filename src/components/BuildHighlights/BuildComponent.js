import React, { Component } from 'react';
import { baseFormData } from '../../redux/sources/requestBody';
import ListingAreaContainer from '../../containers/BuildHighlights/ListingAreaContainer';

class BuildComponent extends Component {
  setFormData = () => {
    let formData = new FormData();
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key]);
    }
    return formData;
  };

  componentDidMount() {
    this.props.getPlayersData(this.setFormData());
    this.setState({ isLoading: false });
  }

  render() {
    console.log('build component', this.state, this.props);
    return (
      <React.Fragment>
        {this.props.players && (
          <ListingAreaContainer isLoading={this.props.isLoading} players={this.props.players} />
        )}
      </React.Fragment>
    );
  }
}

export default BuildComponent;
