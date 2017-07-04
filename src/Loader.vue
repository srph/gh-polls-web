<template>
  <div class="dot-loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'loader'
  }
</script>

<style>
  .dot-loader > div {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: var(--color-white);
    border-radius: 50%;
    animation: 0.5s infinite ease-in-out;
    animation-name: pop;
    animation-fill-mode: both;
    animation-direction: alternate;
  }

  .dot-loader > div:not(:last-child) {
    margin-right: 2px;
  }

  .dot-loader > div:nth-child(1) {
    animation-delay: -0.32s;
  }

  .dot-loader > div:nth-child(2) {
    animation-delay: -0.16s;
  }

  .dot-loader > div:nth-child(3) {
    animation-delay: -0.048s;
  }

  @keyframes pop {
    0% { transform: translateY(8px); opacity: 0.6; }
    80% { transform: translateY(0px); opacity: 1; }
  }
</style>