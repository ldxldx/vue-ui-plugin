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
    },
    /**
     * @description 字符串分隔处理
     * eg:  str = 12345678910
     *      stringSplit(str,4,',') // -> 1234,5678,910
     *      stringSplit(str,[1,2,3]) // -> 1,23,456,78910
     * @param val
     * @param rule 规则 只支持字符串或数组
     * @return {string}
     */
    stringSplit (val,rule,symbol){
        if (typeof val !== 'string') {
            throw 'function stringSplit val需为字符串';
        }
        rule = rule || [];//默认是数组
        symbol = symbol || ' ';//默认是空格
        let _valArr = val.replace(new RegExp(`\\${symbol}`,'g'),'').split(''),_snapArr = [],_snapStr = '';
        //判断param是否数组
        if(rule instanceof Array){
            for(let i=0,j=0,l=rule.length;i<l;i++){
                j+=rule[i];
                if (_valArr[j+i]){
                    _valArr.splice(j+i,0,symbol);
                }
            }
            return _valArr.join('').trim();
        }
        //判断param是否数字
        if(typeof rule === 'number'){
            for(let i=0;i<_valArr.length;i++){
                //用临时数组储存每个添加后的字符串 最后拼接
                if( i > 0 &&  i % rule === 0) {
                    _snapArr.push(_snapStr + symbol) ;
                    _snapStr = '';
                }
                _snapStr += _valArr[i];
            }
            return (_snapArr.join('') + _snapStr).trim()
        }
        return val;
    },
    /**
     * @description 添加js
     * 以config.mark 作为判断js是否存在的标记，添加到url[0]的script data-description 属性
     * @param config
     * config = {
     *  mark:'标签',
     *  url:['url1','url2',...]
     * }
     * @param cb
     */
    loadJS(config,cb){
        if ( !config.mark ) {
            throw new Error('function loadJS 需要传入 config.mark')
        }
        if ( !config.url || !config.url.instanceof === Array || !config.url[0]) {
            throw new Error('function loadJS  config.url error')
        }
        //加载
        let _body = document.querySelector('body'),
            _scripts = Array.from(document.getElementsByTagName('script')),
            isCreate = true;
        _scripts.forEach(val=>{
            if(val.dataset.description === config.mark){
                isCreate = false;
            }
        });
        if(isCreate){
            let js = document.createElement('script');
            js.setAttribute('data-description',config.mark);
            //加载
            js.src = config.url[0];
            js.onload = ()=>{
                let _frag = document.createDocumentFragment(),_js;
                config.url.forEach((val,index)=>{
                    if (index > 0) {
                        _js = document.createElement('script');
                        _js.src = val;
                        _frag.appendChild(_js);
                    }
                })
                _body.appendChild(_frag);
                cb ? cb() : null;
            };
            _body.appendChild(js);
        } else {
            cb ? cb() : null;
        }
    },
};
//export default Base;
export {Base};
// module.exports=Base;