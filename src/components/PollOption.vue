<template>
  <div :class="{ 'item': true, '-focused': focused || hovered }"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave">
    <div class="handle" title="Drag item around to sort">
      <icon name="ellipsis-v"></icon>
    </div>

    <ui-input @change="change"
      @focus="focusin"
      @blur="focusout"
      :value="option.text"
      :class="{ 'form-input': true, '-danger': error }"
      type="text"
      placeholder="Enter an option (e.g., React, Vue)"
      ref="input">
    </ui-input>

    <button type="button" class="remove" title="Remove this option" tabindex="-1" @click="remove">
      <icon name="remove"></icon>
    </button>
  </div>
</template>

<script>
  import UiInput from './UiInput'

  export default {
    name: 'poll-option',
    props: ['option', 'index', 'error'],
    data() {
      return {
        focused: false,
        hovered: false
      }
    },
    methods: {
      change(evt) {
        this.$emit('change', {
          index: this.index,
          value: evt.target.value
        })
      },

      remove() {
        this.$emit('remove', this.index)
      },

      focus() {
        this.$refs.input.$el.focus()
      },

      focusin() {
        this.focused = true;
      },

      focusout() {
        this.focused = false;
      },

      mouseenter() {
        this.hovered = true;
      },

      mouseleave() {
        this.hovered = false;
      }
    },
    components: {
      UiInput
    }
  }
</script>

<style scoped>
.item {
  display: flex;
  margin-bottom: 16px;
  margin-left: -56px;
  transition: 300ms all cubic-bezier(.55,0,.1,1);
}

.item.sortable-chosen {
  opacity: 0.2;
}

.item > .remove {
  display: inline-block;
  padding: 0 16px;
  margin-left: -40px;
  color: var(--color-gray);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  opacity: 0;
  font-size: 16px;
  transition: 200ms ease opacity;
}

.item > .handle {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 16px;
  color: var(--color-gray);
  background: transparent;
  border: 1px solid transparent;
  cursor: grab;
  opacity: 0;
  font-size: 20px;
  transition: 200ms ease opacity;
}

.item.-focused > .handle,
.item.-focused > .remove {
  opacity: 1;
}
</style>