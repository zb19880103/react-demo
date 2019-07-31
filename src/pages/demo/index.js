import React, {Component} from 'react';
import Pagina from '../../common/Pagination';
import { Button } from 'antd';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationData: {
        total: 50,
        pageSizeOptions: ['10', '20', '30', '40'],
        url: '/attract/investment/financing_amount/list',
        params: {
          pageNum: 1,
          pageSize: 5,
        },
        showQuickJumper: true,  //是否可以快速跳转至某页
        showSizeChanger: true,  //是否可以改变 pageSize
        showTotal: true,        //用于显示数据总量和当前数据顺序
        method: 'post'
      },
      loading: true
    };
  }
  handleOpenLoading(){
    this.setState({
      loading: true
    })
  }
  handleSubmitPagination = (comment) =>{
    console.log(comment)
  }
  successTip(){
    global.commonInfo.success('这是成功提示！');
  }
  errorTip(){
    global.commonInfo.error('这是错误提示！');
  }
  warningTip(){
    global.commonInfo.warning('这是警告提示！');
  }
  infoTip(){
    global.commonInfo.info('这是普通信息提示！');
  }
  render() {
    return (
      <div>
        <div className="content-box">
          <div className="content-box-title">提示按钮</div>
          <div className="content-box-body">
            <Button type="primary" className="success-btn" onClick={this.successTip.bind(this)}>成功</Button>
            <Button type="primary" className="error-btn" onClick={this.errorTip.bind(this)}>失败</Button>
            <Button type="primary" className="warning-btn" onClick={this.warningTip.bind(this)}>警告</Button>
            <Button type="primary" className="info-btn" onClick={this.infoTip.bind(this)}>info</Button>
          </div>
        </div>

        <div className="content-box" style={{marginTop: '20px'}}>
          <div className="content-box-title">分页</div>
          <div className="content-box-body">
            <Pagina pagination={this.state.paginationData} handleOpenLoading={this.handleOpenLoading.bind(this)} handleSubmitPagination={this.handleSubmitPagination}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Demo;
