import React, { Component } from 'react';
import { Row, Col, Layout, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import SelectComponent from '../../shared/SelectComponent';
import Spinner from '../../shared/Spinner';
import ImageGallery from '../../shared/ImageGallery';
import ModalContainer from '../../containers/SharedContainer/ModalContainer';

const Content = Layout;

let seriedId = 7;
let highlightTypeIndex;
let reloadPage = false;
const highlightsTypes = [
  'Short Bowling Highlights (4s and 6s)',
  'Long Bowling Highlights ( and dot balls)',
  'Short Bowling Highlights (wickets)',
  'Long Batting Highlights (2s, 3s, 4s and 6s)',
  'Short Complete Highlights (4s, 6s and wickets)',
];
class StandardHighlights extends Component {
  state = {
    visible: false,
    highlightType: 4,
  };
  componentDidMount() {
    this.callStandardHighlightsApi(seriedId);
  }

  callStandardHighlightsApi = seriedId => {
    this.props.getStandardHighlights('?seriesId=' + seriedId);
  };

  changeHighlightTypeOption = value => {
    switch (value) {
      case highlightsTypes[0]:
        highlightTypeIndex = 0;
        break;
      case highlightsTypes[1]:
        highlightTypeIndex = 1;
        break;
      case highlightsTypes[2]:
        highlightTypeIndex = 2;
        break;
      case highlightsTypes[3]:
        highlightTypeIndex = 3;
        break;
      case highlightsTypes[4]:
        highlightTypeIndex = 4;
        break;
      default:
        break;
    }
    this.setState({ highlightType: highlightTypeIndex });
  };

  showModal = (publishedReelId, reelId) => {
    this.setState({
      publishedReelId,
      reelId,
      visible: true,
    });
  };

  reloadHighlightsPage = () => {
    reloadPage = true;
  };

  closeModal = () => {
    this.setState({ visible: false });
    if (reloadPage) {
      this.callStandardHighlightsApi(seriedId);
    }
  };

  filterStandardHighlights = (standardHighlights, highlightType) => {
    let a = standardHighlights.map((element, index) => {
      return element[highlightType];
    });
    console.log('AA', a);
    return a;
  };
  render() {
    console.log('standard highlights', this.state, this.props);
    return (
      <React.Fragment>
        <Divider style={{ margin: '0' }} />

        <Content className='staticContentArea'>
          <Row type='flex' justify='space-between'>
            <Title level={3}>Standard Highlights</Title>

            <Col style={{ fontWeight: '500' }}>
              <SelectComponent
                defaultIndex={this.state.highlightType}
                changeSelectOption={this.changeHighlightTypeOption}
                options={highlightsTypes}
              />
            </Col>

            <Divider />
          </Row>
          {this.props.standardHighlightsLoading ? (
            <Spinner />
          ) : this.props.standardHighlights ? (
            <ImageGallery
              showModal={this.showModal}
              highlights={this.filterStandardHighlights(
                this.props.standardHighlights,
                this.state.highlightType,
              )}
            />
          ) : null}
        </Content>
        {this.state.visible ? (
          <ModalContainer
            closeModal={this.closeModal}
            formData={this.props.formData}
            visible={this.state.visible}
            publishedReelId={this.state.publishedReelId}
            reelId={this.state.reelId}
            reloadHighlightsPage={this.reloadHighlightsPage}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default StandardHighlights;
