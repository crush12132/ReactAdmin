import React, { Component } from 'react';
import { Card ,Button,Table,message,Modal} from 'antd';
import { RightOutlined ,PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../components/LinkButton'
import {reqCategorys,reqAddCategory} from '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'
import RemoveForm from './remove-form'
import {reqUpdataCategory} from '../../api'

//商品分类路由
export default class Category extends Component {

    state = {
      categorys:[],//一级分类列表
      loading:false,//是否正在获取数据中
      subCategorys:[],//二级分类列表
      parentId:'0',//当前需要显示的分类列表的parentId
      parentName:'',//当前需要显示的分类列表的父名称
      showStatus:0// 0表示隐藏，1表示更新，2表示修改，3表示添加，4表示删除
    }

    /**
     * 异步获取一级/二级分类列表显示
     * parentId:如果没有指定-根据状态中的parentId请求，如果指定了-根据指定的请求
     * 关键是要知道分类列表显示一级还是二级是靠state里的patentId决定的
     * 
     */
    getCategorys= async (parentId)=>{
     
      parentId = parentId || this.state.parentId
      //在发送请求前，显示loading
      this.setState({loading:true})

      //取出分类数组（可能是一级也可能是二级）
      const result = await reqCategorys(parentId)
      //在请求完成后，隐藏loading
      this.setState({loading:false})
       
     if(result.status===0){
      const categorys = result.data;
      if(parentId==='0'){
        //更新一级分类状态
        this.setState({categorys})
      }else{
        //更新二级分类状态
        this.setState({subCategorys:categorys})
      }
      
     }else{
      message.error('获取一级分类列表失败!!!')
     }
     
    }

    /**
     * 显示指定一级分类对象的的二级列表
     */
    showSubcategory=(category)=>{
      this.setState({
        parentId:category._id,
        parentName:category.name,
      },()=>{//在状态更新且重新render()后执行
      // console.log("state:",this.state.parentId)
        //获取二级分类列表显示
        this.getCategorys();
      })
      //setState()不能立即获取最新的状态：因为setState()是异步更新状态的
      // console.log("state:",this.state.parent Id)
    }

    /**
     * 显示一级分类列表
     */
    showCategory=()=>{
      //更新为显示一级列表状态
      this.setState({
        parentId:'0',
        parentName:'',
        subCategorys:[]
      })
    }


    /**
     * 初始化Table所有列的数组
     */
    getColumns=()=>{
      this.columns = [
        {
          title: '分类名称',
          dataIndex: 'name',//显示数据对应的属性名
          
        },
        {
           title:'操作',
           width:350,
           render: (category) => (//返回需要显示的界面标签
               <div>
                   <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton>
                   <LinkButton onClick={()=>{this.showRemove(category)}}>删除分类</LinkButton>
                   {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                   {this.state.parentId==='0' ? <LinkButton onClick={()=>{this.showSubcategory(category)}}>查看子分类</LinkButton> : null}
                   
               </div>
            ),
        },
      ];
    }


    //点击取消按钮，显示框消失
    handleCancel=()=>{
       //清除输入数据
       this.myForm.current.resetFields();
      //隐藏确定框
      this.setState({
        showStatus:0
      })
    }

    //点击添加按钮，显示对话框
    showAdd=()=>{
      this.setState({
        showStatus:1
      })
    }
    //添加分类
    addCategory = ()=>{
      //表单验证通过，通过了才处理
      this.myForm.current.validateFields().then(async values=>{
         //  console.log('add')
            //1.隐藏确定框
            this.setState({
              showStatus:0
            })
          //2.收集数据，并提交添加分类的请求
          const {parentId,categoryName} =  values;
          //清除输入数据
          this.myForm.current.resetFields();
          const result = await reqAddCategory({parentId,categoryName})
          if(result.status===0){
              //3.重新获取分类显示列表[添加的分类就是当前分类列表下的分类]
              if(parentId===this.state.parentId){
                //重新 A获取当前分类列表显示
                this.getCategorys()
              }else if(parentId==='0'){//在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级列表
                this.getCategorys('0')
              }
              
          }
      }).catch(err=>{
        console.log(err)
      })
      
     
    }

    //点击修改按钮LinkButton，显示对话框
    showUpdate=(category)=>{
      //保存分类对象
      this.category = category;
      // console.log(this.category)
      //更新状态
      this.setState({
        showStatus:2
      })
    }
    //更新分类
    updateCategory=()=>{
      this.myForm.current.validateFields().then(async values=>{
       // console.log('update')
       //1.隐藏确定框
       this.setState({
        showStatus:0
      })

      //准备数据
      const categoryId = this.category._id;
      const {categoryName} = values;
      // console.log(this.myForm.current.getFieldsValue().categoryName)

        //清除输入数据
        this.myForm.current.resetFields();

      //2.发请求更新分类
      const result = await reqUpdataCategory({categoryId,categoryName})
      if(result.status===0){
        //3.重新显示列表
        this.getCategorys()
      }
     
      }).catch(err=>{
        console.log(err)
      }) 
     

    }
  
     
    //点击修改按钮LinkButton，显示对话框
    showRemove=(category)=>{
      //保存分类对象，通过this找到当前组件对象
      this.category = category;
      //更新状态
      this.setState({
        showStatus:3
      })
    }
    //删除分类
    removeCategory=()=>{

      //1.更新状态
      this.setState({
        showStatus:0
      })
      //2.发送请求[无删除分类的接口]
      //3.重新渲染页面
      console.log('remove')

    }

    //组件一挂载就发送显示一级分类的请求[异步]
    componentDidMount(){
      this.getCategorys()
    }

    //组件将挂载时就初始化列
    UNSAFE_componentWillMount(){
      this.getColumns()
    }

    render() {
        const category = this.category||{};//如果还没有指定一个空对象
        
        const { categorys,loading,parentId,parentName,subCategorys,showStatus} = this.state;
   
        const title = parentId==='0'?"一级分类列表":(
          <span>
            <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
            <RightOutlined style={{margin:5}}/>
            <span>{parentName}</span>
          </span>
        );
        const extra = (
            <Button onClick={this.showAdd} type='primary'>
             <PlusOutlined />
              添加
              </Button>
        );
          
        return (
            <Card title={title} extra={extra}>
               <Table 
               dataSource={parentId==='0' ? categorys : subCategorys} 
               bordered
               loading={loading}
               rowKey='_id'
               columns={ this.columns} 
               pagination={{defaultPageSize:5,showQuickJumper:true}}
               
               />
              <Modal 
                 title="添加分类" 
                 visible={showStatus===1} 
                 onOk={this.addCategory} 
                 onCancel={this.handleCancel}
                 destroyOnClose={true}>
                 
                <AddForm
                    categorys={categorys}
                    parentId={parentId}
                    setMyForm={(myForm)=>{this.myForm=myForm}}
                />
              </Modal>

              <Modal 
                title="修改分类" 
                visible={showStatus===2} 
                onOk={this.updateCategory} 
                onCancel={this.handleCancel}
                destroyOnClose={true}>
                  
                <UpdateForm  
                categoryName={category.name} 
                setMyForm={(myForm)=>{this.myForm=myForm}}
                />           
              </Modal>

              <Modal 
                title="删除分类" 
                visible={showStatus===3} 
                onOk={this.removeCategory} 
                onCancel={this.handleCancel}
                destroyOnClose={true}>
                <RemoveForm/>          
              </Modal>
            </Card>
        );
    }
}

