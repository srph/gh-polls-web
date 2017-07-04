<template>
  <button type="button" class="copy" @click="click" title="Copy to clipboard">
    Copy
    <span v-if="show" class="textee">
      Copied!
    </span>
  </button>
</template>

<script>
  import copy from 'copy-text-to-clipboard';

  export default {
    name: 'copy',
    props: {
      text: String
    },
    data() {
      return {
        show: false,
        timeout: null
      }
    },
    methods: {
      click() {
        copy(this.text)
        // So it always go into the starting animation state
        // when the user tries to spam click.
        this.show = false;
        clearTimeout(this.timeout);
        this.$nextTick(() => {
          this.show = true;
          this.timeout = setTimeout(() => this.show = false, 250);
        });
      }
    }
  }
</script>

<style scoped>
.copy {
  position: relative;
  display: inline-block;
  padding: 0;
  color: var(--color-info);
  font-size: var(--font-smallee);
  font-family: var(--font-family);
  font-weight: 500;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  outline: 0;
}

.textee {
  position: absolute;
  bottom: 0;
  left: 0;
  animation-name: copy-floatee;
  animation-iteration-count: 1;
  animation-duration: 300ms;
  animation-timing-function: ease-in;
}

@keyframes copy-floatee {
  0% {
    transform: translateY(0);
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-32px);
  }
}
</style>