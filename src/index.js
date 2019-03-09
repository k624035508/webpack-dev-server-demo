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
