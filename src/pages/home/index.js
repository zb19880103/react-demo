import React, {Component} from 'react';
import Main from './main'
import Siderl from './Sider'
import Top from './header'
import './index.scss'
import {Layout} from 'antd';
const { Footer } = Layout;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentWillMount(){
    if (!localStorage.getItem('X-AUTH-TOKEN')) {
      global.commonInfo.warning(
        '你还没有登录哦，请先登录！', 1.5,
        onClose => {
          this.props.history.push('/login');
        })
    }
  }
  render() {
    return (
      <div>
        <Layout className="containAll">
          <Siderl collapsed={this.state.collapsed} />
          <Layout>
            <Top toggle={this.toggle} collapsed={this.state.collapsed}/>
            <Main />
            <Footer>©Copyright 2015-20 联通高新大数据DDS平台</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Home;
