<template>
        <div class="__my-selectUiKit"
             :class="{
                    'focus':focus,
                    'disabled':disabled
                 }"
             @touchstart="handleTouchStart">
            <label class="__my-select-label">
                <span v-if="required" class="required">*</span>
                {{label}}
                    <span class="placeholder">{{placeholder}}</span>
            </label>
            <select
                    :name="name"
                    :autofocus="autofocus"
                    :disabled="disabled"
                    :value="value"
                    :required="required"
                    :multiple="multiple"
                    :size="size"
                    class="__my-select-select"
                    :class="{appearance:$slots.after}"
                    @input="handleInput"
                    @change="handleChange"
                    @blur="handleBlur"
                    >
                <option v-for="(item,index) in options"
                        :value="optionValue(index)"
                        :label="item.label"
                        :disabled="item.disabled">
                    {{item.label?item.label:item}}
                </option>
            </select>
            <div class="__my-select-select_after" v-if="focus && $slots.after">
                <slot name="after"></slot>
            </div>
            <span class="__my-line"
                  :class="[ripple_select.animate]"></span>
        </div>
</template>
<script>
  export default {
    name: 'my-select',
    data(){
      return {
        focus: false,
        ripple_select: {
          animate: null,
        }
      }
    },
    mounted(){
      ( this.autofocus ) && (this.focus = true, this.ripple_select.animate = 'lineIn');
    },
    props: {
      value: [String, Number],//原生
      name: [String, Number],//[原生]定义 select 元素的名称
      autofocus: Boolean,//[原生]
      multiple:Boolean,//[原生]
      size:Number,//[原生]
      label: [String, Number],
      placeholder: [String, Number],
      required: Boolean,
      disabled: Boolean,
      clearable:Boolean,//清空已选项
      options:{
        type: Array,
        required:true
      }
    },
    computed: {
      placeholderText(){
        if (this.focus) {
          return this.placeholder
        }
      },
    },
    methods: {
      optionValue(index){
        if ( this.options[index].value ) return this.options[index].value;
        return this.options[index]
      },
      handleTouchStart(event){
        if (this.disabled) return;
        this.ripple_select.animate = 'lineIn';
        this.focus = true;
      },
      handleInput(event){
        const value = event.target.value;
        this.$emit('input', value);
        this.setFocus(value);
      },
      handleChange(event){
        const value = event.target.value;
        this.$emit('change', value);
        this.setFocus(value);
      },
      handleBlur(){
        const value = event.target.value;
        this.$emit('blur', value);
        this.setFocus(value);
      },
      setFocus(value){
        if (!value || value.trim() === '') {
          this.focus = false;
        }
        this.ripple_select.animate = 'lineOut';
      },
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/variable";
    @import "../sass/function";
    .__my-selectUiKit {
        height: rem(104);
        margin: rem(38) 0 rem(10);
        position: relative;
        display: flex;
        align-items: center;
        .__my-select-label {
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
        .__my-select-select {
            width: 100%;
            height: rem(72);
            outline: none;
            background-color: transparent;
            border: none;
            display: block;
            font-size: rem(32);
            line-height: rem(40);
            padding: rem(16) 0 rem(10) rem(5);
            &::-webkit-select-placeholder {
                color: rgba(0, 0, 0, .38);
            }
            opacity: 0;
            &.appearance{
                appearance:none;
                -webkit-appearance:none;
            }
            /*background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;*/
        }
        .__my-select-select_before, .__my-select-select_after {
            height: rem(72);
            font-size: rem(32);
            display: flex;
            align-items: center;
            color: #97a8be;
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
            .__my-select-select {
                opacity: 1;
            }
            .__my-select-label {
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
            .__my-select-label {
                span {
                    color: #bbb;
                }
            }
        }
    }
</style>