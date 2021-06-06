<template>
  <v-col class="problem-detail col-12 pa-0 d-flex">
    <div class="left d-flex flex-column">
      <v-toolbar class="editor-tool" dense flat>
        <v-btn icon>
          <v-icon>{{ mdiProblem }}</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-0"
          >{{ `#${problem.id ? problem.id : ""}` }}&nbsp;
          {{problem.title ? problem.title : ""}}&nbsp;
          <span class="text-subtitle-1">
            by&nbsp;{{ problem.author }}
            </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-1"
              color="blue"
              label
              text-color="white"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiAlarm }}
              </v-icon>
              {{ problem.timelimit }} ms
            </v-chip>
          </template>
          <span>{{ $t("problem.timelimit") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-1"
              color="pink"
              label
              text-color="white"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiChip }}
              </v-icon>
              {{ problem.memorylimit }} MB
            </v-chip>
          </template>
          <span>{{ $t("problem.memorylimit") }}</span>
        </v-tooltip>
      </v-toolbar>
      <!-- Marked markdown renderer -->
      <Marked
        class="text--primary markdown-display line-break px-5 pt-2"
        ref="highlight"
      >
        {{ problem.content }}
      </Marked>
    </div>
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
      <!-- Ace code editor -->
      <Ace ref="ace" v-if="aced" />
    </div>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="float-submit"
          color="primary"
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
import {
  mdiConsole,
  mdiUpload,
  mdiScriptTextOutline,
  mdiAlarm,
  mdiChip,
} from "@mdi/js";
import Marked from "@/plugins/marked/Marked";

export default {
  name: "ProblemDetail",

  components: {
    Ace,
    Marked,
  },

  data() {
    return {
      mdiChip,
      mdiAlarm,
      mdiConsole,
      mdiUpload,
      mdiProblem: mdiScriptTextOutline,

      problem: {},

      code: "",
      lang: "C++",
      langList: ["C", "C++", "Java", "JavaScript"],

      isLoading: false,

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
    this.getProblem();
    this.initResizer();
    this.loadLocalCode();
    this.initListener();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    getProblem() {
      this.axios
        .get("/problem/detail", { params: { id: this.id } })
        .then((response) => {
          this.problem = response.data.problem;
        })
        .catch((error) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },

    changeLang(lang) {
      this.$refs.ace.changeLanguage(lang);
      this.lang = lang;
    },

    reloadEditor() {
      this.aced = false;
      this.$nextTick().then(() => {
        this.aced = true;
      });
      this.clearLocalCode();
      return true;
    },

    loadLocalCode() {
      this.code = window.sessionStorage.getItem("code" + this.id) || "";
      this.$refs.ace.editor.setValue(this.code);
    },

    clearLocalCode() {
      window.sessionStorage.removeItem("code" + this.id);
    },

    initListener() {
      this.$refs.ace.$on("ace-input", (payload) => {
        this.code = payload.code;
        window.sessionStorage.setItem("code" + this.id, payload.code);
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

        this.$refs.ace.editor.resize();

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
.markdown-display {
  height: 100%;
  width: 100%;
}

.left {
  width: 50%;
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
