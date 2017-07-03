<template>
  <button type="button" class="copy" @click="click" title="Copy to clipboard">
    Copy
    <span v-if="show" class="textee">
      Copied!
    </span>
  </button>
</template>

<script>
  export default {
    name: 'copy',
    data() {
      return {
        show: false,
        timeout: null
      }
    },
    methods: {
      click() {
        this.$emit('click');
        // So it always go into the starting animation state
        // when the user tries to spam click.
        this.show = false;
        this.$nextTick(() => {
          clearTimeout(this.timeout);
          this.show = true;
          this.timeout = setTimeout(() => this.show = false, 280);
        });
      }
    }
  }
</script>

<style>
.copy {
  position: relative;
  display: inline-block;
  padding: 0;
  color: var(--color-info);
  font-size: var(--font-smallee);
  font-family: var(--font-family);
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

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-32px);
  }
}
</style>