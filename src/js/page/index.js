import Vue from 'vue';
import lComponent from '../plugin/components';
Vue.use(lComponent);
const APP = new Vue({
    el:'#app',
    template:`<div>
           <l-button type="success"><span>按钮</span></l-button>  
    </div>`,
    data:{

    },
    mounted(){

    },
    components:{},
    methods:{}
});