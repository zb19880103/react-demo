import React, {Component} from 'react';
import EchartsList from '../../common/echartsList'
import Pagina from '../../common/Pagination'
import EllipsisTooltip from '../../common/EllipsisTooltip'
import { Table, Row, Col } from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EchartD1:{
        items: [],
        color: [],
        name:'',
        echartsData: '',
      },
      EchartD2:{
        items: [],
        color: [],
        name:'',
        echartsData: '',
      },
      financingAmountPagination:[],
      financingAmountPagination1:[],
      paginationData: {
        total: 0,
        pageSizeOptions: ['5', '10', '20', '30'],
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
      paginationData1: {
        total: 0,
        pageSizeOptions: ['10', '20', '30', '40'],
        url: '/attract/investment/financing_amount/list',
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        showQuickJumper: true,  //是否可以快速跳转至某页
        showSizeChanger: true,  //是否可以改变 pageSize
        showTotal: true,        //用于显示数据总量和当前数据顺序
        method: 'post'
      },
      loading1 : true,
      loading2 : true,
    };
    this.columns = [{
      dataIndex: 'ranking',
      title: '排名',
      width: 80,
    },{
      dataIndex: 'projectName',
      title: '项目名称',
      width: 200,
      onCell: () => ({
        style: {
          maxWidth: 200,
        }
      }),
      render: (text)=> (<EllipsisTooltip title={text}><a href="http://www.baidu.com">{text}</a></EllipsisTooltip>)
    }, {
      dataIndex: 'companyName',
      title: '公司名称',
      width: 200,
      onCell: () => ({
        style: {
          maxWidth: 200,
        }
      }),
      render: (text)=> (<EllipsisTooltip title={text}><a href="http://www.baidu.com">{text}</a></EllipsisTooltip>)
    }, {
      dataIndex: 'trade',
      title: '行业',
      width: 150,
      onCell: () => ({
        style: {
          maxWidth: 100,
        }
      }),
      render: (text)=> (<EllipsisTooltip title={text}>{text}</EllipsisTooltip>)
    }, {
      dataIndex: 'financingTime',
      title: '融资时间',
      width: 200,
    }, {
      dataIndex: 'realityFinancingtMoney',
      title: '融资金额',
      width: 200,
    }, {
      dataIndex: 'financingtRount',
      title: '融资轮次',
      width: 200,
    }, {
      dataIndex: 'financingOrganization',
      title: '融资机构',
      width: 200,
      onCell: () => ({
        style: {
          maxWidth: 200,
        }
      }),
      render: (text)=> (<EllipsisTooltip title={text}>{text}</EllipsisTooltip>)
    }];
  }
  /**
   * 招商推荐等级分布
   */
  async getZstjRankDis () {
    const res = await this.post('attract/investment/recommend_level/distribution',{});
      if(res.data && res.data.code === 0){
        let items = [];
        let dataItems = res.data.data;
        dataItems.forEach((item, index) => {
          items.push(item.name);
        });
        let EchartD1 = {};
        EchartD1.items = items;
        EchartD1.color = ['#9DE0FC', '#59D4FA', '#05BFF8', '#08A8E0', '#03B2EE'];
        EchartD1.name = '招商推荐等级分布';
        EchartD1.echartsData = dataItems;
        this.setState({
          EchartD1: EchartD1
        })
      }else{
        global.commonInfo.error('加载招商推荐等级分布数据失败');
      };
  }
  async getFinancingTradeDis() {
    const res = await this.post('attract/investment/financing_trade/distribution',{});
    if(res.data && res.data.code === 0){
      let items = [];
      let dataItems = res.data.data;
      dataItems.forEach((item, index) => {
        items.push(item.name);
      });
      let EchartD2 = {};
      EchartD2.items = items;
      EchartD2.color = ['#FFE153', '#F2BB28', '#40D6BA', '#4BA5FB', '#FF539B'];
      EchartD2.name = '行业分布';
      EchartD2.echartsData = dataItems;
      this.setState({
        EchartD2: EchartD2
      })
    }else{
      global.commonInfo.error('加载本月获融资的企业行业分布数据失败');
    };
  }
  /**
   * 融资排行榜
   */
  async listFinancingAmountRank () {
    let params = {
      pageSize: this.state.paginationData.params.pageSize,
      pageNum: this.state.paginationData.params.pageNum

    }
    const res = await this.post(this.state.paginationData.url,params,{type: "json"});
    if(res.data && res.data.code === 0){
      let data = res.data.data;
      let newpaginationData = Object.assign({}, this.state.paginationData, { total: data.total,params: {pageNum: data.pageNum, pageSize: data.pageSize,} })
      this.setState({
        financingAmountPagination: data.listData,
        paginationData: newpaginationData,
        loading1: false
      })
    }else{
      global.commonInfo.error('获取融资金额排行榜数据失败');
    };
  }
  async listFinancingAmountRank1 () {
    let params = {
      pageSize: this.state.paginationData1.params.pageSize,
      pageNum: this.state.paginationData1.params.pageNum

    }
    const res = await this.post(this.state.paginationData1.url,params,{type: "json"});
    if(res.data && res.data.code === 0){
      let data = res.data.data;
      let newpaginationData = Object.assign({}, this.state.paginationData1, { total: data.total,params: {pageNum: data.pageNum, pageSize: data.pageSize,} })
      this.setState({
        financingAmountPagination1: data.listData,
        paginationData1: newpaginationData,
        loading2: false
      })
    }else{
      global.commonInfo.error('获取融资金额排行榜2数据失败');
    };
  }
  handleSubmitPagination1 = (comment) =>{
    let tableData = comment.result;
    let newPagination = comment.newPagination;
    let newpaginationData = Object.assign({}, this.state.paginationData, { total: newPagination.total,params: {pageNum: newPagination.params.pageNum, pageSize: newPagination.params.pageSize,} })
    this.setState({
      financingAmountPagination: tableData,
      paginationData: newpaginationData,
      loading1: false
    })
  }
  handleOpenLoading1(){
    this.setState({
      loading1: true
    })
  }
  handleOpenLoading2(){
    this.setState({
      loading2: true
    })
  }
  handleSubmitPagination2 = (comment) =>{
    let tableData = comment.result;
    let newPagination = comment.newPagination;
    let newpaginationData = Object.assign({}, this.state.paginationData, { total: newPagination.total,params: {pageNum: newPagination.params.pageNum, pageSize: newPagination.params.pageSize,} })
    this.setState({
      financingAmountPagination1: tableData,
      paginationData1: newpaginationData,
      loading2: false
    })
  }
  componentDidMount(){
    this.getZstjRankDis();
    this.listFinancingAmountRank();
    this.listFinancingAmountRank1();
    this.getFinancingTradeDis();
    // 监听路由变化
    // this.props.history.listen(route => {
    //   console.log(route);
    // })
  }
  render() {
    return (
      <div>
        <Row gutter={16} style={{marginBottom:'30px'}}>
          <Col span={12}><EchartsList data={this.state.EchartD1}></EchartsList></Col>
          <Col span={12}><EchartsList data={this.state.EchartD2}></EchartsList></Col>
        </Row>
        {/*<Table columns={this.columns} rowKey="ranking" bordered={true} pagination={ false } loading={this.state.loading} dataSource={this.state.financingAmountPagination} />*/}
        <Table columns={this.columns} rowKey="ranking" bordered={true} pagination={ false } loading={{spinning: this.state.loading1,tip: '努力加载中...'}} dataSource={this.state.financingAmountPagination} />
        <Pagina pagination={this.state.paginationData} handleOpenLoading={this.handleOpenLoading1.bind(this)} handleSubmitPagination={this.handleSubmitPagination1}/>

        <Table columns={this.columns} rowKey="ranking" bordered={true} pagination={ false } loading={this.state.loading2} dataSource={this.state.financingAmountPagination1} />
        <Pagina pagination={this.state.paginationData1} handleOpenLoading={this.handleOpenLoading2.bind(this)} handleSubmitPagination={this.handleSubmitPagination2}/>
      </div>
    )
  }
}

export default Index;
