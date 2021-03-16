 //配置具体修改规则
    // 按需配置文件
    const { override, fixBabelImports,addLessLoader } = require('customize-cra');

    module.exports = override(
    //针对antd实现按需打包：根据import来打包(使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//自动打包样式
    }),
    addLessLoader({
    javascriptEnabled: true,
    //使用less- loader对源码中的less的变量进行重新指定
    modifyVars: { '@primary-color': '#fee140' },//@primary-color主体的变量
    })
    );   