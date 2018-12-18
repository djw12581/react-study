import React, { Component } from 'react';
import { List, Icon } from 'antd';
import './containers.css'

class IconComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props._id,
            type: this.props.type,
            text: this.props.text,
            cssColor: this.props.cssColor,
            lock: this.props.lock,
            color: ''
        }
    }
    handleToggleIcontext() {
        console.log('点击时的 state', this.state)
        if (this.state.lock === false) {
            console.log('start')
            this.setState({
                lock: true,
                color: this.state.lock ? '' : this.state.cssColor,
                text: this.state.text - 0 + 1,
            })
        } else {
            this.setState({
                lock: false,
                color: this.state.lock ? '' : this.state.cssColor,
                text: this.state.text - 0 - 1,
            })
        }
    }
    handleSaveChange() {
        // fetch post icon* 
        var data = this.state
        var d = JSON.stringify(data)
        console.log('state', d)
        fetch('http://localhost:8081/api/update/essays/iconText', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'aplication/json',
                'Content-Type': 'application/json'
            },
            body: d
        }).then(res => {
            return res.text()
        }).then(res => {
            console.log('add essays')
        })
    }
    async handleChange() {
        await this.handleToggleIcontext()
        this.handleSaveChange()
    }
    componentWillMount() {
        console.log('加载时的 state', this.state)
        this.setState({
            color: this.state.lock ? this.state.cssColor : '' 
        })
    }

    render() {
        return (
            <div>
                <span 
                    style={{ color: this.state.color }}
                    onClick={this.handleChange.bind(this)} 
                   
                >
                    <Icon type={this.state.type} style={{ marginRight: 4 }} />
                    {this.state.text}
                </span>

            </div>
        )
    }
}

class IconCommit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            text: this.props.text
        }
    }
    handleShowCommits() {
        // show commits
        console.log('show commits')
    }
    render() {
        return (
            <div>
                <span style={{ color: this.state.color }} onClick={this.handleShowCommits.bind(this)} >
                    <Icon type={this.state.type} style={{ marginRight: 4 }} />
                    {this.state.text}
                </span>

            </div>
        )
    }
}

class Containers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: []
        }
    }

    componentWillMount() {

        fetch('http://localhost:8081/api/show/essays', {
            method: 'GET',
            mode: "cors",
            headers: {
                'Accept': 'aplication/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.text()
        }).then(res => {
            var s = JSON.parse(res)
            this.setState({
                content: s
            })
            console.log('get essays', this.state.content)
        })
    }

    render() {
        return (
            <div className="">
                <List className='page'
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                        showQuickJumper: 'true',
                    }}

                    dataSource={this.state.content}
                    footer={<div>底部文字</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconComponent
                                    type="star-o"
                                    text={item.iconSave||'0'}
                                    cssColor='#f60'
                                    lock={item.iconSaveLock}
                                    _id={item._id}
                                />,
                                <IconComponent
                                    type="like-o"
                                    text={item.iconClick||'0'}
                                    cssColor='blue'
                                    lock={item.iconClickLock}
                                    _id={item._id}
                                />,
                                <IconCommit type="message" text={item.iconCommit||'0'} />]}
                            extra={<img width={272} height={150} alt="logo" src={item.imgSrcRight} />}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Containers;