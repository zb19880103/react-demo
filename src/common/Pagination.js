import React, {Component} from 'react';
import { Pagination } from 'antd';

class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: props.pagination,
      total: props.pagination.total,
      pageSize: props.pagination.params.pageSize,
      pageSizeOptions: props.pagination.pageSizeOptions,
      showQuickJumper: props.pagination.showQuickJumper,  //是否可以快速跳转至某页
      showSizeChanger: props.pagination.showSizeChanger,  //是否可以改变 pageSize
      showTotal: props.pagination.showTotal,        //用于显示数据总量和当前数据顺序
    };
  }
  /**
   * 接收props
   * @param 组件接收到props
   * @author 张斌
   */
  componentWillReceiveProps(nextProps,prevProps){
    this.setState({
      pagination:nextProps.pagination,
      total: nextProps.pagination.total,
      pageSizeOptions: nextProps.pagination.pageSizeOptions,
      pageSize: nextProps.pagination.params.pageSize,
      showQuickJumper: nextProps.pagination.showQuickJumper,  //是否可以快速跳转至某页
      showSizeChanger: nextProps.pagination.showSizeChanger,  //是否可以改变 pageSize
      showTotal: nextProps.pagination.showTotal,        //用于显示数据总量和当前数据顺序
    })
  }
  /**
   * 页码跳转
   * @param pageSize 变化的回调
   * @author 张斌
   */
  onShowSizeChange(current, pageSize) {
    let pagination = this.state.pagination;
    let params = pagination.params;
    params.pageNum = current;
    params.pageSize = pageSize;
    let config = {
      url: pagination.url,
      method: pagination.method || 'post'
    };
    if (config.method === 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    this.setState({
      pageSize: pageSize
    })
    this.paginationRequest(config, params);
  }
  /**
   * 页码跳转
   * @param 页码改变的回调
   * @author 张斌
   */
  onChange(current, pageSize) {
    let pagination = this.state.pagination;
    let params = pagination.params;
    params.pageNum = current;
    params.pageSize = this.state.pageSize;
    let config = {
      url: pagination.url,
      method: pagination.method || 'post'
    };
    if (config.method === 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    this.paginationRequest(config, params);
  }
  /**
   * 页码请求
   * @param 页码请求获取数据
   * @author 张斌
   */
  async paginationRequest(config, params) {
    this.props.handleOpenLoading();
    let res = '';
    if(config.method === 'post'){
      res = await this.post(config.url,config.data,{type: "json"});
    }else if(config.method === 'get'){
      res = await this.get(config.url,config.params,{type: "json"});
    }
    if(res.data && res.data.code === 0){
      let data = res.data.data;
      let result = data.listData;
      let newPagination = {
        total: data.total,
        params: params
      };
      this.props.handleSubmitPagination({result, newPagination});
    }else{
      global.commonInfo.error('获取分页数据失败');
    };
  }
  render() {
    return (
      <div>
        <Pagination
          showSizeChanger={this.state.showSizeChanger}
          showQuickJumper={this.state.showQuickJumper}
          showTotal={ this.state.showTotal ? total => `共 ${total} 条` : false}
          onChange = {this.onChange.bind(this)}
          onShowSizeChange = {this.onShowSizeChange.bind(this)}
          defaultCurrent= {1}
          total = {this.state.total}
          pageSizeOptions={this.state.pageSizeOptions}
          hideOnSinglePage={true}
          defaultPageSize={ parseInt(this.state.pageSizeOptions[0])}
        />
      </div>
    )
  }
}

export default Pagina;
