import React, { Fragment } from 'react';
import { Row, Col, Typography, Checkbox, Divider } from 'antd';
import ClearAllFilterButton from './SharedComponents/ClearAllFilterButton';

const { Title } = Typography;

class AddOutcomes extends React.Component {
  clearAllFilters = () => {
    if (this.props.checkedList.length > 0) {
      this.props.clearSelectedRowsKeys();
    }
  };
  render() {
    console.log('outcome', this.state, this.props);
    return (
      <Fragment>
        <ClearAllFilterButton clearAllFilters={this.clearAllFilters} />
        <Checkbox.Group
          style={{ width: '100%' }}
          value={this.props.checkedList}
          onChange={this.props.rowSelection}
        >
          <Row style={{ padding: '0 0 10px' }}>
            <Title level={4}>Wicket</Title>
            <Col span={3}>
              <Checkbox value='anyWicket'>Any wicket</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <Checkbox value='bowled'>Bowled</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='caught'>Caught</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='lbw'>LBW</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='stumped'>Stumped</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='runout'>Run-out</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='hitwicket'>Hit-wicket</Checkbox>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Title level={4}>Runs of the bat</Title>

            <Col span={3}>
              <Checkbox value='6runs'>6 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='5runs'>5 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='4runs'>4 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='3runs'>3 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='2runs'>2 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='1runs'>1 runs</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='0runs'>0 runs</Checkbox>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Title level={4}>Extras</Title>

            <Col span={3}>
              <Checkbox value='wide'>Wide</Checkbox>
            </Col>
            <Col span={3}>
              <Checkbox value='noball'>No-ball</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Fragment>
    );
  }
}

export default AddOutcomes;
