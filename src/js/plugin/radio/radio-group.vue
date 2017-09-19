<template>
    <div class="__my_radioUiKit_group">
        <slot></slot>
    </div>
</template>
<script>
  export default {
    name: 'my-radio-group',
    props: {
      value: [String,Number],
      allDisabled: Boolean,
    },
  }
</script>
<style lang="scss" scoped>

</style>