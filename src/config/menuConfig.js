import {
 
    AppstoreAddOutlined,
    CloudOutlined,
    SplitCellsOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    PieChartOutlined,
    LineChartOutlined,
    AreaChartOutlined,
    BarChartOutlined
    
  } from '@ant-design/icons';

const menuList = [
    {
        title:'首页',
        key:'/home',
        icon:<AppstoreAddOutlined/>,
        isPublic:true
    },
    {
        title:'分类',
        key:'/products',
        icon:<SplitCellsOutlined/>,
        children:[
            {
                title:'品类管理',
                key:'/category',
                icon:<CloudOutlined />
            },
            {
                title:'商品管理',
                key:'/product',
                icon:<CloudOutlined />
            },
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:<UserOutlined />
    },
    {
        title:'角色管理',
        key:'/role',
        icon:<UsergroupAddOutlined />
    },
    {
        title:'图形图表',
        key:'/charts',
        icon:<AreaChartOutlined />,
        children: [
            {
                title:'柱形图',
                key:'/charts/bar',
                icon:<BarChartOutlined />
            },
            {
                title:'折线图',
                key:'/charts/line',
                icon:<LineChartOutlined />
            },
            {
                title:'饼图',
                key:'/charts/pie',
                icon:<PieChartOutlined />
            },
        ]
    },
]

export default menuList