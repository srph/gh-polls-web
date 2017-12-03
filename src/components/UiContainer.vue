<template>
  <button class="button" v-bind="$props" v-on="$listeners">
    <slot></slot>
  </button>
</template>
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'ui-container'
  }
</script>

<style scoped>
.container {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}
</style>