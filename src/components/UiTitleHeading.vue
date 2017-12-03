<template>
  <header class="title-heading">
    <h1 class="title">GitHub Polls</h1>
    <nav class="nav">
      <a href="https://github.com/apex/gh-polls#about" class="link" target="_blank" title="GitHub Polls explained">How It Works</a>
      <a href="https://github.com/apex/gh-polls" class="link" target="_blank" title="GitHub Polls CLI">CLI</a>
      <a href="https://github.com/srph/gh-polls-web" class="link" target="_blank" title="GitHub">
        <icon name="github-alt"></icon>
      </a>
      <a href="https://twitter.com/_srph" class="link" target="_blank" title="Twitter">
        <icon name="twitter"></icon>
      </a>
    </nav>
  </header>
</template>

<style scoped>
  .title-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .title-heading > .title {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    font-family: var(--font-montserrat);
  }

  .title-heading > .nav {
    display: flex;
    align-items: center;
  }

  .title-heading > .nav > .link {
    color: var(--color-dark-silver);
    font-size: var(--font-size);
    text-decoration: none;
    line-height: 0;
  }

  .title-heading > .nav > .link:hover {
    color: var(--color-lavender);
    transition: 200ms ease all;
  }

  .title-heading > .nav > .link:not(:last-child) {
    margin-right: 24px;
  }
</style>