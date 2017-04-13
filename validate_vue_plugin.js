require("./validate_vue_plugin.scss");
let Validate = {};
Validate.install = function (Vue, option) {
    Vue.prototype.$Validate = function (op = {}) {
        if(op.constructor !== Object){
            console.error('Vue.$Validate 参数传入格式错误')
        }
        let args,method,timer;
        args = Object.assign({
            obj: '',//一个inputContent对象
            rules: {},//一个规则对象
            message: {},//一个提示文案对象
            duration:2000,//错误提示显示时间
            fn: null
        },op);
        method = {
            required: function (val) {
                return val.replace(/(^\s*)|(\s*$)/g, "") != '';
            },
            isPhone: function (val) {
                let result =/^1[0-9]{10}$/.test(val);
                if(val == ''){
                    result = true;
                }
                return result;
            },
            isNum: function (val) {
                let result = /^[0-9]\d*$/.test(val);
                if (val == '') {
                    result = true;
                }
                return result;
            },
            isNumAndFloat: function (val) {
                let result = /^[1-9]\d*$|0\.\d*$|^[1-9]\d*\.\d*$/.test(val);
                if (val == '') {
                    result = true;
                }
                return result;
            },
            showMsg: function (msg = '验证脚本使用错误') {
                if (document.getElementsByClassName('vue-toast').length) {
                    // 如果toast还在，则不再执行
                    return;
                }
                timer = null;
                let toastTpl = Vue.extend({// 模板添加位置类
                    template: `
                            <div class="vue-toast toast-top" style="animation: inMessage .3s linear forwards">
                                ${msg}
                            </div>
                        `
                });
                let tpl = new toastTpl().$mount().$el;// 创建实例，挂载到文档以后的地方
                document.body.appendChild(tpl);// 把创建的实例添加到body中
                timer = setTimeout(() => {// 延迟2秒后移除该提示
                    tpl.setAttribute('style','animation: outMessage .1s linear forwards');
                    setTimeout(()=>{
                        document.body.removeChild(tpl);
                    },500)
                }, args.duration);
            }
        };
        function startValidate() {
            let _rules = args.rules,
                _msg = args.message,
                _obj = args.obj;
            for (let _inputName in _rules) {
                let _val = _obj[_inputName] ? _obj[_inputName] : '';//若val为null则为''
                for (let singleRule in _rules[_inputName]) {
                    if (_rules[_inputName][singleRule] != true) {//是否进行验证
                        continue;
                    }
                    //验证返回true/false
                    if (method[singleRule](_val)) {//true
                        continue;
                    } else {
                        method.showMsg(_msg[_inputName][singleRule]);
                        return false;
                    }
                }
            }
            return true;
        }
        //启动验证
        // 方式一 利用callback
        // if(startValidate()){
        //     if (typeof args.fn === 'function') {
        //         args.fn.bind(this)();
        //     }
        // }
        // 方式二 promise
        return new Promise((resolve,reject)=>{
            // if (typeof args.fn === 'function') {
            //      args.fn.bind(this)(); 验证前执行的方法
            // }
            if(startValidate()){
                resolve();
            }else{
                reject();
            }
        })

    }
}
export default Validate