import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/login/index';
import Index from './pages/home/index';
import NoMatch from "./pages/404";
//BrowserRouter 是一个容器（对象）   用来存放route link
//Router 是一个容器  ，包裹Route
//Route 显示视图 三大 props
//location  路由的位置信息  location.hash     location.pathname
//history  history.go()   history.push()
//match 匹配路径参数

//Link  链接  跳转
//Redirect  重定向

class Routes extends Component{
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/index" component={Index}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
      </div>

    )
  }
}
export default Routes;
