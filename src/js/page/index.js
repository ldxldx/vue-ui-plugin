require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
Vue.component('blockComponent',{
  template:`
    <div class="blockComponent">
      <div v-for="(item,index) in children" class="children_item">
          <div class="label">
            <div @click="click(item)">{{item.label}}</div>
          </div>
          <div class="children_block" v-if="item.children">
              <blockComponent :children="item.children" @click="click"></blockComponent>
          </div>
      </div>
    </div>
  `,
  props:['children'],
  methods:{
    click(item){
      this.$emit('click',item)
    }
  }
});
const APP = new Vue({
  el: '#app',
  template: `<div style="padding: 30px">
        <!--<my-checkbox-group v-model="group" :min="1" :max="2">-->
            <!--<my-checkbox label="多选框1" v-model="test1">多选框1</my-checkbox>-->
            <!--<my-checkbox label="多选框2" v-model="test2">多选框2</my-checkbox>-->
            <!--<my-checkbox label="多选框3" v-model="test3">多选框3</my-checkbox>-->
        <!--</my-checkbox-group>-->
        <div class="view">
            <blockComponent :children="view" @click="handelClick"></blockComponent>
        </div>
    </div>`,
  components:{
  },
  data: {
    test1: true,
    test2: true,
    test3: true,
    group: ['多选框2'],
    view:[
      {
        id:1,
        label:'一级',
        children:[
          {
            id:11,
            label:'二级',
            children:[
              {
                id:21,
                label:'三级',
              },
              {
                id:22,
                label:'三级',
              },
              {
                id:23,
                label:'三级',
              }
            ]
          },
          {
            id:12,
            label:'二级',
          },
          {
            id:13,
            label:'二级',
          }
        ]
      }
    ]
  },
  mounted(){

  },
  methods: {
    handelClick(item){
      console.log(item)
    }
  }
});