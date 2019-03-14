import "bootstrap-webpack!../js/bootstrap.config.js";

import "../less/head.less";
import "../less/usercenter.less";
import "../less/invest-cell.less";
import "../less/footerSmall.less";

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import userCenter from "../reducers/usercenter.js"
import { browserHistory, Router, Route } from 'react-router'
import UserCenterPage from "../containers/UserCenterPage.jsx"
import StatusContainer from "../containers/user-status.jsx"
import MyAccountPage from "../containers/myaccount.jsx"

import { LocaleProvider, DatePicker, message, Alert } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(userCenter);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={UserCenterPage}>
        <Route path="/status" component={StatusContainer}>
          <Route path="/myaccount" component={MyAccountPage} />
        </Route>
        {/* <Route path="/safe" component={SafeCenterPage} /> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

moment.locale('zh-cn');

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      date: null
    };
  }
  
  handleChange(date) {
    message.info(`您选择的日期是：${date.format('YYYY-MM-DD')}`);
    this.setState({date});
  }

  render() {
    const { date } = this.state;
    return (
      <LocaleProvider locale={zhCN}>
        <div style={{marginTop: 20}}>
        <DatePicker onChange={ev => this.handleChange(ev)} />
        <div style={{marginTop: 20}}>
          <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
        </div>
        </div>
      </LocaleProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));