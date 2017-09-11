<template>
    <div class="__my_checkboxUiKit_group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'my-checkbox-group',
        componentName: 'MyCheckboxGroup',
        data(){
            return {
                currentValue: this.value,
                componentSwitch: false,
                children: [],
            }
        },
        props: {
            value: {},
            allDisabled: Boolean,
            min: Number,
            max: Number,
        },
        mounted(){
//      console.log(this.$parent)
            this.$children.forEach(val => {
                if (val.$options._componentTag === 'my-checkbox') {
                    this.componentSwitch = true;
                    //在这里分发任务
                    //直接更新value / 状态 、
                    //根据参数 min max 控制children的状态
                    //children里需要识别parent 接受命令调配
                }
            })
        },
        methods: {
            handelClick(){

            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "../sass/function";
    @import "../sass/variable";

    .__my_checkboxUiKit_group {

    }
</style>