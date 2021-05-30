<template>
  <v-col class="problem-detail col-12 pa-0 d-flex">
    <div class="left">Left</div>
    <div class="resizer no-select" id="resizer">|</div>
    <div class="right">
      <v-toolbar class="editor-tool" absolute dense flat>
        <v-dialog v-model="refreshConsole" persistent max-width="340">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="hidden-xs-only"
              @click="refreshConsole = true"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ mdiConsole }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              {{ $t("problem.reload.title") }}
            </v-card-title>
            <v-card-text>{{ $t("problem.reload.message") }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="refreshConsole = false">
                {{ $t("dialog.cancel") }}
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="reloadEditor() && (refreshConsole = false)"
              >
                {{ $t("dialog.yes") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-toolbar-title>{{ $t("problem.detail.editor") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mr-4">
              {{ lang }}
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(lang, index) in langList"
              :key="index"
              @click="changeLang(lang)"
            >
              <v-list-item-title>{{ lang }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <Ace ref="editor" v-if="aced" />
    </div>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="float-submit"
          color="success"
          v-on="on"
          v-bind="attrs"
          fab
          large
          dark
          :loading="isSubmit"
          :disabled="isSubmit"
        >
          <v-icon>{{ mdiUpload }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("problem.detail.submit") }}</span>
    </v-tooltip>
  </v-col>
</template>

<script>
import Ace from "@/plugins/ace/Ace";
import { mdiConsole, mdiUpload } from "@mdi/js";
export default {
  name: "ProblemDetail",

  components: {
    Ace,
  },

  data() {
    return {
      mdiConsole,
      mdiUpload,
      code: "",
      lang: "C++",
      langList: ["C", "C++", "Java", "JavaScript"],

      resizer: {},
      left: {},
      right: {},
      x: 0,
      y: 0,
      leftWidth: 0,
      aced: true,

      refreshConsole: false,
      isSubmit: false,
    };
  },

  mounted() {
    this.initResizer();
    this.initListener();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    changeLang(lang) {
      this.$refs.editor.changeLanguage(lang);
      this.lang = lang;
    },

    reloadEditor() {
      this.aced = false;
      this.$nextTick().then(() => {
        this.aced = true;
      });
      return true;
    },

    initListener() {
      this.$refs.editor.$on("ace-input", (payload) => {
        this.code = payload.code;
      });
    },

    initResizer() {
      this.resizer = document.getElementById("resizer");
      this.left = this.resizer.previousElementSibling;
      this.right = this.resizer.nextElementSibling;

      const mouseMoveHandler = (e) => {
        const dx = e.clientX - this.x;

        const newLeftWidth =
          ((this.leftWidth + dx) * 100) /
          this.resizer.parentNode.getBoundingClientRect().width;
        this.left.style.width = `${newLeftWidth}%`;

        document.body.style.cursor = "col-resize";
      };

      const mouseUpHandler = () => {
        this.resizer.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");

        this.left.style.removeProperty("user-select");
        this.left.style.removeProperty("pointer-events");

        this.right.style.removeProperty("user-select");
        this.right.style.removeProperty("pointer-events");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      const mouseDownHandler = (e) => {
        this.x = e.clientX;
        this.leftWidth = this.left.getBoundingClientRect().width;

        this.left.style.userSelect = "none";
        this.left.style.pointerEvents = "none";

        this.right.style.userSelect = "none";
        this.right.style.pointerEvents = "none";

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      this.resizer.addEventListener("mousedown", mouseDownHandler);
    },
  },
};
</script>

<style scoped>
.left {
  width: 56%;
  min-width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
}

@media (max-width: 960px) {
  .left {
    height: calc(100vh - 56px);
  }
}

.resizer {
  color: #333;
  background-color: #8eacbb;
  font-weight: 200;
  cursor: ew-resize;
  width: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
}

.right {
  min-width: 25%;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-tool {
  width: 100%;
}

.problem-detail {
  position: absolute;
}

.float-submit {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
