import React, { Component } from 'react';
import {Card,Form,Input,Cascader,Button,message} from 'antd'
import {LeftOutlined} from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton'
import {reqCategorys,reqAddOrUpdateProduct} from '../../../api'
import PicturesWall from './pictures_wall'
import RichTextEditor from './rich_text_editor'
const Item = Form.Item
const { TextArea } = Input;


export default class ProductAddUpdate extends Component {
    myForm = React.createRef();
    myImgs = React.createRef();
    myDetail = React.createRef();
    state = {options:[]}
    
   /**
    * 异步获取一级/二级分类列表，并显示
    * async函数的返回值是一个新的promise对象，promise的结果和值都由async的结果来决定 
    */
    getCategorys= async (parentId)=>{
        const result = await reqCategorys(parentId);//{status:0,data:categorys}
        
        if(result.status===0){
            const categorys = result.data
         //如果是一级分类列表   
         if(parentId==='0'){
            this.initOptions(categorys)
         }   
        else{//二级列表
            return categorys//返回二级列表==>当前async函数返回的promise就会成功且vaule为catagorys
        }

        }
    }

    initOptions= async(categorys)=>{
        //根据categorys生成options数组
        const options = categorys.map((c)=>(
            {
                value: c._id,
                label: c.name,
                isLeaf: false,
              }
        ))

        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product 
        if(isUpdate && pCategoryId!=='0'){
            //获取对应的二级分类列表
            const subCategorys =await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const childrenOptions = subCategorys.map((c)=>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //找到当前商品对应的一级option对象
            const targetOptions =  options.find((option)=>{
                return option.value === pCategoryId
            })
            //关联对应的一级option上
            targetOptions.children = childrenOptions
        }



        //更新options状态
        this.setState({options})
        
    }

    /**
     * 异步获取一级/二级分类列表，并显示
     */
    componentDidMount(){
        this.getCategorys('0');
        
    }

    UNSAFE_componentWillMount() {
        //取出携带的数据
       const product =  this.props.location.state
       this.isUpdate = !!product;
       this.product = product || {};
    }

    //提交按钮
    onFinish =async (values) => {
        //进行表单验证，如果通过了才发送请求
        console.log('values',values);
        //1.获取数据
        const {name,desc,price,categorys} = values
        let pCategoryId,categoryId
        if(categorys.length===1){
            pCategoryId='0'
            categoryId=categorys[0]
        }else{
            pCategoryId=categorys[0]
            categoryId=categorys[1]
        }
        const imgs = this.myImgs.current.getImgs();
        const detail = this.myDetail.current.getDetail();
        // console.log(imgs,detail)
        const product = {name,desc,price,pCategoryId,categoryId,imgs,detail}

        console.log(product)
        //如果是更新，需要添加_id
        if(this.isUpdate){
            product._id = this.product._id
        }


        //2.调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)
        //3.根据结果提示
        if(result.status === 0){
            message.success(`${this.product._id?'更新':'添加'}商品成功^-^`)
            this.props.history.goBack()
        }else{
            message.error(`${this.product._id?'更新':'添加'}商品失败T_T`)

        }
      };

    //验证商品价钱的合法性
    validats=(_, value)=>{
        
        if(value*1>0){
            return Promise.resolve()
            
        }else{
            return Promise.reject('请输入正确的商品价格哦!')
        }
      }  
      
      /**
       * 加载下一级列表的回调函数
       */
       loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[0];
        //显示loading
        targetOption.loading = true;
    
        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
       
        //隐藏loading
        targetOption.loading = false;

        if(subCategorys && subCategorys.length > 0){
            //生成一个二级列表的options
            const childOptions =  subCategorys.map((c)=>(
                {
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }
            ))
            //关联到当前option上
            targetOption.children = childOptions
        }else{//没有二级分类列表
            targetOption.isLeaf = true
        }

        //更新options的状态
        this.setState({
            options:[...this.state.options]
        })
        
        

      };
    render() {
        const {isUpdate,product} = this
        //用来收集级联分类id的数组
        const {pCategoryId,categoryId,imgs,detail} = product
        console.log(product)
        const  categorys = []
        if(isUpdate){
            if(pCategoryId==='0'){
                categorys.push(categoryId)
            }else{
                categorys.push(pCategoryId)
                categorys.push(categoryId)
            }
            
        }


        const layout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 10,
            },
          };
        const title = (
            <span>
                <LinkButton onClick={()=>{this.props.history.goBack()}}>
                     <LeftOutlined style={{color:'yellow',marginRight:10,fontSize:20}}/>
                </LinkButton>
                <span>{isUpdate?'修改商品':'添加商品'}</span>
            </span>
        )
        return (
            <Card  title={title}>
                <Form ref={this.myForm} {...layout} onFinish={this.onFinish}>
                    <Item  
                    label="商品名称:"
                    name="name"
                    rules={[{ 
                         required: true,
                         message: '请输入商品名称!' }]}
                    initialValue={product.name}   
                    >
                        <Input placeholder='请输入商品名称'/>
                    </Item>
                    <Item  
                    label="商品描述:"
                    name="desc"
                    rules={[{ 
                         required: true,
                         message: '请输入商品描述!' }]}
                    initialValue={product.desc}        
                    >
                        <TextArea 
                        placeholder='请输入商品描述'
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Item>
                    <Item  
                    label="商品价格:"
                    name="price"
                    rules={[
                        {required: true,message: '请输入商品价格!'},
                        {validator:this.validats}]}
                    initialValue={product.price}       
                    >
                        <Input 
                           type='number'
                           addonAfter="元"
                           />
                    </Item>
                    <Item  
                    label="商品分类:"
                    name='categorys'
                    rules={[
                        {required: true,message: '请选择商品分类!'}
                    ]}
                    initialValue={categorys}
                    >
                         <Cascader 
                            options={this.state.options}//需要显示的列表数据数组 
                            loadData={this.loadData} //当选择某个列表项时，加载下一级列表的监听回调
                             />
                    </Item>
                    <Item  label="商品图片:">
                        {/* 自动将标签对象添加为myImgs对象的current属性 */}
                        <PicturesWall 
                               ref={this.myImgs}
                               imgs={imgs}
                               />
                    </Item>
                    <Item  
                        label="商品详情:"
                        labelCol= {{ span: 4}}
                        wrapperCol={ { span: 20 }}
                    >
                        <RichTextEditor
                            ref={this.myDetail}
                            detail={detail}
                        />
                    </Item>
                    <Button
                      type='primary'
                      htmlType="submit">
                        提交
                    </Button>
                </Form>
            </Card>
        );
    }
}

/**
 * 子组件调用父组件的方法：
 *     将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
 * 父组件调用子组件的方法：
 *     在父组件中通过ref得到子组件标签对象，调用其方法 
 */
