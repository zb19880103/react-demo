import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import './index.scss'
import Index from '../index/index'
import Music from '../music/index'
import Tool from '../tool/index'
import Demo from '../demo/index'
import NoMatch from '../404/index'
const { Content } = Layout;


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content
        style={{
          margin: '24px 0 24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/index" component={Index}></Route>
          <Route exact path="/index/music" component={Music}></Route>
          <Route exact path="/index/tool" component={Tool}></Route>
          <Route exact path="/index/demo" component={Demo}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </Content>
    )
  }
}

export default Main;
