import React, { Component } from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import './recommend.css'
const data = [
    {
        title: '作者 1',
    },
    {
        title: '作者 2',
    },
    {
        title: '作者 3',
    },
    {
        title: '作者 4',
    },
];

class IconText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            text: this.props.text,
            cssColor: this.props.cssColor,
            lock: 'false',
            color: ''
        }
    }
    handleToggleIcontext() {
        if (this.state.lock === 'false') {
            console.log('start')
            this.setState({
                lock: 'true',
                color: this.state.cssColor,
                text: '已关注',
                type: 'minus',
            })   
        } else {
            this.setState({
                lock: 'false',
                color: '',
                text: '关注',
                type: 'plus',
            })  
        }
    }
    render() {
        return (
            <div>
                <span style={{ color: this.state.color }} onClick={this.handleToggleIcontext.bind(this)} >
                    <Icon type={this.state.type} style={{ marginRight: 4 }} />
                    {this.state.text}
                </span>

            </div>
        )
    }
}

class IconToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            spin: this.props.spin,
        }
    }
    handleRun() {
        this.setState({
            spin: 'true'
        })
        setTimeout(() => {
            console.log('s')
            this.setState({
                spin: ''
            })
        }, 1000)
    }
    render() {
        return (
            <div className='float-right' style={{ marginRight: 8 }} onClick={this.handleRun.bind(this)}>
                <Icon type={this.state.type} spin={this.state.spin} style={{ marginRight: 4 }} />换一批
            </div>
        )
    }
}

class Recommend extends Component {

    render() {

        return (
            <List
                header={
                    <div>
                        推荐作者
                        <IconToggle type="sync" spin="" />

                    </div>
                }
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<IconText type="plus" text="关注" cssColor="green" />]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="/">{item.title}</a>}
                            description="描述"
                        />
                    </List.Item>
                )}
                footer={<div><Button className='footer-btn'>查看更多</Button></div>}
            />
        );
    }
}

export default Recommend;