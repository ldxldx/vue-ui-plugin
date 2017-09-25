require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <my-picker label="日期" v-model="data" maxDate="2016-08-23" minDate="2016-08-10"></my-picker>
    </div>`,
  data: {
    data:new Date('2016-08-22').getTime(),
  },
});