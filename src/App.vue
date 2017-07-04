<template>
  <div class="container">
    <h1 class="title-heading">GitHub Polls</h1>

    <div v-if="generated">
      <header class="menu-heading">
        <h5 class="title">Generated Poll</h5>
        <copy :text="markdown"></copy>
      </header>

      <div class="preview-box" v-html="preview"></div>

      <alert ref="alert"></alert>
    </div>

    <div v-else>
      <header class="menu-heading">
        <h5 class="title">Poll Options</h5>
      </header>

      <div class="panel-box">
        <draggable v-model="options" :options="{ group: 'options', handle: '.handle' }" class="inner">
          <div class="item" v-for="(option, index) in options" :key="option">
            <div class="handle" title="Drag item around to sort">
              <icon name="ellipsis-v"></icon>
            </div>
            <input v-model="option.text" :class="{ 'form-input': true, '-danger': errors[option.id] }" type="text" placeholder="Enter option..." ref="options">
            <button type="button" class="remove" title="Remove this option" tabindex="-1" @click="rm(index)">
              <icon name="remove"></icon>
            </button>
          </div>
        </draggable>

        <button type="button" @focus="trigger" @click="add" class="add" ref="add">
          Add another option
        </button>
      </div>

      <alert ref="alert"></alert>

      <div class="generate-action">
        <button class="button" type="button" @click="generate" :disabled="loading">
          <loader v-if="loading"></loader>
          <span v-else>Generate</span>
        </button>
      </div>
    </div>

    <ui-footer></ui-footer>
  </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';
import config from './config';
import * as utils from './utils';
import Draggable from 'vuedraggable';
import Alert from './Alert';
import Copy from './Copy';
import Footer from './Footer';
import Loader from './Loader';

export default {
  name: 'app',
  data() {
    return {
      options: [{ text: '' }],
      loading: false,
      generated: false,
      errors: {},
      counter: 0,
      id: '',
    }
  },
  methods: {
    trigger() {
      this.$refs.add.click()
    },

    add() {
      this.counter = this.counter + 1;
      this.options.push({ id: this.counter + 1, text: '' })

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

      if (this.options.some(o => !o.text.length)) {
        this.errors = utils.objectify(this.options.filter(o => !o.text.length).map(o => o.id), true)
        this.$refs.alert.notify('error', 'You forgot to fill up some options.');
        return;
      }

      this.errors = {};
      this.loading = true

      return axios.post('/poll', { options: this.options.map(o => o.text) })
        .then(res => {
          this.$refs.alert.notify('success', 'The poll was successfully generated!');
          this.loading = false
          this.generated = true
          this.id = res.data.id
        }, err => {
          this.$refs.alert.notify('error', 'An error occured trying to generate a poll.');
          this.loading = false
        });
    }
  },
  computed: {
    markdown() {
      return this.options.map(option => {
        option = encodeURIComponent(option.text);
        const image = `![](${config.api}/poll/${this.id}/${option})`;
        return `[${image}](${config.api}/poll/${this.id}/${option}/vote)`
      }).join('\n')
    },

    preview() {
      return marked(this.markdown);
    }
  },
  components: {
    Alert,
    Copy,
    Loader,
    Draggable,
    'ui-footer': Footer
  }
}
</script>

<style>
:root {
  --color-white: #fff;
  --color-black: #000;
  --color-gray: #B4B4B4;
  --color-dark-gray: #434343;
  --color-red: #FC6D6B;
  --color-info: #1E6EF9;
  --color-success: #5DC722;
  --form-size: 40px;
  --font-size: 14px;
  --font-smallee: 12px;
  --font-family: "Proxima Nova", San Francisco, -apple-system, BlinkMacSystemFont, ".SFSNText-Regular", Segoe UI, Ubuntu, Helvetica, sans-serif;
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
  padding: 0 24px;
  height: var(--form-size);
  color: var(--color-white);
  line-height: calc(var(--form-size) - 1);
  font-family: var(--font-family);
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--color-black);
  border: 1px solid transparent;
  cursor: pointer;
}

.button:hover {
  background: var(--color-dark-gray);
  transition: 100ms all ease;
}

.button:disabled {
  cursor: not-allowed;
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

.form-input:focus {
  outline: 0;
  border-color: var(--color-info);
}

.form-input.-danger {
  border-color: var(--color-red);
}

.panel-box {
  margin-bottom: 64px;
}

.panel-box .item {
  display: flex;
  margin-bottom: 16px;
  margin-left: -40px;
  transition: 300ms all cubic-bezier(.55,0,.1,1);
}

.panel-box .item.sortable-chosen {
  opacity: 0.2;
}

.panel-box .item > .remove {
  display: inline-block;
  padding: 0 16px;
  color: var(--color-red);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}

.panel-box .item > .handle {
  display: inline-block;
  padding: 8px 16px;
  color: var(--color-black);
  background: transparent;
  border: 1px solid transparent;
  cursor: grab;
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
  margin-bottom: 64px;
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
</style>
