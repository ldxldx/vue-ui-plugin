<template>
    <button @click="rippleClick" class="__cov-button-ripple" :class="{active: ripple_button.toggle}">
        <slot></slot>
        <span class="__cov-ripple" :class="{'animate': ripple_button.animate}"></span>
    </button>
</template>

<script>
    export default {
        name:'l-button',
        data () {
            return {
                ripple_button: {
                    animate: false,
                    toggle: false
                }
            }
        },
        methods: {
            rippleClick (e) {
                if (this.ripple_button.animate) return;
                this.ripple_button.animate = true;
                let button = e.target;
                let ripple = button.querySelector('.__cov-ripple');
                if (ripple) {
                    let d = Math.max(button.offsetHeight, button.offsetWidth);
                    let x = e.layerX - ripple.offsetWidth / 2;
                    let y = e.layerY - ripple.offsetHeight / 2;
                    ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;');
                }
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.ripple_button.animate = false;
                    }, 660);
                });
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .__cov-button-ripple {
        width: 100%;
        height: 36px;
        border: none;
        outline: none;
        color: #fff;
        background-color: #3f51b5;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
        position: relative;
        font-size: 14px;
        text-transform: uppercase;
        overflow: hidden;
        will-change: box-shadow, transform;
        transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-content: center;
        &:hover {
            background-color: #2b3da0;
            opacity: .9;
        }
    }
    .__cov-ripple {
        display: block;
        position: absolute;
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