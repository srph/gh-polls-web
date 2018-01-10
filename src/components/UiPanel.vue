<template>
  <div class="panel">
    <header class="heading">
      <h4 class="text">{{ title }}</h4>

      <div class="action">
        <slot name="action"></slot>
      </div>
    </header>

    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ui-panel',
    props: ['title']
  }
</script>

<style scoped>
  .panel > .heading,
  .panel > .body {
    padding: 16px;
    background: var(--color-white);
    border: 1px solid var(--color-silver);
  }

  .panel > .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    border-bottom: 0;
  }

  .panel > .heading > .action {
    display: flex;
  }

  .panel > .heading > .action > button:not(:last-child) {
    margin-right: 4px;
  }

  .panel > .heading > .text {
    margin: 0;
    color: var(--color-lavender);
  }

  .panel > .body {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
</style>
