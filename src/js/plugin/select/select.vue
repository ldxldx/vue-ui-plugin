<template>
    <div class="__my-selectUiKit" @click.self="handelClick">
        <my-input v-model="currentValue" label="地址" placeholder="请选择" ref="input"></my-input>
        <!--<slot></slot>-->
        <!--<div class="__my-select-option">-->
            <!--<div class="__my-select-option_item">-->
                <!--<div class="__my-select-option_list">-->
                    <!--<div class="__my-optionUiKit">选项</div>-->
                    <!--<div class="__my-optionUiKit">选项</div>-->
                    <!--<div class="__my-optionUiKit">选项</div>-->
                    <!--<div class="__my-optionUiKit">选项</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
  import Input from '../input/input.vue'
  export default {
    name: 'my-select',
    data(){
      return {

      }
    },
    computed:{
      currentValue:{
        get(){
          return this.value
        },
        set(val){
          this.$emit('input',val)
        }
      },
    },
    components:{
      [Input.name]:Input
    },
    props:{
      label:{},
      value:{}
    },
    mounted(){
      this.$on('close',()=>{
        this.$refs.input.$emit('close')
      })
    },
    methods:{
      handelClick(){
        this.$refs.input.$emit('open')
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/variable";
    @import "../sass/function";
    .__my-selectUiKit {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
        }
        .__my-select-option {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100000;
            &::before{
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #bbb;
                opacity: .3;
            }
            .__my-select-option_item {
                position: relative;
                height: rem(300);
                overflow: hidden;
                background-color: #fff;
                box-shadow: 0 rem(2) rem(10) #2b2b2b;
            }
            .__my-select-option_list {
                font-size: rem(32);
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                &>div{
                    width: 100%;
                    padding: rem(10);
                    text-align: center;
                }
            }
        }
        .__my-optionUiKit {

        }
    }
</style>