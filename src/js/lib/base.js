let $ajax = require('./ajax');
import {WXhttp} from './http-url.js';
let Base = {
  /**
   * @description 获取url参数
   * @param url 路径
   * @returns {{}} 返回参数对象
   */
  getUrlPrmt: function (url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
      let pos = _arrS[i].indexOf('=');
      if (pos == -1) {
        continue;
      }
      let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  },
  /**
   * @description 设置url参数
   * @param obj 参数对象 {'a':1,'b':2}
   * @returns {string} a=1&b=2
   */
  setUrlPrmt: function (obj) {
    let _rs = [];
    for (let p in obj) {
      if (obj[p] != null && obj[p] != '') {
        _rs.push(p + '=' + obj[p])
      }
    }
    return _rs.join('&');
  },
  /**
   * @description 跳转url
   * @param url 初始值url
   * @param urlParams 添加的url参数值对象
   * @param addTimeStamp 是否添加时间戳
   */
  jumpTo: function (url, urlParams, addTimeStamp) {
    let _sign = '?';
    let _link = '';
    if (url.indexOf('?') != '-1') {
      _sign = '&';
    }
    if (addTimeStamp) {
      urlParams['zt'] = new Date().getTime();
    }
    _link = url + _sign + Base.setUrlPrmt(urlParams);
    //console.log(_link);
    window.location.href = _link;
  },
  /**
   * @description 如果页面报错或出现其它不可预知错误,页面重定向至统一错误页面
   */
  siteError: function () {
    console.log('缺失mark_src参数或其它不可知因素');
    // window.location.href = 'error_prompt.html';
    window.location.href = 'http://m.zhaoyl.com/activity/20170209/dist/html/index.html?zt=' + new Date().getTime();
    return;
  },
  /**
   * @description 强制返回
   * 因为微信的webview有缓存,所以强制监听所有返回事件,并且在url后面强制带上时间戳参数
   */
  focusBack: function () {
    // if (window.history && window.history.pushState) {
    //     $(window).on('popstate', function () {
    //         let _urlP = Base.getUrlPrmt();
    //         _urlP['t'] = new Date().getTime();
    //         history.back();
    //     });
    //     let _pageName = window.location.href.split('?')[0].split('/html/')[1].replace('.html', '');
    //     let _uP = Base.getUrlPrmt();
    //     _uP['pageName'] = _pageName;
    //
    //     // console.log(_uP);
    //     window.history.pushState('zyl-' + new Date().getTime(), null, window.location.href.split('?')[0] + '?' + Base.setUrlPrmt(_uP));
    // }
  },
  /**``
   * @description 分辨url上有无id,进行获取token,再进行校验是否合法
   * @param ID 后台返回id
   * @param R 后台返回随机数
   * @returns {Promise}
   */
  checkOpenId: function (ID, R) {
    return new Promise(function (resolve, reject) {
      if (!ID) {
        // alert(window.location.href);
        Base.jumpTo('https://open.weixin.qq.com/connect/oauth2/authorize', {
          appid: WXhttp.appId,
          redirect_uri: window.encodeURIComponent(WXhttp.checkOpenId + '?targetUrl=' + window.encodeURIComponent(window.location.href)),
          response_type: 'code',
          scope: 'snsapi_base',
          state: '123#wechat_redirect'
        }, false);
      } else {//校验
        resolve();
      }
    });
  },
  /**
   * @description 获取微信授权
   */
  getWxAuthor: function (options) {
    // let _options = options || {} ;
    //wx分享接口
    return new Promise(function (resolve, reject) {
      try {
        $.ajax({
          url: WXhttp.getWxAuthor + '?url=' + encodeURIComponent(location.href.split('#')[0]),
          success: function (res) {
            res = JSON.parse(res);
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res['appId'], // 必填，公众号的唯一标识
              timestamp: res['timestamp'], // 必填，生成签名的时间戳
              nonceStr: res['nonceStr'], // 必填，生成签名的随机串
              signature: res['signature'],// 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu', 'chooseImage', 'previewImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
              // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
              // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
              // 则可以直接调用，不需要放在ready函数中。
              // console.log('wx ready');
              //“分享给朋友”
              resolve();
            });
            wx.error(function (res) {
              // config信息验证失败会执行error函数，如签名过期导致验证失败，
              // 具体错误信息可以打开config的debug模式查看，
              // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              reject(res);
            });
          },
          error: function () {
            reject('ajax error');
          }
        });
      } catch (e) {
        console.log('wx error');
        reject('wxConfig error');
      }
    });
  }
};
//export default Base;
export {Base};
// module.exports=Base;