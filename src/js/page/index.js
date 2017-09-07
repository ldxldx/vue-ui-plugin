require('../../sass/common/com.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
    el:'#app',
    template:`<div>
        <my-input 
            v-model="test"
            label="姓名"
            placeholder="请输入姓名"></my-input>
            <my-input 
            v-model="test"
            label="姓名"
            placeholder="请输入姓名"></my-input>
    </div>`,
    data:{
        test:null
    },
    mounted(){

    },
    components:{},
    methods:{}
});