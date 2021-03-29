import React, { Component } from 'react';
import {Card,Button,Select,Input,Table,message} from 'antd'
import {SearchOutlined,PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton'
import {reqProduct,reqSearchProduct,reqUpdateStatus} from '../../../api'
import {PAGE_SIZE} from '../../../constant'
import memoryUtil from '../../../utils/memoryUtil'
const Option = Select.Option

export default class ProductHome extends Component {
    state = {
        products:[],//商品
        total:0,
        loading:false,
        searchType:'productName',//默认按名称搜索
        searchName:'',
       

    }

    /**
     * 初始化table的列的数组
     */
    initColumns=()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
             
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
             
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=>{//当前指定了对应的属性，传入的是对应的属性值
                  return '￥'+price
              }
            },
            {
                title: '状态',
              
                width:100,
                render:(product)=>{
                  
                    const {_id,status} = product
                    
                    const newStatus = status===1?2:1
                   

                    return (
                    <span>
                        <Button 
                        type='primary'
                        onClick={()=>{this.updateStatus(_id,newStatus)}}
                        >
                        {status===1?'下架':'上架'}
                        </Button>
                        <span>{status===1?'在售':'已下架'}</span>
                    </span>
                    )
                }
              },
              {
                title: '操作',
                width:100,
                render:(product)=>{
                    return (
                    <span>
                        {/* 使用BrowserRouter
                        <LinkButton onClick={()=>{this.props.history.push('/product/detail',product)}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.props.history.push('/product/addUpdate',product)}}>修改</LinkButton> */}
                         
                         {/* 使用HashRouter */}
                        <LinkButton onClick={()=>{this.showDetail(product)}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.showUpdate(product)}}>修改</LinkButton>
                    </span>
                    )
                }
              },
          ];
    }

    /**
     * 使用HashRouter不接收push传递的第二个参数
     * 所以借助memoryUtil报仇呢product
     */
    showDetail=(product)=>{
        memoryUtil.product = product;
        this.props.history.push('/product/detail')
    }

    showUpdate=(product)=>{
        memoryUtil.product = product;
        this.props.history.push('/product/addUpdate')
    }

    /**
     更新指定商品状态
     */
    updateStatus=async (productId,status)=>{

        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success('商品更新成功')
            this.getProducts(this.pageNum)
        }

    }

    /**
     * 获取指定页码的列表数据显示
     */
    getProducts= async (pageNum)=>{
        this.pageNum = pageNum//保存pageNum在其他方法里使用
        this.setState({loading:true})
        const {searchType,searchName} = this.state
        let result;

        if(searchName){//如果输入框有值的话，就是根据ID/Name搜索产品分页列表
            result = await reqSearchProduct({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else{//否则就是商品分页搜索
             result = await reqProduct(pageNum,PAGE_SIZE)
             
        }       
        this.setState({loading:false})
        if(result.status===0){
            //取出分页数据，更新状态，显示分页列表
            const {total,list} = result.data
            this.setState({
                total,
                products:list
            })
        }
    }

   UNSAFE_componentWillMount(){
       this.initColumns();
   }

   componentDidMount(){
       this.getProducts(1);
   }

    render() {
        const {products,total,loading,searchType,searchName} = this.state;
        const title = (
            <span>
               <Select 
               style={{width:150}}  
               value={searchType} 
               onChange={(value)=>{this.setState({searchType:value})}}> 
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
               </Select>
               <Input 
                 style={{width:150,margin:'0 10px'}} 
                 placeholder="请输入关键字 ^-^ " 
                 value={searchName}
                 onChange={(event)=>{this.setState({searchName:event.target.value})}}
                 />
               <Button onClick={()=>this.getProducts(1)} type='primary'>
               <SearchOutlined />
                   搜索
                </Button>
                
            </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>{this.props.history.push('/product/addUpdate')}}>
                <PlusOutlined/>
                 添加商品
            </Button>
        )         
        return (
            
            <Card title={title} extra={extra}>
                <Table 
                   rowKey='_id'
                   
                   dataSource={products}
                   columns={this.columns} 
                   loading={loading}
                   pagination={{
                       defaultPageSize:PAGE_SIZE,
                       total,
                       showQuickJumper:true,
                       current:this.pageNum,
                    //    onChange:(pageNum)=>{
                    //         this.getProducts(pageNum)
                    //     }
                    onChange: this.getProducts
                    
                    }}

                />
            </Card>
        );
    }
}


