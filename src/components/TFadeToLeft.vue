<template>
  <transition name="fade-to-left">
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: 't-fade-to-left',
  }
</script>

<style scoped>
  .fade-to-left-enter {
    opacity: 0;
    transform: translateX(20px);
  }

  .fade-to-left-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-to-left-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-to-left-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

  .fade-to-left-enter-active,
  .fade-to-left-leave-active {
    transition: 300ms all ease;
  }
</style>