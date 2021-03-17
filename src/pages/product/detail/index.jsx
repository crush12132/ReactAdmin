import React, { Component } from 'react';
import {Card,List} from 'antd'
import {LeftOutlined} from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton'
import {BASE_IMG_SRC} from '../../../constant'
import {reqCategory} from '../../../api'

const Item = List.Item

export default class ProductDetail extends Component {
    
    state = {
       cName1:'',//一级分类名称
       cName2:''//二级分类名称
    }

    

    async componentDidMount(){
      const {categoryId,pCategoryId} = this.props.location.state
     
      if(pCategoryId==='0'){//发送请求获取一级分类名称
       const result =await reqCategory(categoryId)
       const cName1 = result.data.name;
       this.setState({
         cName1
       })
       
        }else{//发送请求获取二级分类名称和一级分类名称
      /**
        通过多个await方式发送多个请求：后面一个请求是在前一个请求成功返回之后才发送
       */
      //  const result1 =await reqCategory(pCategoryId)
      //  const result2 =await reqCategory(categoryId)
      //  const cName1 = result1.data.name;
      //  const cName2 = result2.data.name;
      
      //一次性发送多个请求，只有都成功了，才正常处理Promise.all([])
       const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]);
       const cName1 = results[0].data.name;
       const cName2 = results[1].data.name;
        this.setState({
                cName1,
                cName2
              })

      }

    }



    render() {
        const {name,desc,price,imgs,detail} = this.props.location.state
        const {cName1,cName2} = this.state
        const title = (
          <span>
            <LinkButton onClick={()=>{this.props.history.goBack()}}>
            <LeftOutlined style={{color:'yellow',marginRight:10,fontSize:20}}/>
            </LinkButton>
            
            <span>商品详情</span>
          </span>
        )
        return (
            <Card className='product-detail' title={title}>
              <List >
                <Item  >
                        <span className="left">商品名称:</span>
                        <span>{name}</span>                     
                </Item> 
                <Item >                    
                          <span className="left">商品描述:</span>
                          <span>{desc}</span>                      
                </Item> 
                <Item >                          
                          <span className="left">商品价格:</span>
                          <span>{price}</span>                    
               </Item> 
                <Item >                      
                          <span className="left">所属分类:</span>
                         <span>{cName1}{cName2 ?'->'+cName2:''}</span>                      
                </Item> 
                <Item >                            
                          <span className="left">商品图片:</span>
                          <span >
                            {
                                imgs.map((img)=>{
                                    return (
                                        <img key={img} src={BASE_IMG_SRC+img} alt="img"/>
                                    )
                                })
                            }
                          </span>                    
                  </Item>
                  <Item >                        
                          <span className="left">商品详情:</span>
                          {/* dangerouslySetInnerHTML显示html标签 */}
                          <span dangerouslySetInnerHTML={{__html:detail}}></span>                
                </Item> 
              </List>
            </Card>
        );
    }
}


