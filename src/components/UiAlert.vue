<template>
  <t-fade-to-top>
    <p :class="{ 'alert-box': true, '-danger': type === 'error', '-success': type === 'success' }" v-if="message">
      <span v-if="type === 'success'" class="highlight">
        Nice!
      </span>
      <span v-else class="highlight">
        Oh no!
      </span>
      {{ message }}
    </p>
  </t-fade-to-top>
</template>

<script>
  import TFadeToTop from './TFadeToTop';

  export default {
    name: 'ui-alert',
    data() {
      return {
        message: '',
        type: '',
        timeout: null
      }
    },
    methods: {
      notify(type, message) {
        clearTimeout(this.timeout)
        this.type = type
        this.message = message
        if (type !== 'success') this.timeout = setTimeout(this.remove, 5000)
      },
      remove() {
        this.type = ''
        this.message = ''
      }
    },
    components: {
      TFadeToTop
    }
  }
</script>

<style scoped>

  .alert-box {
    padding: 16px;
    margin-bottom: 24px;
    text-align: center;
    border: 1px solid var(--color-silver);
    border-radius: var(--border-radius);
    background: var(--color-white);
  }

  .alert-box > .highlight {
    font-weight: 600;
  }

  .alert-box.-danger > .highlight {
    color: var(--color-red);
  }

  .alert-box.-success > .highlight {
    color: var(--color-green);
  }
</style>
