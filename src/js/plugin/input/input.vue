<template>
    <div>
        <template>
            <div class="__my-inputUiKit"
                 :class="{
                    'focus':focus,
                    'disabled':disabled
                 }"
                 @click="handleClick">
                <label class="__my-inputUiKit-label">
                    <span v-if="required">*</span>
                    {{label}}
                </label>
                <input
                        class="__my-input-input"
                        v-bind="$props"
                        :value="currentValue"
                        :placeholder="placeholderText"
                        @focus="handleFocus"
                        @input="handleInput"
                        @change="handleChange"
                        @blur="handleBlur"/>
                <span class="__my-line"
                      :class="[ripple_input.animate]"></span>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name:'my-input',
        data(){
            return {
                focus:false,
                currentValue:this.value,
                ripple_input:{
                    animate: null,
                }
            }
        },
        mounted(){
            if ( this.autofocus ) this.focus = true;
        },
        props:{
            value: [String, Number],
            label:[String, Number],
            type:{
                type: String,
                default:'text',
                validator(val){
                    if ( val === 'text' || val === 'password') {
                        return val;
                    }
                }
            },
            placeholder:[String, Number],
            required:Boolean,
            disabled:Boolean,
            autofocus:Boolean,//[原生]
            name:[String,Number],//[原生]定义 input 元素的名称
            maxlength:Number,//[原生]规定输入字段中的字符的最大长度
            max:Number,//[原生]规定输入字段的最大值
            min:Number,//[原生]规定输入字段的最小值
            step:Number,//[原生]规定输入字的的合法数字间隔
            pattern:{
                type:[RegExp],
                validator(val){
                    if (val.constructor === RegExp){
                        return val;
                    }
                }
            },//[原生]规定输入字段的值的模式或格式
        },
        computed:{
            placeholderText(){
                if ( this.focus ) {
                    return this.placeholder
                }
            },
        },
        methods:{
            handleClick(){
              if ( this.disabled ) return;
              this.ripple_input.animate = 'lineIn';
              this.focus = true;
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
                if (this.currentValue === value ) return;
                this.currentValue = value;
            },
            setFocus(value){
                if ( !value || value.trim() === '') {
                        this.ripple_input.animate = 'lineOut';
                        this.focus = false;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "../sass/variable";
    @import "../sass/function";
    .__my-inputUiKit {
        margin: rem(38) 0 rem(10);
        position: relative;
        .__my-inputUiKit-label {
            color: rgba(0, 0, 0, .38);
            cursor: text;
            font-size: rem(32);
            line-height: 1;
            position: absolute;
            transition: color, transform .3s cubic-bezier(.4, 0, .2, 1);
            left: rem(10);
            top: rem(36);
            span{
                color:red;
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
            padding: rem(16) 0 rem(10);
            &::-webkit-input-placeholder {
                color: rgba(0, 0, 0, .38);
            }
        }
        .__my-line{
            position: absolute;
            bottom: 0;
            width: 100%;
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
                &::before{
                    animation: __my-line_in .35s forwards;
                }
            }
            &.lineOut {
                &::before{
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
            .__my-inputUiKit-label {
                color: #3f51b5;
                transform: scale(.85714, .85714) translate(rem(-10),rem(-54));
            }
        }
        &.disabled {
            background: #eef1f6;
            color: #bbb;
            .__my-inputUiKit-label {
                span {
                    color: #bbb;
                }
            }
        }
    }
</style>