import Vue from 'vue';
import getZIndex from '../tools/getZIndex';//获取body子集的最大z-index
class plugin {
  constructor (el,focus){
    this.el = el;
    this.tpl = null;
    this.maskLayer = null;
    this.init(this,el,focus);
  }
  init(_this,el,focus){
    this.maskLayer = Vue.extend({
      template:`<div v-if="show" class="__my-mask-layer" :style="{zIndex:zIndex}" @click="handleClick"></div>`,
      data(){
        return {
          show:true,
        }
      },
      computed:{
        zIndex(){
          return getZIndex() + 1;
        }
      },
      methods:{
        handleClick(){
          el[focus] = false;
          _this.less();
        }
      }
    });
  }
  add(){
    if (document.querySelectorAll('.__my-mask-layer').length > 0) return false;
    this.tpl = new this.maskLayer().$mount().$el;
    document.body.appendChild(this.tpl);
  }
  less(){
    document.body.removeChild(this.tpl);
  }
}

export default plugin;