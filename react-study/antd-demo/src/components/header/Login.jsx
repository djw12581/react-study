import React, { Component } from 'react';
import './login.css'

import { Form, Icon, Input, Checkbox, Modal, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  // 表单提交事件
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var data = JSON.stringify(values)
        console.log('提交的数据为: ', values,'data:', data, typeof(data));
        // fetch post
        fetch('http://localhost:8081/api/add/user', {
          method: 'POST',
          mode: "cors",
          headers: {
            'Accept': 'aplication/json', 
            'Content-Type': 'application/json'
          },
          body: data,
        }).then(res => {
          return res.text()
        }).then(res => {
          console.log('登录提交 ok ')
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="/">忘记密码</a>
          <Button type="primary"
            htmlType="submit"
            className="login-form-button"
          >

            登录
          </Button>
          <a href="/">现在注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div className="">
        <Button type="primary" onClick={this.showModal}>
          登录
        </Button>
        <Modal
          className="modal"
          title="登录"
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <WrappedNormalLoginForm />
        </Modal>
      </div>
    )
  }
}

export default Login;