import Vue from 'vue';
import lComponent from '../plugin/components';
Vue.use(lComponent);
const APP = new Vue({
    el:'#app',
    template:`<div>
           <l-button>按钮</l-button>        
    </div>`,
    data:{

    },
    mounted(){

    },
    components:{},
    methods:{}
});