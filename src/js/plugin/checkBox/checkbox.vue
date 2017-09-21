<template>
    <label class="__my-checkboxUiKit_block"
           :class="{
               'disabled':selfDisabled,
               'checked':isChecked
           }">
        <input type="checkbox" class="__my-check_input"
               :id="id"
               :name="name"
               :value="isChecked"
               @click="handelClick"
               @blur="handelBlur"
               @focus="handelFocus">
        <span class="__my-checkbox">
            <i class="__my-checkbox_icon iconfont">&#xe671;</i>
            <span class="__my-checkbox__ripple" :class="{animate:ripple_checkbox.animate}"></span>
        </span>
        <span v-if="parent">{{label}}</span>
        <span v-else>
            <slot></slot>
        </span>
    </label>
</template>
<script>
  export default {
    name: 'my-checkbox',
    data(){
      return {
        parent: null,//是否有check-group
        ripple_checkbox: {
          animate: false,
        }
      }
    },
    props: {
      id: [String, Number],
      name: [String, Number],
      value: Boolean,
      label: {},
      disabled: Boolean,
      checkColor: String,//选中后的颜色（暂时不做）
    },
    computed: {
      //检查有无group父组件
      isGroup(){
        let parent = this.$parent;
        while (parent) {
          if (parent.$options._componentTag === 'my-checkbox-group') {
            this.parent = parent;
            return true;
          } else {
            parent = parent.$parent;
          }
        }
        return false;
      },
      //组件初始化值 以为group.value为主
      isChecked(){
        if (typeof this.store === 'boolean') {
          return this.store;
        } else if (this.store instanceof Array) {
          return this.store.indexOf(this.label) !== -1;
        }
      },
      //获取 父组件value||当前value ( array || boolean )
      store(){
        return this.isGroup ? this.parent.value : this.value;
      },
      selfDisabled(){
        return this.isGroup ? this.parent.$props.allDisabled : this.disabled ;
      }
    },
    methods: {
      handelClick(e){
        if ( this.selfDisabled ) return;
        let _allowChange = false;
        //更新store
        //修改 满足父组件的min/max 满足的情况下更新value 并广播到父组件(暂未发现必须要做广播的需要，所以直接修改$parent.value)
        if ( this.isGroup ) { //val isArray
          if (this.store.indexOf(this.label) === -1) { //不存在 change true
            (this.parent.$props.max && this.store.length + 1 <= this.parent.$props.max && ( this.store.push( this.label ),_allowChange = true));
          } else { //change false
            (this.parent.$props.min && this.store.length - 1 >= this.parent.$props.min && ( this.store.splice(this.store.indexOf(this.label) , 1),_allowChange = true));
          }
        } else {
          _allowChange = true;
          this.$emit('input', !this.store);
        }
        //点击样式动画
        if (!_allowChange) return;
        this.$emit('change', e);
        this.ripple_checkbox.animate = true;
        setTimeout(() => {
          this.ripple_checkbox.animate = false;
        }, 500);
      },
      handelBlur(e){
        this.$emit('blur', e);
      },
      handelFocus(e){
        this.$emit('focus', e);
      },
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/function";
    @import "../sass/variable";

    .__my-checkboxUiKit_block {
        display: inline-flex;
        align-items: center;
        font-size: rem(28);
        cursor: pointer;
        position: relative;
        .__my-check_input {
            opacity: 0;
            width: 0;
            height: 0;
            outline: none;
            position: absolute;
            z-index: -1;
        }
        .__my-checkbox {
            width: rem(28);
            height: rem(28);
            border: rem(4) solid rgba(0, 0, 0, .54);
            margin-right: rem(10);
            position: relative;
            .__my-checkbox_icon {
                width: 100%;
                height: 100%;
                color: #fff;
                font-size: rem(24);
                display: flex;
                align-items: center;
                transform: scale(0);
                will-change: transform;
            }
            .__my-checkbox__ripple {
                background-color: $defaultColor;
                border-radius: 50%;
                position: absolute;
                transform: scale(0);
                will-change: opacity, transform;
                &.animate {
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    animation: checkbox_ripple .5s cubic-bezier(.4, 0, .2, 1);
                }
            }
            @keyframes checkbox_ripple {
                100% {
                    opacity: 0;
                    transform: scale(3);
                }
            }
        }
        &.checked {
            .__my-checkbox {
                transition: border .5s linear;
                border-color: $defaultColor;
            }
            .__my-checkbox_icon {
                background: $defaultColor;
                transition: transform .1s linear;
                transform: scale(1.2);
            }
        }
        &.disabled {
            color: #d1dbe5;
            .__my-checkbox {
                border-color: #d1dbe5;
            }
            .__my-checkbox_icon {
                background: #d1dbe5;
            }
        }
    }
</style>