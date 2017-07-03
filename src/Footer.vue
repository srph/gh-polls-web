<template>
  <footer class="footer">
    <p class="text">
      Web front-end for TJ Holowaychuk's <a href="https://github.com/tj/gh-polls" target="_blank">GitHub Polls</a>.
    </p>

    <div class="linkset">
      <a href="https://github.com/srph/gh-polls-web" target="_blank">GitHub</a>
      <a href="https://github.com/srph" target="_blank">@_srph</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'ui-footer'
  }
</script>

<style scoped>
  .footer {
    margin-top: 240px;
    padding-top: 24px;
    display: flex;
    border-top: 1px solid #ddd;
    font-size: var(--font-smallee);
    justify-content: space-between;
  }

  .footer > .text {
    margin: 0;
    line-height: 1.6;
    color: var(--color-gray);
  }

  .footer a {
    color: var(--color-gray);
  }

  .footer > .linkset {
    display: flex;
  }

  .footer > .linkset > a {
    text-decoration: none;
  }

  .footer > .linkset > a:not(:last-child) {
    margin-right: 24px;
  }
</style>