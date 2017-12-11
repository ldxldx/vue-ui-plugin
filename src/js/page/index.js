require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <my-picker label="日期" v-model="data" maxDate="2016-08-23" minDate="2016-08-10"></my-picker>
        <my-input
        v-model="test"
        label="找原料"
        placeholder="请输入域名">
        <template slot="before">Http://</template>
        <template slot="after">zhaoyl.com</template>
    </my-input>
    </div>`,
  data: {
    data:new Date('2016-08-22').getTime(),
    test:null,
  },
});