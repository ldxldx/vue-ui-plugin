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
                children: [],
            }
        },
        props: {
            value: {},
            allDisabled: Boolean,
            min: Number,
            max: Number,
        },
    }
</script>
<style lang="scss" scoped>
    @import "../sass/function";
    @import "../sass/variable";

    .__my_checkboxUiKit_group {

    }
</style>