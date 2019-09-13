import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class CommentChild extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit();
        this.props.form.resetFields();

        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { onChange, onChangeTitle, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please enter your name' }],
            })(<Input onChange={onChangeTitle} placeholder='Enter name' />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: 'Please enter comment' }],
            })(<TextArea rows={4} onChange={onChange} placeholder='Comment' />)}
          </FormItem>
          <FormItem>
            <Button htmlType='submit' loading={submitting} type='primary'>
              Add Comment
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(CommentChild);
