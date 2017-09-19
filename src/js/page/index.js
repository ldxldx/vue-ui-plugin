require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
const APP = new Vue({
  el: '#app',
  template: `<div class="container" @click.self="handelClick">
        <my-select v-model="radio" ref="select"></my-select>
        <!--<select name="ide">-->
            <!--<option value="xx"></option>-->
            <!--<option value="yy"></option>-->
            <!--<option value="kk"></option>-->
        <!--</select>-->
    </div>`,
  data: {
    radio:null
  },
  methods: {
    handelClick(){
      this.$refs.select.$emit('close');
    }
  }
});