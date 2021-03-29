import React, { Component } from 'react';
import {Card,Button,Table,Modal,message} from 'antd'
import {connect} from 'react-redux'
import {reqRoleList,reqAddRole,reqUpdateRole} from '../../api'
import AddForm from './add_form'
import AuthForm from './auth_form'
import {formateData} from '../../config/timeConfig'
import {logout} from '../../redux/actions'

//角色路由
class Role extends Component {
    state = {
        roles:[],//所有的角色列表
        role:{},//选中的role
        isShowAdd:false,//是否显示添加的界面
        isShowAuth:false//是否显示角色权限界面
    }

    myCheckKeys = React.createRef();
    onRow=(role)=>{
        return {
            onClick:event=>{//点击行
                // console.log(role)
                // console.log('点击行!!!')
                this.setState({
                    role
                })
            }
        }
    }

    initialColumn=()=>{
        this.columns=[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:(create_time)=>formateData(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formateData
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            }

        ]
    }

    getRoles = async ()=>{
        const result = await reqRoleList();
        
        if(result.status === 0){
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    //设置角色权限
    updateRoles = async ()=>{
        //1.隐藏确定框
        this.setState({
            isShowAuth:false
           })
        const role = this.state.role   
        //得到最新的role
        /**
         * 我们不是改的是role，为什么要更新roles？
         *    -因为roles是role对象的引用变量，所以说role也关联到数组上roles
         */
        const menus = this.myCheckKeys.current.getCheckedKeys();
       
        role.menus = menus
       
        role.auth_name = this.props.user.username
       
        const result = await reqUpdateRole(role)
       
        if(result.status === 0){
            
            // this.getRoles()
            //如果更新的是自己的权限，就强制退出
            if(this.props.user.role_id===role._id){
                this.props.logout()
                message.success('当前用户角色权限更新成功 $ - $ ')
            }else{
                message.success('更改角色权限成功 $ - $ ')
                this.setState({
                    roles:[...this.state.roles]
                })
            }
           
        }else{
            message.error('更改角色权限失败T - T ')
        }

    }


    //添加角色
    addRoles=()=>{
       //表单验证通过，通过才处理
       this.myForm.current.validateFields().then(async values=>{
           //1.隐藏确定框
           this.setState({
            isShowAdd:false
           })
           //2.收集数据，并提交添加分类的请求
           const {roleName} = values;
           const result = await reqAddRole(roleName)


           if(result.status === 0){
               message.success('添加角色成功^m^')
               const role = result.data

               /**
                * 更新roles状态
                * const roles = this.state.roles
                * roles.push(role)
                * this.setState({
                *    roles
                * })
                */

               //更新roles状态：基于原本状态数据更新
               this.setState(state=>({
                roles:[...state.roles,role]
               }))
              
           }else{
               message.error('添加角色失败T-T')
           }
       })
    }

     componentDidMount(){
        this.getRoles();
    }

    UNSAFE_componentWillMount(){
        this.initialColumn();
    }
    render() {
        const {roles,role,isShowAdd,isShowAuth} = this.state
        const title = (
            <span>
                <Button  type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建角色</Button>&nbsp;&nbsp;
                <Button disabled={!role._id} type='primary' onClick={()=>{this.setState({isShowAuth:true}) }}>设置角色权限</Button>
            </span>
        )
        return (
           <Card title={title}>
             <Table
              dataSource={roles} 
              bordered
              rowKey='_id'
              onRow={this.onRow}
              rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
              onSelect={(role)=>{//用户手动选择/取消选择某行的回调
                  this.setState({role})
              }}
              columns={this.columns} 
              pagination={{defaultPageSize:5,showQuickJumper:true}}
              >              
             </Table>
             
              <Modal 
                 title="添加角色" 
                 visible={isShowAdd} 
                 onOk={this.addRoles} 
                 onCancel={()=>{this.setState({isShowAdd:false})}}
                 destroyOnClose={true}>                
                <AddForm
                    setMyForm={(myForm)=>{this.myForm=myForm}}
                />
              </Modal>
              <Modal 
                 title="设置角色权限" 
                 visible={isShowAuth} 
                 onOk={this.updateRoles} 
                 onCancel={()=>{this.setState({isShowAuth:false})}}
                 destroyOnClose={true}
                 >                
                <AuthForm
                    ref={this.myCheckKeys}
                    role = {role}
                />
              </Modal>
           </Card>
        );
    }
}

export default connect(
    state=>({
        user:state.user
    }),
    {logout}
)(Role)
