<template>
  <v-col class="col-12 pa-0 d-flex">
    <div class="left">Left</div>
    <div class="resizer" id="resizer"></div>
    <div class="right">Right</div>
  </v-col>
</template>

<script>
export default {
  name: "ProblemDetail",
  
  data() {
    return {
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

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    const mouseDownHandler = (e) => {
      this.x = e.clientX;
      this.leftWidth = this.left.getBoundingClientRect().width;
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
}

.resizer {
  background-color: #cbd5e0;
  cursor: ew-resize;
  width: 2px;
}

.right {
  min-width: 25%;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>