<template>
    <div class="__my_checkboxUiKit_group">
        <slot></slot>
    </div>
</template>
<script>
  export default {
    name: 'my-checkbox-group',
    data(){
      return {
        currentValue: this.value,
        componentSwitch:false
      }
    },
    props: {
      value: {},
      allDisabled: Boolean,
      min:Number,
      max:Number,
    },
    mounted(){
      console.log(this.$parent)
      this.$children.forEach(val=>{
        if (val.$options._componentTag === 'my-checkbox') {
            this.componentSwitch = true;
            //在这里分发任务

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