<template>
  <button :class="{ 'button': true, '-primary': preset === 'primary' }" v-bind="$props" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'ui-button',
    props: {
      preset: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style scoped>
  .button {
    display: inline-block;
    height: 26px;
    line-height: 25px;
    padding: 0 12px;
    font-weight: 600;
    font-family: var(--font-montserrat);
    font-size: 10px;
    text-transform: uppercase;
    color: var(--color-lavender);
    background: var(--color-white);
    border: 1px solid var(--color-silver);
    border-radius: var(--border-radius);
    box-shadow: var(--drop-shadow);
    cursor: pointer;
    transform: translateY(0);
    transition: 200ms cubic-bezier(.06,.67,.37,.99) all;
  }

  .button.-primary {
    color: var(--color-white);
    background: var(--color-lavender);
  }

  .button.-primary:hover {
    background: var(--color-light-lavender);
  }

  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: var(--drop-shadow-lower);
  }
</style>
