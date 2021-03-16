import React, { Component } from 'react';
import {Card,Table,Button,Modal,message} from 'antd'
import {reqUsersList,reqDeleteUser,reqAddOrUpdateUser} from '../../api'
import {formateData} from '../../config/timeConfig'
import LinkButton from '../../components/LinkButton'
import UserForm from './user_form'

//用户路由
export default class User extends Component {
    state = {
        users:[],
        isShow:false
    }



    /**
     *根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
     */
    getRoleName=(roles)=>{
        const roleName = roles.reduce((pre,role)=>{
            
            pre[role._id] = role.name

            return pre
        },{})

        this.roleName = roleName;
        
    }
    //删除用户
    deleteUser = (user)=>{
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            okText: '确认',
            cancelText: '取消',
            onOk:async ()=>{
           
                const result = await reqDeleteUser(user._id)
                console.log(result)
                if(result.status===0){
                    message.success('删除用户成功!!!')
                    this.getUsers()
                }
            }
           
          });
    }

    //展示更改用户
    showUpdate=(user)=>{
        //保存
        this.user = user
        this.setState({isShow:true})
    }

    //显示添加界面
    showAdd=()=>{
        this.user = null//去除前面保存的user
        this.setState({isShow: true})
    }

    initialColumn=()=>{
        this.columns=[
            {
                title:'用户',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email',
              
            },
            {
                title:'电话',
                dataIndex:'phone',
                
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render:formateData
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                // render:(role_id)=>{return this.state.roles.find((role)=>{return role._id===role_id}).name}
                render:(role_id)=>{return this.roleName[role_id]}
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    getUsers = async ()=>{
        const result =await reqUsersList()
        if(result.status===0){
            const {users,roles} =  result.data
            this.getRoleName(roles)
            this.setState({
                users,
                roles
            })
        }
    }
    

    //添加或更改用户
    addOrUpdateUser= async()=>{

        //隐藏确定框
        this.setState({isShow:false})

       //1.收集数据
        const user = this.myForm.current.getFieldsValue();
        
        //如果是更新，需要给user指定_id属性
        if(this.user){
             user._id = this.user._id
        }
       //2.提交请求
       const result = await reqAddOrUpdateUser(user)
       if(result.status === 0){
           message.success(`${this.user?'更新':'添加'}用户成功 ^ - ^`)
           //更新界面
           this.getUsers()
       }else{
           message.error('添加用户失败 T = T ')
       }
    }

    componentDidMount(){
        this.getUsers();
    }

    UNSAFE_componentWillMount() {
      this.initialColumn()

    }

    render() {
        const {users,isShow,roles} = this.state
        const user = this.user || {}
        const title = (
            <Button 
            onClick={this.showAdd}
            type='primary'>
                创建用户
            </Button>
        )
        return (
            <Card title={title}>
            <Table
              dataSource={users} 
              bordered
              rowKey='_id'
              columns={this.columns} 
              pagination={{defaultPageSize:5,showQuickJumper:true}}
              >              
             </Table>
             <Modal 
                 title={user._id?'更新用户':'添加用户'} 
                 visible={isShow} 
                 onOk={this.addOrUpdateUser} 
                 onCancel={()=>{
                    this.myForm.current.resetFields()
                     this.setState({isShow:false})
                     
                    }}
                 destroyOnClose={true}>                
                <UserForm
                   setForm = {(myForm)=>{this.myForm=myForm}}
                   roles = {roles}
                   user = {user}
                />
              </Modal>
            </Card>
        );
    }
}

