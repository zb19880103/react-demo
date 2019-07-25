import React, {Component} from 'react';
import { Result, Button } from 'antd';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack(){
    this.props.history.push('/index');
  }
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={this.goBack.bind(this)}>返回首页</Button>}
      />
    )
  }
}

export default NotFound;
