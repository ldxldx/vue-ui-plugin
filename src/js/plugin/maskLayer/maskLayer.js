require('./index.scss');
import Vue from 'vue';
import getZIndex from '../tools/getZIndex';//获取body子集的最大z-index
const ZINDEX = getZIndex();
class maskLayer {
  constructor (el,focus){
    this.el = el;// 当前引用VueComponent
    this.tpl = null;//组件实例
    this.maskLayer = null;//组件类
    this.init(this,el,focus);
  }
  init(_this,el,focus){
    this.maskLayer = Vue.extend({
      template:`<div class="__my-mask-layer" :style="{zIndex:zIndex}" @click="handleClick"></div>`,
      computed:{
        zIndex(){
          return ZINDEX + 1;
        }
      },
      methods:{
        handleClick(){
          el[focus] = false;
        }
      }
    });
    //创建实例并挂载到文档
    this.tpl = new this.maskLayer().$mount().$el;
    //当前VueComponent 控制状态
    if ( el[focus] ) this.add();
  }
  add(){
    if (document.querySelectorAll('.__my-mask-layer').length > 0) return false;
    document.body.appendChild(this.tpl);
    this.tpl.setAttribute('style','animation: __my-mask_animate_in .2s forwards');
  }
  less(){
    this.tpl.setAttribute('style','animation: __my-mask_animate_out .2s forwards');
    setTimeout(()=>{
      document.body.removeChild(this.tpl);
    },200);
  }
}

export default {
  data(){
    return {
      maskLayer:null,
      zIndex:ZINDEX + 2,
    }
  },
  watch:{
    focus(val){
      if (val){
        this.maskLayer.add();
      } else {
        this.maskLayer.less();
      }
    }
  },
  mounted(){
    this.maskLayer = new maskLayer(this,'focus');
  }
};