/**
 * 包含n个日期处理的时间工具模块 
 */
//格式化日期
export  function formateData(time){
    if(!time){
        return ''
    }
    let date = new Date(time)
     return date.getFullYear() + '-' +(date.getMonth()+1)+'-' +date.getDate()+'  '
               + date.getHours() + ':' + date.getMinutes()+':'+date.getSeconds()
}