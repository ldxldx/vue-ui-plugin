# validate-vue
  
>基于 es6 简单的vue-validate用户输入验证插件

###使用方式：
  
webpack / babel / vue 的安装使用略过
  
全局引入  

        import Validate from '[path] validate_vue_plugin'
        Vue.use(Validate);  
    
在vue实例/组件中直接调用 

        this.$validate(options) // return Promise
    
options 为  

        {
            form: '',//一个inputContent对象
            rules: {},//一个规则对象
            message: {},//一个提示文案对象
            duration:2000,//错误提示显示时间
        }
        
eg:  

        const vm = new Vue({
            el:'#App'
            data:{
                form:{
                    moblie:156123456
                }
            },
            methods:{
                submit(){
                    this.$validate({
                        form:this.form,
                        rules:{
                            moblie:{
                                isPhone:true
                            }
                        },
                        message:{
                            moblie:{
                                isPhone:‘请输入正确的电话号码’
                            }
                        },
                        duration:2000//ms 默认2000
                    }).then(()=>{
                    
                        /* After the success of something to do */
                        
                    }).catch(()=>{
                    
                        /* error */
                    
                    })
                }
            }
        
        })
        
##就是这么简单！！