<template>
  <div id="editor"></div>
</template>

<script>
import "./js/src-noconflict/ace";
import "./js/src-noconflict/ext-beautify";
import "./js/src-noconflict/ext-language_tools";
import "./js/src-noconflict/mode-c_cpp";
import "./js/src-noconflict/theme-monokai";

export default {
  data() {
    return {
      editor: {},
      code: "",
    };
  },

  mounted() {
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
  }
};
</script>

<style scoped>
  #editor { 
    position: absolute;
    height: 100%;
    width: 100%;
    font-size: 16px;
  }
</style>