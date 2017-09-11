<template>
    <label class="__my-checkboxUiKit_block"
           :class="{
               'disabled':disabled,
               'checked':currentValue
           }">
        <input type="checkbox" class="__my-check_input"
               :id="id"
               :name="name"
               :value="currentValue"
               @click="handelClick"
               @blur="handelBlur"
               @focus="handelFocus">
        <span class="__my-checkbox">
            <i class="__my-checkbox_icon iconfont">&#xe671;</i>
            <span class="__my-checkbox__ripple" :class="{animate:ripple_checkbox.animate}"></span>
        </span>
        <span v-if="parent">
            <slot></slot>
        </span>
        <span v-else>{{label}}</span>
    </label>
</template>
<script>
  export default {
    name: 'my-checkbox',
    componentName: 'my-checkbox',
    data(){
      return {
        currentValue: this.value,
        parent:null,//是否有check-group
        ripple_checkbox: {
          animate: false,
        }
      }
    },
    props: {
      id: [String, Number],
      name: [String, Number],
      value: Boolean,
      label:{},
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
      //组件初始化值
      isChecked(){
        if ( typeof this.store === 'boolean') {
          return this.store;
        } else if ( this.store instanceof Array ) {
          return this.store.indexOf(this.label) !== -1 ;
        }
      },
      //获取 父组件value||当前value
      store(){
        return this.parent?this.parent.value:this.currentValue;
      },
      //给予组件使用时 获取和修改value 时的方法
      currentProperty: {
        get(){
           return this.store()
        },
        set(){
          //修改 满足父组件的min/max 满足的情况下更新value 并广播到父组件

        }
      },
    },
    mounted(){
      console.log(this.$parent)
    },
    methods: {
      handelClick(e){
        if (this.disabled) return;
        this.currentValue = !this.currentValue;
        this.$emit('input', this.currentValue);
        this.$emit('change', this.currentValue);
        if (!this.currentValue) return;
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
      }
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
                background-color: #ff4081;
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