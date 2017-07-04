<template>
  <p :class="{ 'alert-box': true, '-danger': type === 'error', '-success': type === 'success' }">
    <transition name="fade">
      <span v-if="message">{{ message }}</span>
    </transition>
  </p>
</template>

<script>
  export default {
    name: 'alert',
    data() {
      return {
        message: '',
        type: '',
        timeout: null
      }
    },
    methods: {
      notify(type, message) {
        if (type !== 'success') clearTimeout(this.timeout)
        this.type = type
        this.message = message
        if (type !== 'success') this.timeout = setTimeout(this.remove, 5000)
      },
      remove() {
        this.type = ''
        this.message = ''
      }
    }
  }
</script>

<style scoped>
  .alert-box {
    margin-top: 0;
    margin-bottom: 64px;
    height: 20px;
    text-align: center;
  }

  .alert-box.-danger {
    color: var(--color-red);
  }

  .alert-box.-success {
    color: var(--color-success);
  }

  .alert-box > span {
    display: block;
  }

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