<template>
    <div class="__cov_checkbox_block" @click="rippleClick">
        <p class="__cov_checkbox" :class="{active:ripple_checkbox.active}">
            <i class="__cov_checkbox_icon iconfont">&#xe671;</i>
            <span class="__cov_checkbox__ripple" :class="{animate:ripple_checkbox.animate}"></span>
        </p>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name : 'l-checkBox',
        data(){
            return {
                ripple_checkbox: {
                    active: false,
                    animate: false,
                }
            }
        },
        methods: {
            rippleClick(e){
                this.ripple_checkbox.active = !this.ripple_checkbox.active;
                this.$emit('change',this.ripple_checkbox.active);
                if(!this.ripple_checkbox.active) return;
                this.ripple_checkbox.animate = true;
                setTimeout(()=>{
                    this.ripple_checkbox.animate = false;
                },500);
            },
        }
    }
</script>
<style lang="scss" scoped>
    .__cov_checkbox_block {
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        .__cov_checkbox {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(0,0,0,.54);
            margin-right: 5px;
            position: relative;
            .__cov_checkbox_icon {
                width: 100%;
                height: 100%;
                color: #fff;
                font-size: 12px;
                background: #ff4081;
                display: flex;
                align-items: center;
                transform: scale(0);
                will-change: transform;
            }
            &.active {
                transition: border .5s linear;
                border-color: #ff4081;
                .__cov_checkbox_icon {
                    transition: transform .1s linear;
                    transform: scale(1);
                }
            }
            .__cov_checkbox__ripple {
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
                    animation: checkbox_ripple .5s cubic-bezier(.4,0,.2,1);
                }
            }
            @keyframes checkbox_ripple {
                100% {
                    opacity: 0;
                    transform: scale(3);
                }
            }
        }
    }
</style>