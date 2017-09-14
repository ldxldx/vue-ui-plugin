require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
import draggable from 'vuedraggable';
Vue.component('blockComponent',{
  template:`
    <div class="blockComponent">
      <div v-for="(item,index) in children" :key="item.id" class="children_item" 
          :data-leave="item.leave" 
          :data-id="item.id" 
          @dragstart="dragstart" 
          @dragend="dragend" 
          @dragover="dragover"
          @dragenter="dragenter"
          @dragleave="dragleave"
          @drop="drop"
          draggable="true">
          <div class="label" :class="{'aims':aimsTargetId===item.id&&aimsTargetType==='switch'}" @click="click(item)">
            <div>{{item.label}}</div>
          </div>
          <div class="children_block" draggable="true" :class="{'aims':aimsTargetId===item.id&&aimsTargetType==='append'}">
              <blockComponent v-if="item.children" 
              :children="item.children" 
              :aimsTargetId="aimsTargetId"
              :aimsTargetType="aimsTargetType"
                @click="click" 
                @dragstart="dragstart" 
                @dragend="dragend" 
                @dragover="dragover" 
                @dragenter="dragenter"
                @dragleave="dragleave"
                @drop="drop"></blockComponent>
          </div>
      </div>
    </div>
  `,
  components:{
    draggable
  },
  props:['children','aimsTargetId','aimsTargetType'],
  methods:{
    click(item){
      this.$emit('click',item)
    },
    dragstart(event){
      this.$emit('dragstart',event);
    },
    dragend(event){
      this.$emit('dragend',event);
    },
    dragover(event){
      this.$emit('dragover',event);
    },
    dragenter(event){
      this.$emit('dragenter',event);
    },
    dragleave(event){
      this.$emit('dragleave',event);
    },
    drop(event){
      this.$emit('drop',event);
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
            <blockComponent 
            :children="view" 
            :aimsTargetId="aimsTarget.id" 
            :aimsTargetType="aimsTarget.type" 
            @click="handelClick" 
            @dragstart="dragstart" 
            @dragend="dragend" 
            @dragover="dragover" 
            @dragenter="dragenter" 
            @dragleave="dragleave" 
            @drop="drop"></blockComponent>
        </div>
    </div>`,
  data: {
    test1: true,
    test2: true,
    test3: true,
    group: ['多选框2'],
    view:[
      {
        id:1,
        label:'一级',
        leave:1,
        children:[
          {
            id:21,
            label:'二级1',
            leave:2,
            children:[
              {
                id:31,
                label:'三级1',
                leave:3,
              },
              {
                id:32,
                label:'三级2',
                leave:3,
                children:[
                  {
                    id:41,
                    label:'四级1',
                    leave:4,
                  },
                  {
                    id:42,
                    label:'四级2',
                    leave:4,
                  },
                  {
                    id:43,
                    label:'四级3',
                    leave:4,
                  }
                ]
              },
              {
                id:33,
                label:'三级3',
                leave:3,
                children:[
                  {
                    id:44,
                    label:'四级4',
                    leave:4,
                  },
                  {
                    id:45,
                    label:'四级5',
                    leave:4,
                  },
                  {
                    id:46,
                    label:'四级6',
                    leave:4,
                  }
                ]
              }
            ]
          },
          {
            id:22,
            label:'二级2',
            leave:2,
          },
          {
            id:23,
            label:'二级3',
            leave:2,
          }
        ]
      }
    ],
    warehouse:{},//储存所有数据的扁平式仓库
    dragStartStatus:false,//正在拖拽的状态
    dragDropStatus:false,//正在放置的状态
    eleDrag:null,//被拖拽元素信息
    aimsDrag:null,//目标元素信息
    aimsTarget:{
      id:null,
      className:null,
      type:null//append switch
    },//目标元素 label/children
  },
  mounted(){
    this.setWarehouse(this.view,0);
  },
  methods: {
    handelClick(item){
      console.log(item)
    },
    /**
     * 拖拽开始
     * @param event
     * @return {boolean}
     */
    dragstart(event){
      if (this.dragStatus) {
        return false
      };
      this.dragStatus = true;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text", event.target.innerHTML);
      //设置在拖动过程中显示的图片 params: 显示的元素(必须是element)，x的偏移量，y的偏移量
      event.dataTransfer.setDragImage(event.target, event.target.clientWidth / 2, 0);
      //储存被拖拽元素信息
      this.eleDrag = {
        leave: Number(event.target.dataset.leave),
        id: Number(event.target.dataset.id),
      }
      return true;
    },
    /**
     * 拖拽结束
     * @param event
     * @return {boolean}
     */
    dragend(event){
      this.dragStatus = false;
      this.dragDropStatus = false;
      this.aimsTarget = {
        id:null,
        type:null,
        className:null,
      };
      //清除此次拖拽的所有数据
      return false;
    },
    /**
     * 作为目标元素
     * 拖拽元素在目标元素头上移动
     * @param event
     */
    dragover(event){
      //无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式
      //否则无法触发drop事件
      event.preventDefault();
      return true;
    },
    /**
     * 拖拽时移入目标元素时触发
     * @param event
     * @return {boolean}
     */
    dragenter(event){
      event.preventDefault();
      //可以做一些动画之类的东西
      let _target = event.target,_parent = event.target;
      //判断拖拽元素与目标元素是否是同一个
      if (_target.classList[0] === 'label' || _target.classList[0] === 'children_block'){
        _parent = _target.parentNode;
        this.aimsTarget.className = _target.classList[0];
      } else {
        this.dragDropStatus = true;
        this.aimsTarget.id = null;
        this.aimsTarget.type = null;
        return false;
      }
      if (Number(_parent.dataset.id) === this.eleDrag.id) {
        //阻止drop触发
        this.dragDropStatus = true;
        return false
      } else {
        this.dragDropStatus = false;
      }
      this.aimsTarget.id = Number(_parent.dataset.id);
      if (Number(_parent.dataset.leave) === this.eleDrag.leave ) {//同级 只能移到label
        //调换位置 放大label 改变label的背景颜色
        if (this.aimsTarget.className === 'label') this.aimsTarget.type = 'switch';
        //被拖拽作为目标的子集 放大children_block 改变children_block的背景颜色
        if (this.aimsTarget.className === 'children_block') this.aimsTarget.type = 'append';
      } else if ( this.eleDrag.leave > Number(_parent.dataset.leave) && this.aimsTarget.className === 'children_block'){//低到高 只能移动children_block
        //被拖拽作为目标的子集 放大children_block 改变children_block的背景颜色
        if(this.warehouse[Number(_parent.dataset.id)].children){
          //被拖拽为目标子一级元素
          // let _single = this.warehouse[Number(_parent.dataset.id)].children.filter(val=>{return val.id === this.eleDrag.id})
          // if (_single.length > 0) {
          //   this.aimsTarget.type = null;
          //   return false;
          // }
        }
        this.aimsTarget.type = 'append';
      } else if (this.eleDrag.leave < Number(_parent.dataset.leave) && this.aimsTarget.className === 'children_block'){//高到低 非包含 只能移动children_block
        //被拖拽不包含目标
        if (!this.have(this.warehouse[this.eleDrag.id],{id:Number(_parent.dataset.id),leave:Number(_parent.dataset.leave)})){
          this.aimsTarget.type = 'append';
        }
      }
      return true;
    },
    /**
     * 拖拽时移出目标元素时触发
     * @param event
     */
    dragleave(event){
      event.preventDefault();
      if (!(this.aimsTarget.className === 'label' || this.aimsTarget.className === 'children_block')){
        this.aimsTarget.type = null;
      }
      return true;
    },
    /**
     * 作为目标元素
     * 拖拽元素进入目标元素头上，同时鼠标松开的时候
     * @param event
     */
    drop(event){
      if (this.dragDropStatus) {
        return false
      }
      this.dragDropStatus = true;
      let _target = event.target.parentNode;
      //记录目标元素信息 即event
      this.aimsDrag = {
        leave: Number(_target.dataset.leave),
        id: Number(_target.dataset.id),
      }
      //处理
      // this.reset();
      return true;
    },
    /**
     * 交换位置
     */
    reset(){
      // 替换(携带子集) 互换(不携带子集) 作为子集
      let min,max,status,have = false,target = this.aimsTarget === 'label',view = this.view;
      if ( this.eleDrag.leave === this.aimsDrag.leave) {//同级
        //替换
        status = 0;// 0 同级
        max = this.aimsDrag;
        min = this.eleDrag;
      } else if (this.eleDrag.leave > this.aimsDrag.leave){//不同级 max min 赋值 1 低->高
        status = 1;
        max = this.aimsDrag;
        min = this.eleDrag;
        //判断是否包含关系
        have = this.have(max,min);
      } else { //2 高->低
        status = 2;
        max = this.eleDrag;
        min = this.aimsDrag;
        //判断是否包含关系
        have = this.have(max,min);
      }
      let loop = (val,cb)=> {
        for (let i = 0; i < val.length; i++) {
          if (val[i].leave === max.leave) {

          } else if (val[i].children && val[i].children.length > 0){
            loop(val[i].children);
          }
        }
      }
      loop(this.view)
    },
    /**
     * 二维化
     * @param val
     */
    setWarehouse(val,lineNo){
      for (let i=0;i<val.length;i++){
        this.warehouse[val[i].id] = val[i];
        this.$set(this.warehouse[val[i].id],'leaveLine',`${lineNo}_${i}`)
        if (val[i].children && val[i].children instanceof Array && val[i].children.length > 0) {
          this.setWarehouse(val[i].children,`${lineNo}_${i}`);
        }
      }
    },
    /**
     * 判断max是否包含min
     * @param max
     * @param min
     * @return {boolean}
     */
    have(max,min){
      let have = false, _max = this.warehouse[max.id],
        loop = (child)=>{
        for (let i=0;i < child.length;i++){
          if ( child[i].leave === min.leave && child[i].id === min.id) {
            have = true;
          }
          if ( have ){
            return true;
          }
          if ( child[i].children && child[i].children instanceof Array && child[i].children.length > 0) {
            loop(child[i].children)
          }
        }
      };
      if ( _max.children && _max.children instanceof Array && _max.children.length > 0) {
        return loop(_max.children);
      } else {
        return false;
      }
    }
  }
});