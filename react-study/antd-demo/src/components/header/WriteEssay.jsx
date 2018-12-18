import React, { Component } from 'react';
// css 与 login 组件的 css 差不多，直接用
import './login.css'

import { Form, Icon, Input, Checkbox, Modal, Button, DatePicker, Upload } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class NormalLoginForm extends React.Component {
    // 表单提交事件
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                var data = JSON.stringify(values)
                console.log('提交的数据为: ', values, '转成字符串后:', data, typeof (data));
                // fetch post essay
                fetch('http://localhost:8081/api/add/essays', {
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
                    {getFieldDecorator('title')(
                        <Input placeholder="文章标题" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('description')(
                        <Input placeholder="文章描述" />
                    )}
                </FormItem>
                
                <FormItem>
                    {getFieldDecorator('data')(
                        <DatePicker className="login-form-button" placeholder="选择日期" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('content')(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <Button type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >提交
                </Button>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class WriteEssay extends Component {
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
                <Button type="primary" icon="edit" id='top-r1' onClick={this.showModal}>
                    写文章
                </Button>
                <Modal
                    className="modal"
                    title="写文章"
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

export default WriteEssay;