import React, { Component } from 'react';
import { Row, Col, Layout, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import SelectComponent from '../../shared/SelectComponent';
import Spinner from '../../shared/Spinner';
import ImageGallery from '../../shared/ImageGallery';
import ModalContainer from '../../containers/SharedContainer/ModalContainer';

const Content = Layout;
let counter = 0;
let reelsCount = 10;
let seriedId = 7;
let sortType = 'ALL_TIME';
const sortByTypes = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];
const reelTypes = [5, 10, 25];

class TopRated extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.callTopRatedHighlights(sortType, reelsCount);
    console.log(++counter);
  }

  callTopRatedHighlights = (sortType, reelsCount) => {
    let formData = new FormData();
    formData.append('limit', 'LIMIT_' + reelsCount);
    formData.append('timeRange', sortType);
    formData.append('seriesId', seriedId);
    this.props.getTopRatedHighlights(formData);
  };

  changeNoOfReelsOption = value => {
    reelsCount = value;
    this.callTopRatedHighlights(sortType, reelsCount);
  };

  changeSortByOption = value => {
    value = value.replace(' ', '_').toUpperCase();
    sortType = value;
    this.callTopRatedHighlights(sortType, reelsCount);
  };

  showModal = (publishedReelId, reelId) => {
    this.setState({
      publishedReelId,
      reelId,
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
    this.callTopRatedHighlights(sortType, reelsCount);
  };

  render() {
    console.log('top rated', this.state, this.props);
    console.log('rend', ++counter);

    return (
      <React.Fragment>
        <Divider style={{ margin: '0' }} />
        <Content className='staticContentArea'>
          <Title level={3}>Top Rated Highlights</Title>
          <Row type='flex' justify='space-between'>
            <Col style={{ fontWeight: '500' }}>
              Sort By:
              <SelectComponent
                defaultIndex={0}
                changeSelectOption={this.changeSortByOption}
                options={sortByTypes}
              />
            </Col>
            <Col style={{ fontWeight: '500' }}>
              No of Reels:
              <SelectComponent
                defaultIndex={1}
                changeSelectOption={this.changeNoOfReelsOption}
                options={reelTypes}
              />
            </Col>
            <Divider />
          </Row>
          {this.props.topRatedHighlightsLoading && <Spinner />}
          {this.props.topRatedHighlights && (
            <ImageGallery showModal={this.showModal} highlights={this.props.topRatedHighlights} />
          )}
        </Content>
        {this.state.visible && (
          <ModalContainer
            closeModal={this.closeModal}
            formData={this.props.formData}
            visible={this.state.visible}
            publishedReelId={this.state.publishedReelId}
            reelId={this.state.reelId}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TopRated;
