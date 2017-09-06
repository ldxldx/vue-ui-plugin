<template>
    <button @click="rippleClick" class="__cov-button-ripple"
            :class="{
                [size]:size,
            'disabled':disabled,
                [type]:type
            }"
            :disabled="disabled">
        <slot></slot>
        <span class="__cov-ripple" :class="{'animate': ripple_button.animate}" :style="ripple_button.style"></span>
    </button>
</template>
<script>
    export default {
        name:'l-button',
        data () {
            return {
                ripple_button: {
                    animate: false,
                    toggle: false,
                    style:null
                }
            }
        },
        props:{
            size:{
                type:String,//large small mini
                default:'small',
                validator(val){
                    if (val === 'large' || val === 'small' || val === 'mini') {
                        return val;
                    }
                }
            },
            type:{
                type:String,//success warning danger info
                validator(val){
                    if (val === 'success' || val === 'warning' || val === 'danger' || val === 'info') {
                        return val;
                    }
                }
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            rippleClick (e) {
                if (this.ripple_button.animate || this.disabled) return;
                this.ripple_button.animate = true;
                let button = e.target,ripple = button.lastChild;
                if (button.classList[0] === '__cov-button-ripple') {
                    let d = Math.max(button.offsetHeight, button.offsetWidth) + 'px',
                        x = (e.layerX - ripple.offsetWidth / 2  ) + 'px',
                        y = (e.layerY - ripple.offsetHeight / 2 ) + 'px';
                    this.ripple_button.style = {
                        height: d ,
                        width: d ,
                        top: y ,
                        left: x ,
                    }
                }
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.ripple_button.animate = false;
                        this.$emit('click')
                    }, 660);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../sass/function";
    .__cov-button-ripple {
        border: none;
        outline: none;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
        position: relative;
        text-transform: uppercase;
        overflow: hidden;
        will-change: box-shadow, transform;
        transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-content: center;
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
        /*bgc color*/
        background-color: #3f51b5;
        color: #fff;
        &.success {
            background-color: #13ce66;
            &:hover {
                background-color: #42d885;
            }
        }
        &.warning {
            background-color: #f7ba2a;
            &:hover {
                background-color: #f9c855;
            }
        }
        &.danger {
            background-color: #ff4949;
            &:hover {
                background-color: #ff6d6d;
            }
        }
        &.info {
            background-color: #50bfff;
            &:hover {
                background-color: #73ccff;
            }
        }
        &.disabled {
            opacity: .45;
            cursor: not-allowed;
        }
    }
    .__cov-ripple {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        background: hsla(0, 0%, 65%, 0.66);
        border-radius: 100%;
        transform: scale(0);
        &.animate {
            animation: button_ripple .65s linear;
        }
    }
    @keyframes button_ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
</style>