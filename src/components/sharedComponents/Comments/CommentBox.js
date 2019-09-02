import React, { Component } from 'react'
import { Comment } from 'antd'
import moment from 'moment'
import CommentList from './CommentList'
import CommentChild from './CommentChild'

class CommentBox extends Component {
  state = {
    visible: false,
    comments: [],
    submitting: false,
    title: '',
    value: '',
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return
    }

    this.setState({
      submitting: true,
    })

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        title: '',
        comments: [
          {
            author: <p>{this.state.title}</p>,
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      })
    }, 1000)
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  handleReset = (e) => {
    alert('sdf')
    this.setState({
      title: '',
      value: '',
    })
  }

  onChange = (a, b, c) => {
    console.log(a, b, c)
  }

  render() {
    const { comments, submitting, value, title } = this.state
    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          content={
            <CommentChild
              onChange={this.handleChange}
              onChangeTitle={this.handleChangeTitle}
              onSubmit={this.handleSubmit}
              OnReset={this.handleReset}
              submitting={submitting}
              value={value}
              title={title}
            />
          }
        />
      </div>
      //   <div>
      //       <Comment
      //               content={
      //                 <CommentBox
      //                   onChange={this.handleChange}
      //                   onChangeTitle={this.handleChangeTitle}
      //                   onSubmit={this.handleSubmit}
      //                   OnReset={this.handleReset}
      //                   submitting={submitting}
      //                   value={value}
      //                   title={title}
      //                 />
      //               }
      //             />
      //     <Form.Item>
      //       <Input
      //         onChange={this.handleChangeTitle}
      //         value={title}
      //         placeholder='Enter name'
      //       />
      //       <TextArea
      //         rows={4}
      //         onChange={this.handleChange}
      //         value={value}
      //         placeholder='Comment'
      //       />
      //     </Form.Item>
      //     <Form.Item>
      //       <Button
      //         htmlType='submit'
      //         loading={submitting}
      //         onClick={this.handleSubmit}
      //         type='primary'
      //       >
      //         Add Comment
      //       </Button>
      //       <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
      //         Cancel
      //       </Button>
      //     </Form.Item>
      //   </div>
    )
  }
}

export default CommentBox
