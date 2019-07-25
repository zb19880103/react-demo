### `npm start`
开始运行

### `npm test`
开始测试

### `npm run build`
打包项目

本框架使用antd UI框架，封装了axios请求，分页，提示信息，路由配置，404页面，登录，是否登录判断等常用得组件

常用demo

# 发起请求
this.post 或者 this.get等

# 提示信息
this.commonInfo.success(msg, timer, callback);
this.commonInfo.error(msg, timer, callback);
this.commonInfo.warning(msg, timer, callback);
this.commonInfo.info(msg, timer, callback);

# 分页的使用

1.导入分页组件
2.state定义数据
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
3.  handleSubmitPagination = (comment) =>{   //回调方法
      console.log(comment) //可获取数据和分页页码等
    }
4.<Pagina pagination={this.state.paginationData} handleSubmitPagination={this.handleSubmitPagination}/>

# 路由的配置
    这里是随便写了几个组件，实现路由的跳转功能，登录也是随便写的，主要实现未登录跳转登录页，已登录跳转首页，以及路由不匹配跳转404页面等，当然http请求也有判断验证登录

# react-demo
    本人水平有限，初学react，摸索中，学渣级，考虑的也不全面，各位大神手下留情，勿喷，上传github只为做个备份，谢谢！
