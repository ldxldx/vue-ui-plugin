require('../../sass/common/com.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
    el:'#app',
    template:`<div>
        <my-checkbox>多选框</my-checkbox>
        
    </div>`,
    data:{
        test:null
    },
    mounted(){

    },
    components:{},
    methods:{}
});