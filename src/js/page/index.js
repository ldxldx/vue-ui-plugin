require('../../sass/common/com.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
    el:'#app',
    template:`<div style="padding: 30px">
        <my-checkbox-group v-model="group" :min="1" :max="2">
            <my-checkbox label="多选框1" v-model="test1">多选框1</my-checkbox>
            <my-checkbox label="多选框2" v-model="test2">多选框2</my-checkbox>
            <my-checkbox label="多选框3" v-model="test3">多选框3</my-checkbox>
        </my-checkbox-group>
       
    </div>`,
    data:{
        test1:true,
        test2:true,
        test3:true,
        group:['多选框2'],
    },
    mounted(){

    },
    components:{},
    methods:{}
});