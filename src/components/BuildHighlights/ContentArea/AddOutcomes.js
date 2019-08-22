import React from 'react'
import 'antd/dist/antd.css'
import { Typography, Checkbox } from 'antd'

const { Title } = Typography

function onChange(checkedValues) {
  console.log('checked = ', checkedValues)
}

const wicketCheckboxes = [
  'Any wicket',
  'Bowled',
  'Caught',
  'LBW',
  'Stumped',
  'Run-out',
  'Hit-wicket',
]
const runsOnBatCheckboxes = [
  { label: '6 runs', value: '6 runs' },
  { label: '5 runs', value: '5 runs' },
  { label: '4 runs', value: '4 runs' },
  { label: '3 runs', value: '3 runs' },
  { label: '2 runs', value: '2 runs' },
  { label: '1 runs', value: '1 runs' },
  { label: '0 runs', value: '0 runs' },
]
const extrasCheckboxes = [
  { label: 'Wide', value: 'Wide' },
  { label: 'No-ball', value: 'No-ball' },
]

const AddOutcomes = () => (
  <div>
    <Title level={4}>Wicket</Title>
    <Checkbox.Group options={wicketCheckboxes} onChange={onChange} />
    <br />
    <br />
    <Title level={4}>Runs of the bat</Title>
    <Checkbox.Group options={runsOnBatCheckboxes} onChange={onChange} />
    <br />
    <br />
    <Title level={4}>Extras</Title>
    <Checkbox.Group options={extrasCheckboxes} onChange={onChange} />
  </div>
)

export default AddOutcomes
