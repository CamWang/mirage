<template>
  <div class="editor" ref="ace"></div>
</template>

<script>
import "./js/src-noconflict/ace";
import "./js/src-noconflict/ext-beautify";
import "./js/src-noconflict/ext-language_tools";
import "./js/src-noconflict/mode-c_cpp";
import "./js/src-noconflict/mode-java";
import "./js/src-noconflict/mode-javascript";
import "./js/src-noconflict/theme-monokai";
import "./js/src-noconflict/theme-xcode";

export default {
  data() {
    return {
      editor: {},
      code: "",
      lang: "c_cpp",
      tabSize: 2,
      fontSize: 16,
      dark: true,
    };
  },

  mounted() {
    const editor = ace.edit(this.$refs.ace, {
      fontSize: this.fontSize,
      tabSize: this.tabSize
    });
    this.editor = editor;
    if (this.$vuetify.theme.dark) {
      this.editor.setTheme("ace/theme/monokai");
      this.dark = true;
    } else {
      this.editor.setTheme("ace/theme/xcode");
      this.dark = false;
    }
    this.editor.session.setMode("ace/mode/c_cpp");
    this.editor.session.on('change', (delta) => {
      this.$emit("ace-input", {
        code: this.editor.getValue()
      });
    });
  },

  methods: {
    changeLanguage(lang) {
      if (lang !== this.lang) {
        switch(lang) {
          case 'C': 
          case 'C++': {
            this.editor.session.setMode("ace/mode/c_cpp");
            this.lang = 'c_cpp';
            break;
          }
          case 'Java': {
            this.editor.session.setMode("ace/mode/java");
            this.lang = 'java';
            break;
          }
          case 'JavaScript': {
            this.editor.session.setMode("ace/mode/javascript");
            this.lang = 'javascript';
            break;
          }
        }
        this.$notify({
          title: this.$t("notify.lang.change"),
          type: "success",
        })
      }
    },
  },

  watch: {
    '$vuetify.theme.dark': function() {
      if (this.$vuetify.theme.dark && !this.dark) {
        this.editor.setTheme("ace/theme/monokai");
        this.dark = true;
      } else if(this.dark){
        this.editor.setTheme("ace/theme/xcode");
        this.dark = false;
      }
    }
  }
};
</script>

<style scoped>
  .editor { 
    position: absolute;
    top: 48px;
    height: calc(100% - 48px);
    width: 100%;
  }
</style>