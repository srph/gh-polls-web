<template>
  <ui-button :preset="preset" type="button" @click="click" title="Copy generated poll markdown to clipboard">
    <span class="copy">
      Copy {{ entity }}
      <span v-if="show" class="textee">
        Copied!
      </span>
    </span>
  </ui-button>
</template>

<script>
  import copy from 'copy-text-to-clipboard'
  import UiButton from './UiButton'

  export default {
    name: 'copy-button',
    props: {
      text: String,
      entity: String,
      preset: String
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
    },
    components: {
      UiButton
    }
  }
</script>

<style scoped>
.copy {
  position: relative;
}

.textee {
  position: absolute;
  bottom: 0;
  left: 50%;
  color: var(--color-lavender);
  animation-name: copy-floatee;
  animation-iteration-count: 1;
  animation-duration: 300ms;
  animation-timing-function: ease-in;
}

@keyframes copy-floatee {
  0% {
    transform: translateY(-8px) translateX(-50%);
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-40px) translateX(-50%);
  }
}
</style>
