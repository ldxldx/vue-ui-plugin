<template>
    <div>
        <template>
            <div class="__my-inputUiKit"
                 :class="{
                    'focus':focus,
                    'disabled':disabled
                 }"
                 @click="handleClick">
                <label class="__my-input-label">
                    <span v-if="required" class="required">*</span>
                    {{label}}
                    <span class="placeholder">{{placeholder}}</span>
                </label>
                <div class="__my-input-input_before" v-if="focus && $slots.before">
                    <slot name="before"></slot>
                </div>
                <input
                        v-if="focus"
                        class="__my-input-input"
                        v-bind="$props"
                        :value="currentValue"
                        :placeholder="placeholderText"
                        @focus="handleFocus"
                        @input="handleInput"
                        @change="handleChange"
                        @blur="handleBlur"/>
                <div class="__my-input-input_after" v-if="focus && $slots.after">
                    <slot name="after"></slot>
                </div>
                <span class="__my-line"
                      :class="[lineAnimate]"></span>
            </div>
        </template>
    </div>
</template>
<script>
  export default {
    name: 'my-input',
    data(){
      return {
        focus: false,
        currentValue: this.value,
        ripple_input: {
          animate: null,
        }
      }
    },
    mounted(){
      ( this.autofocus ) && (this.focus = true, this.lineAnimate = 'lineIn');
      this.$on('open', () => {
        this.focus = true;
        this.lineAnimate = 'lineIn';
      });
      this.$on('close', () => {
        this.focus = false;
        this.lineAnimate = 'lineOut';
      })
    },
    props: {
      value: [String, Number],
      label: [String, Number],
      type: {
        type: String,
        default: 'text',
        validator(val){
          if (val === 'text' || val === 'password') {
            return val;
          }
        }
      },
      placeholder: [String, Number],
      required: Boolean,
      disabled: Boolean,
      autofocus: Boolean,//[原生]
      name: [String, Number],//[原生]定义 input 元素的名称
      maxlength: Number,//[原生]规定输入字段中的字符的最大长度
      max: Number,//[原生]规定输入字段的最大值
      min: Number,//[原生]规定输入字段的最小值
      step: Number,//[原生]规定输入字的的合法数字间隔
      pattern: {
        type: [RegExp],
        validator(val){
          if (val.constructor === RegExp) {
            return val;
          }
        }
      },//[原生]规定输入字段的值的模式或格式
    },
    computed: {
      placeholderText(){
        if (this.focus) {
          return this.placeholder
        }
      },
    },
    methods: {
      handleClick(event){
        if (this.disabled) return;
        this.lineAnimate = 'lineIn';
        this.focus = true;
        this.$nextTick(()=>{
          if (event.target.classList[0] === '__my-inputUiKit') {
            event.target.querySelector('.__my-input-input').focus();
          } else {
            event.target.parentNode.querySelector('.__my-input-input').focus()
          }
        })
      },
      handleInput(event){
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event){
        const value = event.target.value;
        this.$emit('change', value);
        this.setCurrentValue(value);
      },
      handleBlur(event){
        const value = event.target.value;
        this.$emit('blur', value);
        this.setFocus(value);
      },
      handleFocus(event){
        const value = event.target.value;
        this.$emit('focus', value);
      },
      setCurrentValue(value){
        if (this.currentValue === value) return;
        this.currentValue = value;
      },
      setFocus(value){
        if (!value || value.trim() === '') {
          this.focus = false;
        }
        this.lineAnimate = 'lineOut';
      },
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/variable";
    @import "../sass/function";
    .__my-inputUiKit {
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
        .__my-input-input {
            width: 100%;
            outline: none;
            background-color: transparent;
            background-image: none;
            border: 0;
            border-radius: 0;
            display: block;
            font-size: rem(32);
            height: rem(72);
            line-height: rem(40);
            padding: rem(16) 0 rem(10) rem(5);
            &::-webkit-input-placeholder {
                color: rgba(0, 0, 0, .38);
            }
        }
        .__my-input-input_before, .__my-input-input_after {
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
</style>