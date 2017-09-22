require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <my-picker label="请选择时间" v-model="data"></my-picker>
    </div>`,
  data: {
    data:'2016-08-24',
  },
});