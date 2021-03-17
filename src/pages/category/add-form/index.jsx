import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Form,Select,Input} from 'antd'
const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {

    myForm = React.createRef()

    static propTypes = {
        categorys: PropTypes.array,
        parentId:PropTypes.string,
        setMyForm:PropTypes.func
    }

    UNSAFE_componentWillMount(){
        this.props.setMyForm(this.myForm)
    }

    render() {
        const {categorys,parentId} = this.props
        return (
            <Form ref={this.myForm}>
                <Item 
                name="parentId"
                initialValue={parentId}
                >
                   <Select>
                       <Option value='0'>一级分类</Option>
                     {
                         categorys.map((c)=>{
                            return (
                                <Option  key={c._id} value={c._id}>{c.name}</Option>   
                            )
                         })
                     }  
                     </Select> 
                </Item>

                <Item 
                name="categoryName"
                initialValue=''
                rules={[
                    { required:true,message:'分类名称必须输入哦= ='}
                 ]}
                >
                    <Input placeholder="请输入您要添加的分类名称^ - ^"/>
                </Item>
            </Form>
        );
    }
}


