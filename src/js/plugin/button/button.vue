<template>
    <button @click="rippleClick" class="__my-buttonUiKit"
            :class="{
                [size]:size,
              'disabled':disabled,
                [type]:type,
                'fullWidth':fullWidth
            }"
            :disabled="disabled">
        <slot></slot>
        <span class="__my-ripple" :class="{'animate': ripple_button.animate}" :style="ripple_button.style"></span>
    </button>
</template>
<script>
  export default {
    name: 'my-button',
    data () {
      return {
        ripple_button: {
          animate: false,
          toggle: false,
          style: null
        }
      }
    },
    props: {
      size: {
        type: String,//large small mini
        default: 'small',
        validator(val){
          if (val === 'large' || val === 'small' || val === 'mini') {
            return val;
          }
        }
      },
      type: {
        type: String,//success warning danger info
        validator(val){
          if (val === 'success' || val === 'warning' || val === 'danger' || val === 'info') {
            return val;
          }
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fullWidth: Boolean,
    },
    methods: {
      rippleClick (e) {
        if (this.ripple_button.animate || this.disabled) return;
        let button = e.target;
        if (button.classList[0] === '__my-buttonUiKit') {
          let d = Math.max(button.offsetHeight, button.offsetWidth),
              x = (e.layerX - d / 2  ) + 'px',
              y = (e.layerY - d / 2 ) + 'px';
          this.ripple_button.style = {
            height: d + 'px',
            width: d + 'px',
            top: y,
            left: x,
          }
          this.ripple_button.animate = true;
          this.$nextTick(() => {
            setTimeout(() => {
              this.ripple_button.animate = false;
              this.$emit('click');
            }, 300);
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../sass/variable";
    @import "../sass/function";


    .__my-buttonUiKit {
        // 谷歌内核浏览器 移动端点击会有蓝色背景
        -webkit-tap-highlight-color:rgba(255,0,0,0);
        border: none;
        outline: none;
        border-radius: 2px;

        position: relative;
        text-transform: uppercase;
        overflow: hidden;
        will-change: box-shadow, transform;
        transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
        }
        /*default*/
        padding-left: rem(60);
        padding-right: rem(60);
        height: rem(64);
        font-size: rem(26);
        &:hover {
            opacity: .85;
        }
        /*size*/
        &.large {
            /*width: rem(212);*/
            padding-left: rem(78);
            padding-right: rem(78);
            height: rem(72);
            font-size: rem(28);
        }
        &.small {
            /*width: rem(172);*/
            padding-left: rem(60);
            padding-right: rem(60);
            height: rem(64);
            font-size: rem(26);
        }
        &.mini {
            /*width: rem(144);*/
            padding-left: rem(48);
            padding-right: rem(48);
            height: rem(36);
            font-size: rem(24);
        }
        &.fullWidth {
            width: 100%;
        }
        /*bgc color*/
        /*background-color: #3f51b5;*/
        /*color: #fff;*/
        background-color: #fff;
        color: $defaultColor;
        &.success {
            background-color: $successColor;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
            &:hover {
                background-color: $successHoverColor;
            }
        }
        &.warning {
            background-color: $warningColor;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
            &:hover {
                background-color: $warningHoverColor;
            }
        }
        &.danger {
            background-color: $dangerColor;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
            &:hover {
                background-color: $dangerHoverColor;
            }
        }
        &.info {
            background-color: $infoColor;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
            &:hover {
                background-color: $infoHoverColor;
            }
        }
        &.disabled {
            opacity: .45;
            cursor: not-allowed;
        }
    }

    .__my-ripple {
        display: block;
        position: absolute;
        z-index: 10;
        background: hsla(0, 0%, 65%, 0.66);
        border-radius: 100%;
        transform: scale(0);
        &.animate {
            animation: __my-button_ripple .3s linear;
        }
    }

    @keyframes __my-button_ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
</style>