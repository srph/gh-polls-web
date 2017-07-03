<template>
  <div class="container">
    <h1 class="title-heading">GitHub Polls</h1>

    <div v-if="generated">
      <header class="menu-heading">
        <h5 class="title">Generated Poll</h5>
        <button type="button" class="copy" @click="copy" title="Copy to clipboard">
          Copy
        </button>
      </header>

      <div class="preview-box" v-html="preview"></div>
    </div>

    <div v-else>
      <header class="menu-heading">
        <h5 class="title">Poll Options</h5>
      </header>

      <div class="panel-box">
        <div class="item" v-for="(option, index) in options" :key="index">
          <input v-model="option.text" class="form-input" type="text" placeholder="Enter option...">
          <button type="button" class="remove" title="Remove this option" tabindex="-1" ref="options" @click="rm(index)">
            <icon name="remove"></icon>
          </button>
        </div>

        <button type="button" @focus="add" class="add">
          Add another option
        </button>
      </div>

      <div class="generate-action">
        <button class="button" type="button" @click="generate">
          Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import copy from 'copy-text-to-clipboard';
import marked from 'marked';
import config from './config';

export default {
  name: 'app',
  data() {
    return {
      options: [{ text: '' }],
      loading: false,
      generated: false,
      id: '',
    }
  },
  methods: {
    add() {
      this.options.push({ text: '' })

      this.$nextTick(() => {
        this.$refs.options[this.$refs.options.length - 1].focus()
      })
    },

    rm(i) {
      if (this.options.length > 1){
        this.options.splice(i, 1)
      }
    },

    generate() {
      if (this.loading) {
        return;
      }

      this.loading = true

      return axios.post('/poll', { options: this.options.map(o => o.text) })
        .then(res => {
          this.loading = false
          this.generated = true
          this.id = res.data.id
        }, err => {
          this.loading = false
        });
    },

    copy() {
      copy(this.markdown)
    }
  },
  computed: {
    markdown() {
      return this.options.map(option => {
        option = decodeURIComponent(option.text);
        const image = `![](${config.api}/poll/${this.id}/${option})`;
        return `[${image}](${config.api}/poll/${this.id}/${option}/vote)`
      }).join('\n')
    },

    preview() {
      return marked(this.markdown);
    }
  }
}
</script>

<style>
:root {
  --color-white: #fff;
  --color-black: #000;
  --color-gray: #B4B4B4;
  --color-dark-gray: #434343;
  --color-red: #E23131;
  --color-info: #5DB7FC;
  --form-size: 40px;
  --font-size: 14px;
  --font-smallee: 12px;
  --font-family: "Proxima Nova", Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

html, body {
  color: var(--color-black);
  font-family: var(--font-family);
  font-size: var(--font-size);
}

.container {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

.title-heading {
  margin-top: 24px;
  margin-bottom: 80px;
  text-align: center;
  font-weight: 300;
  font-size: 40px;
}

.button {
  font-size: var(--font-smallee);
  padding: 0 16px;
  height: var(--form-size);
  color: var(--color-white);
  line-height: calc(var(--form-size) - 1);
  font-family: var(--font-family);
  text-transform: uppercase;
  background: var(--color-black);
  border: 1px solid transparent;
  cursor: pointer;
}

.button:hover {
  background: var(--color-dark-gray);
  transition: 100ms all ease;
}

.generate-action {
  text-align: center;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0 8px;
  color: var(--color-dark-gray);
  height: var(--form-size);
  font-family: var(--font-family);
  line-height: calc(var(--form-size) - 1);
  border: 1px solid var(--color-gray);
}

.panel-box {
  margin-bottom: 64px;
}

.panel-box > .item {
  display: flex;
  margin-bottom: 16px;
}

.panel-box > .item > .remove {
  display: inline-block;
  padding: 0 16px;
  color: var(--color-red);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}

.panel-box > .add {
  display: inline-block;
  padding: 0;
  color: var(--color-gray);
  background: transparent;
  border: 1px solid transparent;
  font-family: var(--font-family);
  cursor: pointer;
}

.preview-box {
  padding: 8px;
  border: 1px solid var(--color-gray);
}

.menu-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.menu-heading > .title {
  margin: 0;
  font-size: var(--font-smallee);
  text-transform: uppercase;
}

.menu-heading > .copy {
  display: inline-block;
  padding: 0;
  color: var(--color-info);
  font-size: var(--font-smallee);
  font-family: var(--font-family);
  text-transform: uppercase;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}
</style>
