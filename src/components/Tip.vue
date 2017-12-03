<template>
  <t-fade-to-left direction="bottom">
    <div class="tip" v-if="show">
      <div class="icon">
        <icon name="lightbulb-o"></icon>
      </div>

      <p class="text">
        Pressing <code>tab</code> while focused on the last input will allow you to immediately add another option.
        <button type="button" class="hide" @click="close">Close This Tip</button>
      </p>
    </div>
  </t-fade-to-left>
</template>

<script>
  import TFadeToLeft from './TFadeToLeft';

  export default {
    name: 'tip',
    data() {
      return {
        show: true
      }
    },
    methods: {
      close() {
        this.show = false
      }
    },
    components: {
      TFadeToLeft
    }
  }
</script>

<style scoped>
  .tip {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }

  .tip > .text > .hide {
    display: inline-block;
    padding: 0;
    text-transform: uppercase;
    color: var(--color-gray);
    background: transparent;
    font-size: var(--font-size-small);
    font-family: var(--font-montserrat);
    border: 0;
    outline: 0;
    cursor: pointer;
    margin-left: 8px;
  }

  .tip > .text {
    margin: 0;
    vertical-align: middle;
  }

  .tip > .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: var(--color-white);
    border: 1px solid var(--color-silver);
    border-radius: 50%;
    margin-right: 16px;
    color: #f3e208;
  }

  code {
    display: inline-block;
    padding: 4px;
    font-size: 12px;
    vertical-align: middle;
    line-height: 1;
    background: var(--color-silver);
  }
</style>