import React, {Component} from 'react';
import { Layout, Icon,Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const { Header } = Layout;

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  goBack(){

  }
  render() {
    return (
      <Header>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          style={{fontSize:'20px'}}
          onClick={this.props.toggle}

        />
        <Menu mode="horizontal" className="logOut">
          <SubMenu title={<span><Icon type="user" />{132523523}</span>} >
            <Menu.Item key="logOut"><span onClick={()=>this.goBack()}>退出</span></Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

export default Top;
