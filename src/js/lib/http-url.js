import {CONFIG} from './config';
let _host=CONFIG.debugger?'http://mdev.zhaoyl.com':'http://m.zhaoyl.com';
let httpUrl={
  'save':_host+'/wx/entrance/save',//提交接口
  'get':_host+'/wx/entrance/get',//查询接口
  'set':_host+'/wx/entrance/update',//修改为已入场接口
  'getChat':_host + '/dtopic/item/show',//获取话题评论
  'getFlowers':_host + '/dtopic/interactive/flowerList',//获取鲜花
  'getHeart':_host + '/dtopic/interactive/fanList',//获取关注
  'setState':_host + '/dtopic/topic/update'//启用话题
};
let statistics = _host + '/wx/satistics/save';//活动统计接口
let WXhttp = {
  'checkOpenId':_host+'/wx/vote/redirect',
  'getWxAuthor':_host+'/ticket/get',
  'getUser':_host + '/wx/vote/getUser',
  'appId':CONFIG.debugger?'wxae3969df6f1d76fd':'wxef743b6a29c2f4d8'
};
export {httpUrl,WXhttp,statistics}