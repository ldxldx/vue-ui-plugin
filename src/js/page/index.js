require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <my-picker label="日期" v-model="data"></my-picker>

        <my-input
        v-model="test"
        label="找原料"
        placeholder="请输入域名">
          <template slot="before">Http://</template>
          <template slot="after">zhaoyl.com</template>
        </my-input>


        <my-radio-group v-model="radio">
          <my-radio label="xxx"></my-radio>
          <my-radio label="yyy"></my-radio>
          <my-radio label="kkk"></my-radio>
        </my-radio-group>

        <my-checkbox-group v-model="checkGroup" :max="2" :min="1">
            <my-checkbox label="选择1" disabled></my-checkbox>
            <my-checkbox label="选择2"></my-checkbox>
            <my-checkbox label="选择3"></my-checkbox>
        </my-checkbox-group>

        <my-select label="这是个下拉框" v-model="selected" :options="options" placeholder="请点击选择"></my-select>

        <my-button style="margin: 20px auto">submit</my-button>
    </div>`,
  data: {
    data:new Date('2016-08-22').getTime(),
    test:null,
    radio: 'xxx',
    checkGroup: [],
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    selected: ''
  },
});