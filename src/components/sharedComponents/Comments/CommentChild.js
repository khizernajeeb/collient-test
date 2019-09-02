import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'
const { TextArea } = Input

class CommentChild extends Component {
  render() {
    const {
      OnReset,
      onChange,
      onChangeTitle,
      onSubmit,
      submitting,
      value,
      title,
    } = this.props
    return (
      <div>
        <Form.Item>
          <Input
            onChange={onChangeTitle}
            value={title}
            placeholder='Enter name'
          />
          <TextArea
            rows={4}
            onChange={onChange}
            value={value}
            placeholder='Comment'
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            loading={submitting}
            onClick={onSubmit}
            type='primary'
          >
            Add Comment
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={OnReset}>
            Cancel
          </Button>
        </Form.Item>
      </div>
    )
  }
}

export default CommentChild
