<template>
    <label class="__my-radioUiKit_block"
           :class="{
               'disabled':selfDisabled,
               'checked':isChecked
           }">
        <input type="radio" class="__my-radio_input"
               :id="id"
               :name="name"
               :value="isChecked"
               @click="handelClick"
               @blur="handelBlur"
               @focus="handelFocus">
        <span class="__my-radio">
            <i class="__my-radio_icon"></i>
            <span class="__my-radio__ripple" :class="{animate:ripple_radio.animate}"></span>
        </span>
        <span v-if="parent || label">{{label}}</span>
        <span v-else>
            <slot></slot>
        </span>
    </label>
</template>
<script>
  export default {
    name: 'my-radio',
    data(){
      return {
        parent: null,//是否有check-group
        ripple_radio: {
          animate: false,
        }
      }
    },
    props: {
      id: [String, Number],
      name: [String, Number],
      value: {},
      label: {},
      disabled: Boolean,
    },
    computed: {
      //检查有无group父组件
      isGroup(){
        let parent = this.$parent;
        while (parent) {
          if (parent.$options._componentTag === 'my-radio-group') {
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
        } else if (typeof this.store === 'string' || typeof this.store === 'number') {
          return this.store === this.label;
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
        if (this.selfDisabled || this.isChecked) return;
        //更新store
        if ( this.isGroup ) {
          this.parent.$emit('input',this.label)
        } else if (typeof this.store === 'boolean'){
          this.$emit('input', !this.value);
        } else {
          this.$emit('input', this.label);
        }
        this.$emit('change', e);
        //点击样式动画
        this.ripple_radio.animate = true;
        setTimeout(() => {
          this.ripple_radio.animate = false;
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

    .__my-radioUiKit_block {
        display: inline-flex;
        align-items: center;
        font-size: rem(28);
        cursor: pointer;
        position: relative;
        .__my-radio_input {
            opacity: 0;
            width: 0;
            height: 0;
            outline: none;
            position: absolute;
            z-index: -1;
        }
        .__my-radio {
            width: rem(28);
            height: rem(28);
            border: rem(3) solid rgba(0, 0, 0, .54);
            border-radius: 50%;
            margin-right: rem(10);
            position: relative;
            .__my-radio_icon {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                color: #fff;
                font-size: rem(24);
                display: flex;
                align-items: center;
                transform: scale(0);
                will-change: transform;
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    width: 30%;
                    height: 30%;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }
            .__my-radio__ripple {
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
                    animation: radio_ripple .5s cubic-bezier(.4, 0, .2, 1);
                }
            }
            @keyframes radio_ripple {
                100% {
                    opacity: 0;
                    transform: scale(3);
                }
            }
        }
        &.checked {
            .__my-radio {
                transition: border .5s linear;
                border-color: $defaultColor;
            }
            .__my-radio_icon {
                background: $defaultColor;
                transition: transform .1s linear;
                transform: scale(1.2);
            }
        }
        &.disabled {
            color: #d1dbe5;
            .__my-radio {
                border-color: #d1dbe5;
            }
            .__my-radio_icon {
                background: #d1dbe5;
            }
        }
    }
</style>