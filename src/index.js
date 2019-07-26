import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './routes'
import axios from "axios";
import './common/common-info'
import "./common/http";
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';

Component.prototype.$http = axios;

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Routes />
  </LocaleProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
