require('../../sass/common/com.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
    el:'#app',
    template:`<div style="padding: 30px">
        <my-checkbox-group>
            <my-checkbox label="多选框1"></my-checkbox>
            <my-checkbox label="多选框2"></my-checkbox>
            <my-checkbox label="多选框3"></my-checkbox>
        </my-checkbox-group>
       
    </div>`,
    data:{
        test1:true,
        test2:true,
        test3:true,
    },
    mounted(){

    },
    components:{},
    methods:{}
});