import React, { Component } from 'react';
import { Statistic,Timeline, Card,DatePicker} from 'antd';
import { ArrowUpOutlined,
        ArrowDownOutlined,
        QuestionCircleOutlined,
        RedoOutlined
     } from '@ant-design/icons';
import moment from 'moment';

import Line from './line'
import Bar from './bar'
import './index.less'

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

//首页路由
export default class Home extends Component {

    state = {
        isVisibled:true
    }

    handleChange=(isVisibled)=>{
        return ()=>{
          this.setState({isVisibled})
        }
    }

    render() {
        const {isVisibled} = this.state;
        return (
            <div className="home">
                  <Card
                     className = 'home-card'
                     title = '商品总量'
                     extra = {<QuestionCircleOutlined />}
                     style = {{width:200}}
                     headStyle = {{color: 'rgba(0,0,0,.45)'}}
                  >
                  <Statistic
                      
                        value={1121638}
                        valueStyle={{ color: '#3f8600' }}
                        suffix="个"
                        style = {{fontWeight:'bolder'}}
                    />
                     <Statistic
                        value={18}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={'周同比'}
                        suffix={<div>%<ArrowUpOutlined /></div>}
                    />
                     <Statistic
                        value={15}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={'日同比'}
                        suffix={<div>%<ArrowDownOutlined /></div>}
                    />
                  </Card>
                  <Line/>
                  <Card
                     className='home-content'
                     title = {
                         <div className='home-menu'>
                             <span 
                                className={isVisibled?'home-menu-active  home-menu-visited':'home-menu-visited'}
                                onClick={this.handleChange(true)}
                                >访问量</span>
                             <span 
                                className={isVisibled?'':'home-menu-active'}
                                onClick={this.handleChange(false)}
                             >销售量</span>
                         </div>
                     }
                     extra = {
                        <RangePicker
                        defaultValue={[moment('2021-01-01', dateFormat), moment('2021-12-31', dateFormat)]}
                        disabled={[false, true]}
                      />
                     }
                   >
                   <Card
                     className = 'home-table-left'
                     title = {isVisibled?'访问趋势':'销售趋势'}
                     bodyStyle = {{padding:0,height:350}}
                     extra = {<RedoOutlined />}
                   >
                    <Bar/>
                   </Card>
                   
                   <Card 
                   title='任务' 
                   extra={<RedoOutlined />} 
                   className="home-table-right">
                        <Timeline>
                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                        <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>联调接口</p>
                            <p>功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>权限验证</p>
                            <p>页面排版</p>
                        </Timeline.Item>
                        </Timeline>
                    </Card>

                  </Card>
            </div>
        );
    }
}

