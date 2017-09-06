import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
    el:'#app',
    template:`<div>
           <my-button type="success"><span>按钮</span></my-button>  
    </div>`,
    data:{

    },
    mounted(){

    },
    components:{},
    methods:{}
});