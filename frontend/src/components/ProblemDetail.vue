<template>
  <v-col class="col-12 pa-0 d-flex">
    <div class="left">Left</div>
    <div class="resizer no-select" id="resizer">|</div>
    <div class="right">
      <Ace />
    </div>
  </v-col>
</template>

<script>
import Ace from "@/plugins/ace/Ace";
export default {
  name: "ProblemDetail",

  components: {
    Ace
  },
  
  data() {
    return {
      content: "",
      lang: "",

      resizer: {},
      left: {},
      right: {},
      x: 0,
      y: 0,
      leftWidth: 0,
    }
  },

  mounted() {
    this.resizer = document.getElementById("resizer");
    this.left = this.resizer.previousElementSibling;
    this.right = this.resizer.nextElementSibling;

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - this.x;

      const newLeftWidth = (this.leftWidth + dx) * 100 / this.resizer.parentNode.getBoundingClientRect().width;
      this.left.style.width = `${newLeftWidth}%`;

      document.body.style.cursor = 'col-resize';
    };

    const mouseUpHandler = () => {
      this.resizer.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');

      this.left.style.userSelect = 'none';
      this.left.style.pointerEvents = 'none';

      this.right.style.userSelect = 'none';
      this.right.style.pointerEvents = 'none';

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    const mouseDownHandler = (e) => {
      this.x = e.clientX;
      this.leftWidth = this.left.getBoundingClientRect().width;

      this.left.style.removeProperty('user-select');
      this.left.style.removeProperty('pointer-events');

      this.right.style.removeProperty('user-select');
      this.right.style.removeProperty('pointer-events');

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }

    this.resizer.addEventListener('mousedown', mouseDownHandler);
  },

  methods: {

  },

  computed: {
    id() {
      return this.$route.params.id; 
    }
  }
}
</script>

<style scoped>

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
  background-color: #c1d5e0;
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
</style>