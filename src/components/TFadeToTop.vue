<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: 't-fade-to-top'
  }
</script>

<style scoped>
  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: 300ms all ease;
  }
</style>