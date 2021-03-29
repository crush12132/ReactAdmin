import React, { Component } from 'react';
import {Card,Button} from 'antd'
import ReactECharts from 'echarts-for-react';


//柱形图路由
export default class Bar extends Component {

    state = {
        stores:[5, 20, 36, 10, 10, 20],
        sales:[4, 25, 30, 20, 40, 10]
    }

    update = ()=>{
        this.setState(state=>({
            stores: state.stores.map(store=>store-1),
            sales: state.sales.reduce((pre,sale)=>{
                pre.push(sale+1)
                return pre
            },[])
        }))
    }

    getOption=(sales,stores)=>{
        return {
            title: {
                text: '柱形图一'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },
            {
                name: '库存',
                type: 'bar',
                data: stores
            }]
        }
    }


    render() {
      const {sales,stores} = this.state;  
      const title = (
          <span>柱形图一</span>
      )
        return (
            <div>
                <Card>
                    <Button 
                       type='primary'
                       onClick={this.update}
                       >
                        更新
                    </Button>
                </Card>
                <Card title={title}>
                     <ReactECharts option={this.getOption(sales,stores)} />
                </Card>
            </div>
        );
    }
}

