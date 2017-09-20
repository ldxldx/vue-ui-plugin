require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <my-select label="这是个下拉框" v-model="radio" :options="options" placeholder="请点击选择"></my-select>
        <my-input label="input"></my-input>
    </div>`,
  data: {
    radio:'选项1',
    options:[{
      label:'选项1',
      value:1,
    },'选项2','选项3','选项4',],
  },
  methods: {

  }
});