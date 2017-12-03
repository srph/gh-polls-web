<template>
  <input v-bind="$props" v-on="$listeners" :class="{ 'form-input': true, '-danger': error }">
</template>

<script>
  export default {
    name: 'ui-input',
    props: ['error']
  }
</script>

<style scoped>
.form-input {
  display: block;
  width: 100%;
  padding: 0 8px;
  color: var(--color-dark-gray);
  height: var(--form-size);
  font-family: var(--font-family);
  line-height: calc(var(--form-size) - 1);
  border: 1px solid var(--color-silver);
  border-radius: var(--border-radius);
  transition: 200ms ease box-shadow;
}

.form-input:focus {
  outline: 0;
  border-color: var(--color-gray);
  box-shadow: var(--drop-shadow);
}

.form-input.-danger {
  border-color: var(--color-red);
}
</style>