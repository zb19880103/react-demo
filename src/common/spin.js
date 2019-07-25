import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
// let defaultState = {show: false}

class Progress extends Component {
  constructor(props, context){
    super(props, context)
    // this.state = {...defaultState}
    this.state = {
      show: false
    }
  }
  start(){ // 开始显示
    this.setState({
      show: true
    })
  }
  done(){ // 结束隐藏
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div style={this.state.show? {display:'block'}:{display:'none'}}>
        <div className="spinMo">
          <Spin tip="努力加载中..." size="large"></Spin>
        </div>
      </div>
    )
  }
}
// 创建元素追加到body
let div = document.createElement('div');
document.body.appendChild(div);
let SpinTip = ReactDOM.render(React.createElement(
  Progress,
),div);
export default SpinTip;
