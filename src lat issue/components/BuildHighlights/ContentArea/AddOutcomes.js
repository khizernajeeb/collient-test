import React from 'react'
import 'antd/dist/antd.css'
import { Row, Col, Typography, Checkbox, Divider } from 'antd'

const { Title } = Typography
const CheckboxGroup = Checkbox.Group

function onChange(checkedValues) {
  console.log('checked = ', checkedValues)
}

let foo = [{ wicketFell: 'on' }, { selectedWicketMethod: 'b' }]
const wicketCheckboxes = [
  {
    label: 'Any wicket',
    value: 'any',
  },
  {
    label: 'Bowled',
    value: 'bowled',
  },
  // {
  //   key: 2,
  //   label: 'Any wicke',
  //   value: foo[1],
  //   foo: foo,
  // },
  // { key: 2, label: 'Bowled', value: { a: 'on' } },

  'caught',
  'LBW',
  'Stumped',
  'Run-out',
  'Hit-wicket',
]
const runsOnBatCheckboxes = [
  { label: '6 runs', value: '6runs' },
  { label: '5 runs', value: '5 runs' },
  { label: '4 runs', value: '4 runs' },
  { label: '3 runs', value: '3 runs' },
  { label: '2 runs', value: '2 runs' },
  { label: '1 runs', value: '1 runs' },
  { label: '0 runs', value: '0 runs' },
  { label: 'Wide', value: 'wide' },
  { label: 'No-ball', value: 'No-ball' },
]
const extrasCheckboxes = []

const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultcheckedOutcomes = []

class AddOutcomes extends React.Component {
  state = {
    checkedOutcomes: defaultcheckedOutcomes,
    checkAll: false,
  }

  onChange = (checkedOutcomes) => {
    this.setState({
      checkedOutcomes,

      // checkAll: checkedOutcomes.length === plainOptions.length,
    })
    console.log(this.state, checkedOutcomes)
  }

  render() {
    return (
      <div>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={this.props.checkedOutcomes}
          onChange={this.props.rowSelection}
        >
          <Row>
            <Title level={4}>Wicket</Title>

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
        {/* <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedOutcomes}
          onChange={this.onChange}
        />
        <Title level={4}>Wicket</Title>
        <Checkbox.Group
          //  rowSelection={this.props.rowSelection}
          options={wicketCheckboxes}
          onChange={this.props.rowSelection}
          value={this.props.checkedOutcomes}
        />
        <br />
        <br />
        <Title level={4}>Runs of the bat</Title>
        <Checkbox.Group
          options={runsOnBatCheckboxes}
          onChange={this.props.rowSelection}
          value={this.props.checkedOutcomes}
        />
        <br />
        <br />
        <Title level={4}>Extras</Title>
        <Checkbox.Group
          options={extrasCheckboxes}
          onChange={this.props.rowSelection}
          value={this.props.checkedOutcomes}
        /> */}
      </div>
    )
  }
}

export default AddOutcomes
