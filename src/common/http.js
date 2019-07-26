import axios from "axios";
import qs from "qs";
import { Component } from 'react';
import MProgress from './spin';
// import { createHashHistory } from 'history'; // hash路由
// 或者
// import { createBrowserHistory } from 'history'; // history路由

const TIMEOUT = 10000;
// const history = createHashHistory();

let baseUrl = '/api/web/';

// 请求前拦截
axios.interceptors.request.use(
  config => {
    MProgress.start();
    return config;
  },
  err => {
    MProgress.done();
    console.log("请求超时");
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    MProgress.done();
    if (data.data.code === 2001 || data.data.code === 2002) {
      setTimeout( ()=>{
        global.commonInfo.warning(
          '登录信息已过期，请重新登录！', 1.5,
          onClose => {
            window.localStorage.removeItem('X-AUTH-TOKEN');
            // history.push('/login') //两种方式都可
            window.location.href = '/login'
          })
      },1500)

    }
    return data;
  },
  err => {
    MProgress.done();
    if (err.response.status === 504 || err.response.status === 404) {
      console.log("服务器被吃了⊙﹏⊙∥");
      global.commonInfo.commonInfo.warning('服务器被吃了⊙﹏⊙∥')
    } else if (err.response.status === 401) {
      console.log("登录信息失效⊙﹏⊙∥");
      global.commonInfo.warning('登录信息失效⊙﹏⊙∥')
    } else if (err.response.status === 500) {
      console.log("服务器开小差了⊙﹏⊙∥");
      global.commonInfo.warning('服务器开小差了⊙﹏⊙∥')
    }
    return Promise.reject(err);
  }
);

function dataFormat(types) {
  let dataFormat = "";
  if (!types) {
    dataFormat = "application/x-www-form-urlencoded; charset=UTF-8";
  } else if(types.type === 'json') {
    dataFormat = "application/" + types.type + "; charset=UTF-8";
  } else if(types.type === 'form-data') {
    dataFormat = "multipart/" + types.type;
  }
  return dataFormat;
}

// @post请求
const post = (url, params, types) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    data: !types ? qs.stringify(params) : params,
    timeout: TIMEOUT,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": dataFormat(types),
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};

// @RequsetParam请求
const postRequestParam = (url, params, types) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    data: params,
    timeout: TIMEOUT,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": dataFormat(types),
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};

const get = (url, params) => {
  return axios({
    method: "get",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    params, // get 请求时带的参数
    timeout: TIMEOUT,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.post = post;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;
