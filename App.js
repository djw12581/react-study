import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom'
import Reducer from './reduce/index'
import Test from './test';
export default class extends React.PureComponent {
    render() {
        return (
            <Router />
        )
    }
}
// react hook 实现

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <ul>
                        <li><Link to='/'>//</Link></li>
                        <li><Link to='/a'>aaaaa</Link></li>
                        <li><Link to='/home'>home</Link></li>
                    </ul>
                </header>
                <main>
                    <Switch>
                        <Route exact path='/' component={A} />
                        <Route path='/a' component={B} />
                        <Route path='/home' component={Home} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )
}

const A = (props) => {
    const [state, dispatch] = useReducer(Reducer.reducer, Reducer.initialState);
    const alertShow = {
        display: state.show ? "block" : "none"
    }
    return (
        <div>
            {
                <form >
                    <fieldset>
                        <legend>嘟嘟嘟</legend>
                        <label htmlFor="userName">账号：</label>
                        <input type="text" id="userName" onChange={(event) => dispatch({
                            type: "ChangeInput",
                            payload: event.target.value
                        })} />
                        <br />
                        <label htmlFor="userPassword" >密码：</label>
                        <input type="password" id="userPassword" onChange={(event) => dispatch({
                            type: "ChangePwd",
                            payload: event.target.value
                        })} />
                        <br />
                        <input type="button" onClick={() => {
                            const { username, password, account, pwd, show } = state
                            console.log(username, password, account, pwd)
                            // 登陆成功跳转主页面
                            if ((username === account) && (password === pwd[1])) {
                                console.log('ok')
                                // 验证成功跳转
                                props.history.push("/home");
                            } else if ((username === account) && (password === pwd[0])) {
                                console.log('不允许使用初始密码登陆，是否立即修改密码')
                                // 弹窗提示组件显示
                                dispatch({
                                    type: "ChangeShow",
                                    payload: !show
                                })
                                // console.log('asdf码', dispatch({}))
                            } else {
                                console.log('错误的账号或密码')
                            }
                        }
                        } value="登陆" />
                    </fieldset>
                </form>

            }
            <div style={alertShow}>
                <p>不允许使用初始密码登陆，是否立即修改密码</p>
                <button onClick={() => {
                    props.history.push("/a");
                }}>确定</button>
                <button onClick={() => {
                    dispatch({
                        type: "ChangeShow",
                        payload: !state.show
                    })
                }}> 取消</button>
            </div>
            {/* <Alert d={alertShow}></Alert> */}
            {/* <B data={}></B> */}
        </div>
    )
}

const B = (props) => {
    return(
<div>{props.data}</div>
    )
    
}
const Home = () => <div>{"路由home"}</div>

// 弹窗子组件
// const Alert = (props) => {
//     const [state, dispatch] = useReducer(Reducer.reducer, Reducer.initialState);
    
//     // const alertShow = {
//     //     display: state.show ? "block" : "none"
//     // }
//     console.log('a', state,props)
//     return (
//         <div>
//             {
//                 <div style={props.d}>
//                 <p>不允许使用初始密码登陆，是否立即修改密码</p>
//                 <button onClick={(props) => {
//                     props.history.push("/a");
//                 }}>确定</button>
//                 <button onClick={() => {
//                     dispatch({
//                         type: "ChangeShow",
//                         payload: !state.show
//                     })
//                 }}> 取消</button>
//             </div>
//             }
//         </div>
//     )
// }






// const Login = withRouter(class extends React.PureComponent {
//     state = {
//         userName: '',
//         pwd: '',
//         check: '',
//         checkName: 'admin',
//         checkPwd: ['123456', 'eisoo']
//     }

//     render() {
//         return (
//             <div>
//                 {
//                     <form >
//                         <label htmlFor="userName">账号：</label>
//                         <input type="text" id="userName" onChange={this.handleChangeUserName} /><br />
//                         <label htmlFor="userPassword" >密码：</label>
//                         <input type="password" id="userPassword" onChange={this.handleChangeUserPwd} /><br />
//                         <label htmlFor="userPassword2">确认密码：</label>
//                         <input type="password" id="userPassword2" onChange={this.handleChangeUserCheck} /><br />
//                         <input type="button" onClick={this.handleClick} value="login" />
//                         {/* <button onClick={this.handleClick}>login</button> */}
//                     </form>
//                 }
//             </div>
//         )
//     }

