import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class EchartsList extends Component {
  render() {
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        selectedMode: true,  //图例选择的模式，控制是否可以点击 默认true
        show: true,   //图例选择的模式，控制是否显示 默认true
        orient: 'vertical',
        x: 'right',
        top: 0,
        left: '60%',
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 30,
        width: '26%',
        // data: this.props.data.items,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        formatter: name => {
          let percent = this.props.data.echartsData.filter(item => {
            return item.name === name;
          })[0].percentage;
          return name + ' (' + percent + ')';
        }
      },
      color: this.props.data.color,
      series: [
        {
          name: this.props.data.name,
          type: 'pie',
          radius: ['30%', '90%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'inner',
              formatter: (params) => {
                return params.data.percentage + '%';
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.props.data.echartsData
        }
      ]
    };
    return (
      <ReactEcharts
        option={option}
        style={{width: '100%',height:'210px'}}
      />
    );
  }
}

export default EchartsList;
