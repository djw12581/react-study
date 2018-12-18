import React, { Component } from 'react';
import './header_top.css'

import { Input, Button, Avatar } from 'antd';
import logo from '../../static/img/icon.png'
import Login from './Login';
import WriteEssay from './WriteEssay'
const Search = Input.Search;
class Header extends Component {

  changeSearch = () => {
    console.log('aaaa')
    
  }
  focus() {
    this.textInput.focus();
  }
  render() {
    return (

      <div className="top">

        <ul>
          <li className="float-left">
            <Avatar src={logo} shape="square" size='large' className='' />
          </li>
          <li className="float-left">
            <a href='/'>首页</a>
          </li>
          <li className="float-left">
            <a href='/'>下载app</a>
          </li>
          <li className="float-left">
            <Search
              placeholder="搜索"
              // style={{ width: 200 }}
              onSearch={value => console.log(value)}
              id='search'
            />
          </li>
          <li className="float-right">
            {/* <Button type="primary" icon="edit" id='top-r1'>写文章</Button> */}
            <WriteEssay />
          </li>
          <li className="float-right">
            <Button id='top-r2' onClick={
              () => {
                // 发送 fetch 请求
                fetch('http://localhost:8081/d', {
                  method: 'GET',
                  mode: "cors",
                  headers: new Headers({
                    'Content-Type': 'application/json' // 指定提交方式为表单提交
                  }),

                }).then(res => {
                  return res.text()
                }).then(res => {
                  console.log('ok', res)
                })
              }
            }>注册</Button>
          </li>
          <li className="float-right">
            <Login />
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;