require('../../sass/common/com.scss');
require('../../sass/page/index.scss');

import Vue from 'vue';
import MyUikit from '../plugin/MyUikit';
Vue.use(MyUikit);
import draggable from 'vuedraggable';
Vue.component('blockComponent', {
  template: `
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
  components: {
    draggable
  },
  props: ['children', 'aimsTargetId', 'aimsTargetType'],
  methods: {
    click(item){
      this.$emit('click', item)
    },
    dragstart(event){
      this.$emit('dragstart', event);
    },
    dragend(event){
      this.$emit('dragend', event);
    },
    dragover(event){
      this.$emit('dragover', event);
    },
    dragenter(event){
      this.$emit('dragenter', event);
    },
    dragleave(event){
      this.$emit('dragleave', event);
    },
    drop(event){
      this.$emit('drop', event);
    }
  }
});
const APP = new Vue({
  el: '#app',
  template: `<div class="container">
        <!--<div class="view" id="view">-->
            <!--<blockComponent -->
            <!--:children="view" -->
            <!--:aimsTargetId="aimsTarget.id" -->
            <!--:aimsTargetType="aimsTarget.type" -->
            <!--@click="handelClick" -->
            <!--@dragstart="dragstart" -->
            <!--@dragend="dragend" -->
            <!--@dragover="dragover" -->
            <!--@dragenter="dragenter" -->
            <!--@dragleave="dragleave" -->
            <!--@drop="drop"></blockComponent>-->
            <!--<canvas id="canvas"></canvas>-->
        <!--</div>-->
    </div>`,
  data: {
    view: [
      {
        id: 1,
        label: '一级',
        leave: 1,
        children: [
          {
            id: 21,
            label: '二级1',
            leave: 2,
            children: [
              {
                id: 31,
                label: '三级1',
                leave: 3,
              },
              {
                id: 32,
                label: '三级2',
                leave: 3,
                children: [
                  {
                    id: 41,
                    label: '四级1',
                    leave: 4,
                  },
                  {
                    id: 42,
                    label: '四级2',
                    leave: 4,
                  },
                  {
                    id: 43,
                    label: '四级3',
                    leave: 4,
                  }
                ]
              },
              {
                id: 33,
                label: '三级3',
                leave: 3,
                children: [
                  {
                    id: 44,
                    label: '四级4',
                    leave: 4,
                  },
                  {
                    id: 45,
                    label: '四级5',
                    leave: 4,
                  },
                  {
                    id: 46,
                    label: '四级6',
                    leave: 4,
                  }
                ]
              }
            ]
          },
          {
            id: 22,
            label: '二级2',
            leave: 2,
          },
          {
            id: 23,
            label: '二级3',
            leave: 2,
          }
        ]
      }
    ],
    warehouse: {},//储存所有数据的二维仓库
    domWarehouse: {},//储存所有dom的二维仓库
    dragStartStatus: false,//正在拖拽的状态
    dragDropStatus: false,//正在放置的状态
    eleDrag: null,//被拖拽元素信息
    aimsDrag: null,//目标元素信息
    aimsTarget: {
      id: null,
      className: null,
      type: null//append switch
    },//目标元素的信息
    situation: null,// 0-互换 1-被拖拽元素作为目标元素的child
  },
  mounted(){
    // this.setWarehouse(JSON.parse(JSON.stringify(this.view)), 0);
    // this.setCanvas();
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
      //节流
      if (this.dragStatus) {
        return false
      }
      ;
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
      //清除此次拖拽的所有数据
      this.dragStatus = false;
      this.dragDropStatus = false;
      this.aimsTarget = {
        id: null,
        type: null,
        className: null,
      };
      this.situation = null;
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
      let _target = event.target, _parent = event.target;
      //判断拖拽元素与目标元素是否是同一个
      if (_target.classList[0] === 'label' || _target.classList[0] === 'children_block') {
        _parent = _target.parentNode;
        this.aimsTarget.className = _target.classList[0];
      } else {//如不是label/children_block 则不执行以下逻辑以及不触发drop
        this.dragDropStatus = true;
        this.situation = null;
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
      if (Number(_parent.dataset.leave) === this.eleDrag.leave) {//同级
        //调换位置 放大label 改变label的背景颜色
        if (this.aimsTarget.className === 'label') {
          this.aimsTarget.type = 'switch';
          this.situation = 0;
        } else if (this.aimsTarget.className === 'children_block') {
          this.situation = 1;
          this.aimsTarget.type = 'append';//被拖拽作为目标的子集 放大children_block 改变children_block的背景颜色
        }
      } else if (this.eleDrag.leave > Number(_parent.dataset.leave) && this.aimsTarget.className === 'children_block') {//低到高 只能移动children_block
        //被拖拽作为目标的子集 放大children_block 改变children_block的背景颜色
        if (this.warehouse[Number(_parent.dataset.id)].children) {
          //被拖拽为目标子一级元素
          let _single = this.warehouse[Number(_parent.dataset.id)].children.filter(val => {
            return val.id === this.eleDrag.id
          })
          if (_single.length > 0) {
            this.aimsTarget.type = null;
            return false;
          }
        }
        this.situation = 1;
        this.aimsTarget.type = 'append';
      } else if (this.eleDrag.leave < Number(_parent.dataset.leave) && this.aimsTarget.className === 'children_block') {//高到低 非包含 只能移动children_block
        //被拖拽不包含目标
        if (!this.have(this.warehouse[this.eleDrag.id], {
            id: Number(_parent.dataset.id),
            leave: Number(_parent.dataset.leave)
          })) {
          this.aimsTarget.type = 'append';
          this.situation = 1;
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
      if (!(this.aimsTarget.className === 'label' || this.aimsTarget.className === 'children_block')) {
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
      //节流
      if (this.dragDropStatus) {
        return false
      }
      this.dragDropStatus = true;
      //target为label/children_block 信息都在其父元素上
      let _target = event.target.parentNode;
      //记录目标元素信息 即event
      this.aimsDrag = {
        leave: Number(_target.dataset.leave),
        id: Number(_target.dataset.id),
      }
      //处理
      this.setLocal();
      return true;
    },
    /**
     * 递归找到aimsDrag/eleDrag 进行交换/插入/删除
     */
    setLocal(){
      /**
       * @param child
       * @param cb
       */
      let loop = (child, cb) => {
        for (let i = 0; i < child.length; i++) {
          if (this.situation === 0) {//同级 互换
            //分别找到目标元素、被拖拽元素 然后进行互换位置
            if (child[i].leave === this.aimsDrag.leave) {
              if (child[i].id === this.aimsDrag.id) {
                child[i] = Object.assign(this.warehouse[this.eleDrag.id], {
                  leave: child[i].leave
                });
              } else if (child[i].id === this.eleDrag.id) {
                child[i] = Object.assign(this.warehouse[this.aimsDrag.id], {
                  leave: child[i].leave
                });
              }
            }
          } else if (this.situation === 1 || this.situation === 2) {//低到高 高到低
            //先将被拖拽元素加入到目标元素的children
            //然后删除被拖拽元素的数据
            if (child[i].leave === this.aimsDrag.leave && child[i].id === this.aimsDrag.id) {
              //将aimsDrag.children.push(eleDrag)
              if (!child[i].children) {
                this.$set(child[i], 'children', [])
              }
              child[i].children.push(Object.assign(this.warehouse[this.eleDrag.id], {
                leave: child[i].leave + 1
              }));
              // delete eleDrag
              //找到eleDrag parent 删除eleDrag
              let leaveArr = this.warehouse[this.eleDrag.id].leaveLine.split('_');
              let _view = this.view;
              for (let k = 1; k < leaveArr.length; k++) {
                if (k === 1) {
                  _view = _view[leaveArr[k]]
                } else if (k <= leaveArr.length - 2) {
                  _view = _view.children[leaveArr[k]]
                }
              }
              _view.children.splice(Number(leaveArr[leaveArr.length - 1]), 1)
            }
          }
          if (child[i] && child[i].children && child[i].children instanceof Array && child[i].children.length > 0) {
            loop(child[i].children)
          }
        }
        cb && cb();
      }
      loop(this.view, () => {//处理完毕后重排仓库
        this.setWarehouse(JSON.parse(JSON.stringify(this.view)), 0);
        //canvas重排
        this.$nextTick(()=>{
          this.setCanvas();
        })
      })

    },
    setCanvas(){
      const canvas = document.getElementById('canvas');
      canvas.width = canvas.parentNode.clientWidth;
      canvas.height = canvas.parentNode.clientHeight;
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        //获取dom
        let domLabel = document.querySelectorAll('.label');
        // console.log(domLabel)
        //遍历label 拿到其父元素data-id/leave 并二维化
        for (let i = 0,_position; i < domLabel.length; i++) {
          //拿到元素的绝对位置
          _position = this.getElementPosition(domLabel[i]);
          this.domWarehouse[domLabel[i].parentNode.dataset.id] = {
            centerX: domLabel[i].clientWidth / 2 + _position.actualLeft ,//中心点x
            centerY: domLabel[i].clientHeight / 2 + _position.actualTop,//中心点y
            w: domLabel[i].clientWidth,//宽
            h: domLabel[i].clientHeight,//高
            x: _position.actualLeft,
            y: _position.actualTop,
          }
        }
        //递归view 找到一个id 就画一条线（调用move)
        let loop = (child) => {
          for (let i = 0; i < child.length; i++) {
            if (child[i].children && child[i].children.length > 0) {//有子集 遍历子集拿到id 进行连线
              child[i].children.forEach((val,index)=>{
                this.draw(ctx, this.domWarehouse[child[i].id], this.domWarehouse[val.id] , child[i].children.length , index)
              });
              loop(child[i].children);
            }
          }
        }
        loop(this.view);
      }
    },
    /**
     * 画线
     * @param ctx
     * @param start
     * @param end
     * @param length
     * @param index
     */
    draw(ctx, start, end, length, index){
      let _startX = start.centerX,
          _startY = start.y + start.h,
          _entX = end.centerX,
          _entY = end.y;
      ctx.beginPath();
      if (index === 0) {
        ctx.moveTo(_startX, _startY);//起点
      }
      //第一个和最后一个需要画
      if(index === 0 || index === length -1) {
        ctx.lineTo(_startX, _entY - (_entY - _startY)/2);//中转点1
        ctx.lineTo(_entX, _entY - (_entY - _startY)/2);//中转点2
      } else {
        ctx.moveTo(_entX, _entY - (_entY - _startY)/2);
      }
      //全部都需要画
      ctx.lineTo(_entX, _entY);
      ctx.stroke();
      ctx.closePath();
    },
    getElementPosition(element){
      let actualLeft = element.offsetLeft;
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null && current.id !== 'view') {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return {
        actualLeft,
        actualTop
      };
    },
    /**
     * 递归目标数组 将所有逐级数据二维化
     * @param val
     * @param lineNo 层级标记
     */
    setWarehouse(val, lineNo){
      for (let i = 0; i < val.length; i++) {
        this.warehouse[val[i].id] = val[i];
        this.$set(this.warehouse[val[i].id], 'leaveLine', `${lineNo}_${i}`)
        if (val[i].children && val[i].children instanceof Array && val[i].children.length > 0) {
          this.setWarehouse(val[i].children, `${lineNo}_${i}`);
        }
      }
    },
    /**
     * 判断max是否包含min
     * @param max
     * @param min
     * @return {boolean}
     */
    have(max, min){
      let have = false, _max = this.warehouse[max.id],
        loop = (child) => {
          for (let i = 0; i < child.length; i++) {
            if (child[i].leave === min.leave && child[i].id === min.id) {
              have = true;
            }
            if (have) {
              return true;
            }
            if (child[i].children && child[i].children instanceof Array && child[i].children.length > 0) {
              loop(child[i].children)
            }
          }
        };
      if (_max.children && _max.children instanceof Array && _max.children.length > 0) {
        return loop(_max.children);
      } else {
        return false;
      }
    }
  }
});