<template>
  <ui-container>
    <ui-title-heading></ui-title-heading>

    <ui-alert ref="alert"></ui-alert>

    <div class="main-content">
      <div v-if="generated">
        <ui-panel title="Generated Poll">
          <copy-button slot="action" :text="markdown"></copy-button>

          <div slot="body" class="preview-box" v-html="preview"></div>
        </ui-panel>
      </div>

      <div v-else>
        <ui-panel title="Poll Options">
          <ui-button slot="action" type="button"
            @click="generate"
            :disabled="loading"
            title="Generate the poll">
            <ui-loader v-if="loading"></ui-loader>
            <span v-else>Generate</span>
          </ui-button>

          <div slot="body">
            <draggable v-model="options" :options="{ group: 'options', handle: '.handle' }" class="inner">
              <poll-option v-for="(option, index) in options"
                :key="option.id"
                :option="option"
                :index="index"
                :error="errors[option.id]"
                ref="options"
                @change="change"
                @remove="rm">
              </poll-option>
            </draggable>

            <ui-button type="button" @focus="trigger" @click="add" ref="add">
              Add another option
            </ui-button>
          </div>
        </ui-panel>

        <tip></tip>
      </div>
    </div>
  </ui-container>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import config from './config'
import * as utils from './utils'
import Draggable from 'vuedraggable'
import UiContainer from './components/UiContainer'
import UiPanel from './components/UiPanel'
import UiButton from './components/UiButton'
import UiAlert from './components/UiAlert'
import UiLoader from './components/UiLoader'
import UiTitleHeading from './components/UiTitleHeading'
import Tip from './components/Tip'
import PollOption from './components/PollOption'
import CopyButton from './components/CopyButton'

export default {
  name: 'app',
  data() {
    return {
      options: [{ text: '', id: 0 }],
      loading: false,
      generated: false,
      errors: {},
      counter: 0,
      id: '',
    }
  },
  methods: {
    trigger() {
      // @REFACTOR: Find a way to isolate this.
      // e.g., allowing inner-ref like React.
      this.$refs.add.$el.click()
    },

    add() {
      this.counter = this.counter + 1;
      this.options.push({ id: this.counter + 1, text: '' })

      this.$nextTick(() => {
        this.$refs.options[this.$refs.options.length - 1].focus()
      })
    },

    change({index, value}) {
      this.options[index].text = value
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
    CopyButton,
    Draggable,
    PollOption,
    Tip,
    UiContainer,
    UiAlert,
    UiPanel,
    UiButton,
    UiLoader,
    UiTitleHeading
  }
}
</script>

<style>
:root {
  --color-white: #fff;
  --color-black: #000;
  --color-light-silver: #f9fafb;
  --color-dark-silver: #8898aa;
  --color-silver: #d9e3ed;
  --color-gray: #B4B4B4;
  --color-dark-gray: #434343;
  --color-red: #FC6D6B;
  --color-info: #1E6EF9;
  --color-green: #01dc87;
  --color-lavender: #43458B;
  --color-light-lavender: #6466bf;
  --drop-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  --drop-shadow-lower: 0px 4px 4px rgba(0,0,0,0.1);
  --border-radius: 4px;
  --form-size: 40px;
  --font-size: 14px;
  --font-size-small: 10px;
  --fa-size-regular: 20px;
  --font-smallee: 12px;
  --font-family: "Source Sans Pro", San Francisco, -apple-system, BlinkMacSystemFont, ".SFSNText-Regular", Segoe UI, Ubuntu, Helvetica, sans-serif;
  --font-montserrat: "Montserrat", San Francisco, -apple-system, BlinkMacSystemFont, ".SFSNText-Regular", Segoe UI, Ubuntu, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

html, body {
  color: var(--color-black);
  font-family: var(--font-family);
  font-size: var(--font-size);
  background: var(--color-light-silver);
}

.preview-box {
  text-align: center;
}

.main-content {
  margin-bottom: 160px;
}

/**
 * https://github.com/Justineo/vue-awesome#styling
 */
.fa-icon {
  width: auto;
  height: 1em; /* or any other relative font sizes */

  /* You would have to include the following two lines to make this work in Safari */
  max-width: 100%;
  max-height: 100%;
}
</style>