//     handleChangeUserName = (event) => {
//         const d = event.target.value
//         this.setState({
//             userName: d
//         }, () => console.log(this.state))
//         console.log('log userName', event.target.value)
//     }
//     handleChangeUserPwd = (event) => {
//         const d = event.target.value
//         this.setState({
//             pwd: d
//         }, () => console.log(this.state))
//         console.log('log pwd', event.target.value)
//     }
//     handleChangeCheck = (event) => {
//         const d = event.target.value
//         this.setState({
//             check: d
//         }, () => console.log(this.state))
//         console.log('log pwd', event.target.value)
//     }
//     handleClick = () => {
//         // 登陆成功跳转新页面
//         const { userName, pwd, check, checkName, checkPwd } = this.state
//         if ((userName === checkName) && (pwd === checkPwd[1])) {
//             console.log('ok')
//             // 验证成功跳转
//             this.props.history.push("/home");
//         } else if ((userName === checkName) && (pwd === checkPwd[0])) {
//             console.log('不允许使用初始密码登陆，是否立即修改密码')
//         } else {
//             console.log('错误的账号或密码')
//         }
//         console.log('log', this.context.router)
//     }

// })

// const Home = withRouter(class extends React.PureComponent {
//     state = {

//     }

//     render() {
//         return (
//             <div>
//                 {
//                     // 顶栏＋一级导航 tabs ，tab包含 个人信息 和 系统信息
//                 }
//             </div>
//         )
//     }

//     handleChange = (event) => {
//         // const d = event.target.value
//         // this.setState({
//         //     userName: d
//         // }, () => console.log(this.state))
//         // console.log('log userName', event.target.value)
//     }

// })

// // react hook

// const A = withRouter(() => {
//     const { state, changeState } = useState({
//         userName: '',
//         pwd: '',
//         check: '',
//         checkName: 'admin',
//         checkPwd: ['123456', 'eisoo']
//     })
//     return (
//         <div>
//             {
//                 <form >
//                     <label htmlFor="userName">账号：</label>
//                     <input type="text" id="userName" onChange={this.handleChangeUserName} /><br />
//                     <label htmlFor="userPassword" >密码：</label>
//                     <input type="password" id="userPassword" onChange={this.handleChangeUserPwd} /><br />
//                     <label htmlFor="userPassword2">确认密码：</label>
//                     <input type="password" id="userPassword2" onChange={this.handleChangeUserCheck} /><br />
//                     <input type="button" onClick={this.handleClick} value="login" />
//                 </form>
//             }
//         </div>
//     )

//     const handleChangeUserName = (event) => {
//         const d = event.target.value
//         // 获取表单值更新到 state 中
//         changeState({
//             userName: d
//         })
//         // this.setState({
//         //     userName: d
//         // }, () => console.log(this.state))
//         // console.log('log userName', event.target.value)
//     }
//     handleChangeUserPwd = (event) => {
//         const d = event.target.value
//         changeState({
//             pwd: d
//         })
//         // this.setState({
//         //     pwd: d
//         // }, () => console.log(this.state))
//         // console.log('log pwd', event.target.value)
//     }
//     handleChangeCheck = (event) => {
//         const d = event.target.value
//         changeState({
//             check: d
//         })
//         // this.changeState({
//         //     check: d
//         // }, () => console.log(this.state))
//         // console.log('log pwd', event.target.value)
//     }
//     handleClick = () => {
//         // 登陆成功跳转新页面
//         const { userName, pwd, check, checkName, checkPwd } = this.state
//         if ((userName === checkName) && (pwd === checkPwd[1])) {
//             console.log('ok')
//             // 验证成功跳转
//             this.props.history.push("/home");
//         } else if ((userName === checkName) && (pwd === checkPwd[0])) {
//             console.log('不允许使用初始密码登陆，是否立即修改密码')
//         } else {
//             console.log('错误的账号或密码')
//         }
//         console.log('log', this.context.router)
//     }
// })


