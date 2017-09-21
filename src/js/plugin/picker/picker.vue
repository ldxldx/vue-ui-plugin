<template>
    <div class="__my-pickerUiKit">
        <div class="__my-picker-data">
            <div class="__my-picker-input"
                 :class="{
                    'focus':focus,
                    'disabled':disabled
                 }"
                 @click="handleClick">
                <label class="__my-input-label">
                    <span v-if="required" class="required">*</span>
                    {{label}}
                    <i class="__my-icon iconfont">&#xe735;</i>
                </label>
                <span class="__my-line"
                      :class="[lineAnimate]"></span>
            </div>
        </div>
        <transition name="view">
            <div class="__my-picker-content" v-if="focus" :style="{zIndex:zIndex}">
                <div class="__my-picker-date_year"></div>
                <div class="__my-picker-date_monthDay"></div>
                <div class="__my-picker-container">
                    <div class="__my-picker-date_week"></div>
                    <div class="__my-picker-date_date"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
  import maskLayer from '../maskLayer/maskLayer';
  export default {
    name: 'my-picker',

    mixins:[maskLayer],

    data(){
      return {
        focus: false,
        lineAnimate: null,
        maskLayer:null,
      }
    },
    props: {
      label: {},
      disabled: Boolean,
      required: Boolean,
    },
    watch:{
      focus(val){
        !val && (this.lineAnimate = 'lineOut');
      }
    },
    methods: {
      handleClick(){
        if (this.disabled) return;
        this.lineAnimate = 'lineIn';
        //弹出时间框
        this.focus = true;
        //根据value初始化日期/当前日期

      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/com";
    @import "../sass/variable";
    @import "../sass/function";

    .__my-pickerUiKit {
        .__my-picker-data {

        }
        .__my-picker-content {
            position: fixed;
            top: 20%;
            left: calc(50% - rem(620)/2);
            width: rem(620);
            height: rem(820);
            background-color: #fff;
            border-radius: rem(8);
            box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
        }
    }

    .__my-picker-input {
        height: rem(104);
        margin: rem(38) 0 rem(10);
        position: relative;
        display: flex;
        align-items: center;
        .__my-input-label {
            color: rgba(0, 0, 0, .38);
            cursor: text;
            font-size: rem(32);
            line-height: 1;
            position: absolute;
            transition: color, transform .3s cubic-bezier(.4, 0, .2, 1);
            left: rem(10);
            top: rem(36);
            .required {
                color: red;
            }
            .placeholder {
                font-size: rem(28);
                transition: opacity 1s linear;
                opacity: 1;
            }
        }
        .__my-icon {
            font-size: rem(32);
        }
        .__my-line {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: rem(3);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, .12);
            &::before {
                display: block;
                content: '';
                height: 100%;
                background: $defaultColor;
            }
            &.lineIn {
                &::before {
                    animation: __my-line_in .35s forwards;
                }
            }
            &.lineOut {
                &::before {
                    animation: __my-line_out .35s forwards;
                }
            }
            @keyframes __my-line_in {
                0% {
                    width: 0;
                }
                100% {
                    width: 100%;
                }
            }
            @keyframes __my-line_out {
                0% {
                    width: 100%;
                }
                100% {
                    width: 0;
                }
            }
        }
        &.focus {
            .__my-input-label {
                color: #3f51b5;
                transform: scale(.78714, .78714) translate(rem(-30), rem(-64));
            }
            .placeholder {
                opacity: 0;
                transition: opacity .1s linear;
            }
        }
        &.disabled {
            background: #eef1f6;
            color: #bbb;
            .__my-input-label {
                span {
                    color: #bbb;
                }
            }
        }
    }
    .view-enter {
        opacity: 0;
        transform: translateY(-10%);
    }
    .view-enter-active {
        transition: all .5s linear;
    }
    .view-leave-active {
        transform: translateY(-10%);
        opacity: 0;
        transition: all .3s linear;
    }
</style>