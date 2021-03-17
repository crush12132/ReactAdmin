/**
 * 要求：能根据接口文档定义接口请求
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 * 
 * 基本要求：能根据接口文档定义接口请求函数
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// const BASE = 'http://localhost:3000'
const BASE = ''


// export function reqLogin(username, password){
//       return axios('/login',{username,password},'POST')
// }

//       return axios('/login',{username,password},'POST')
//登录接口
export const reqLogin = (username, password)=>ajax(BASE+'/login',{username,password},'POST')

//添加用户或者更新+(product._id?'update':'add')
export const reqAddOrUpdateUser = (userObj)=>ajax(BASE+'/manage/user/'+(userObj._id?'update':'add'),userObj,'POST')

//获取品类管理一级/二级列表
export const reqCategorys = (parentId)=>ajax(BASE+'/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = ({parentId,categoryName})=>ajax(BASE+'/manage/category/add',{parentId,categoryName},'POST')

//更新品类名称
export const reqUpdataCategory = ({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')



/**
 * json请求的接口请求函数
 */
export const reqWeatherandAddress = ()=>{
    
    return new Promise((resolve, reject)=>{
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?city=460100&key=50a64410dd8b9b3e92065ad7a21dced6'
       //发送jsonp请求
        jsonp(url,{},(err,data)=>{
           //如果成功了
            if(!err && data.status==='1'){
               //取出需要的数据
                const {weather,city} =  data.lives[0]
                resolve({weather,city})
            }else{
                message.error('获取天气信息失败!!!')
            }
        })
    })
    
}

//获取商品分页列表
export const reqProduct = (pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum,pageSize})


// export const reqWeather = ()=>{
//     const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=460100&key=50a64410dd8b9b3e92065ad7a21dced6`
//            //发送jsonp请求
//                 jsonp(url,{},(err,data)=>{
//                     console.log('jsonp()',err,data);
//                 })
// }
// reqWeather();

/**
 * 根据ID/Name搜索产品分页列表
 * searchType[搜索的类型]:productName/productName
 * 在对象上使用变量作为属性值
 */
export const reqSearchProduct = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',
     {pageNum,
      pageSize,
     [searchType]:searchName
    })

/**
根据分类ID获取分类
 */    
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})

/**
对商品进行上架/下架处理
 */

export const reqUpdateStatus = (productId,status)=> ajax(BASE+"/manage/product/updateStatus",{productId,status},'POST')

/**
 * 对图片进行删除
 */
export const reqDeleteImg = (name)=>ajax(BASE+'/manage/img/delete',{name},'POST')

//添加商品
// export const reqAddProduct = (product)=> ajax(BASE+'/manage/product/add',product,'POST')

//修改商品
// export const reqUpdateProduct = (product)=> ajax(BASE+'/manage/product/update',product,'POST')

//添加修改商品
export const reqAddOrUpdateProduct = (product)=> ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')

//获取角色列表
export const reqRoleList = ()=> ajax(BASE+'/manage/role/list')

//添加角色
export const reqAddRole = (roleName)=>ajax(BASE+'/manage/role/add',{roleName},'POST')

//更改角色权限
export const reqUpdateRole = (role)=>ajax(BASE+'/manage/role/update',role,'POST')

//获取用户列表
export const reqUsersList = ()=>ajax(BASE+'/manage/user/list')

//删除用户
export const reqDeleteUser = (userId)=>ajax(BASE+"/manage/user/delete",{userId},'POST')