<template>
    <div class="drag-template">
        <div v-for="(item,index) in children" :key="item.id" class="children_item"
             :data-leave="item.leave"
             :data-id="item.id"
             @dragstart="dragstart"
             @dragend="dragend"
             @dragover="dragover"
             @dragenter="dragenter"
             @dragleave="dragleave"
             @drop="drop"
             draggable="true">
            <div class="label" :class="{'aims':aimsTargetId===item.id&&aimsTargetType==='switch'}" @click="click(item)">
                <div>{{item.label}}</div>
            </div>
            <div class="children_block" draggable="true" :class="{'aims':aimsTargetId===item.id&&aimsTargetType==='append'}">
                <blockComponent v-if="item.children"
                                :children="item.children"
                                :aimsTargetId="aimsTargetId"
                                :aimsTargetType="aimsTargetType"
                                @click="click"
                                @dragstart="dragstart"
                                @dragend="dragend"
                                @dragover="dragover"
                                @dragenter="dragenter"
                                @dragleave="dragleave"
                                @drop="drop"></blockComponent>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        msg: 'hello'
      }
    },
    props: ['children', 'aimsTargetId', 'aimsTargetType'],
    methods: {
      click(item){
        this.$emit('click', item)
      },
      dragstart(event){
        this.$emit('dragstart', event);
      },
      dragend(event){
        this.$emit('dragend', event);
      },
      dragover(event){
        this.$emit('dragover', event);
      },
      dragenter(event){
        this.$emit('dragenter', event);
      },
      dragleave(event){
        this.$emit('dragleave', event);
      },
      drop(event){
        this.$emit('drop', event);
      }
    }
  }
</script>
<style lang="scss" scoped>
    .drag-template {
        display: flex;
        .children_item {
            display: flex;
            flex-direction: column;
            margin: 0 10px;
            position: relative;
        }
        .label {
            display: flex;
            justify-content: center;
            padding: 0 10px;
            position: relative;
            transition: transform .1s linear;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            &>div{
                padding: 5px 8px;
                background: #3f51b5;
                color: #eee;
                border-radius: 4px;
            }
            &.aims{
                transform: scale(1.2);
            }
        }
        .children_block {
            padding-top: 50px;
            transition: transform .1s linear;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
            }
            &.aims {
                transform: scale(1.2);
                &::before {
                    background: #eee;
                    opacity: .8;
                }
            }
        }
    }
</style>