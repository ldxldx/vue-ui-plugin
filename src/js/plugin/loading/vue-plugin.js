require('./vue-plugin.scss');
const $loadingTemplate = `
    <div class="msg-item in" v-if="show">
        <div class="msg-block">
            <div class="msg-con">{{text}}</div>
            <div class="msg-btn-item">
                <div class="confirm" @click="confirm">确定</div>
                <div class="cancel" @click="cancel">取消</div>
            </div>
        </div>
    </div>
`;
const plugin = {
    install  (Vue, option) {
        Vue.prototype.$loading = (op = {
                                      text: '',
                                      confirm(){

                                      },
                                      cancel(){

                                      }
                                  }) => {
            // 创建实例，挂载到文档以后的地方
            let vueTem = Vue.extend({// 模板添加位置类
                data(){
                    return {
                        text:op.text || '',
                        show:true
                    }
                },
                template: $loadingTemplate,
                methods:{
                    confirm(){
                        op.confirm && typeof op.confirm === 'function' && op.confirm();
                        this.show = false;
                    },
                    cancel(){
                        op.cancel && typeof op.cancel === 'function' && op.cancel();
                        this.show = false;
                    }
                }
            });


            let element = document.getElementsByClassName('content')[0];

            let tpl = new vueTem().$mount().$el;
            //把创建的实例添加到相应的元素 一般会选body 因用sui 所以选用content
            element.appendChild(tpl);
        }
    }
};
export default plugin ;