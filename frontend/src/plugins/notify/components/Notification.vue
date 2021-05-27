<template>
  <div class="notification-group mt-lg-16 mt-15" :style="styles">
    <div @enter="enter" @leave="leave" @after-leave="clean">
      <transition-group :name="animationName">
        <div
          v-for="item in active"
          class="notification-wrapper"
          :style="notifyWrapperStyle(item)"
          :key="item.id"
          :data-id="item.id"
          @mouseenter="pauseTimeout"
          @mouseleave="resumeTimeout"
        >
          <slot
            :class="[classes, item.type]"
            :item="item"
            :close="() => destroy(item)"
          >
            <div :class="notifyClass(item)" @click="destroyIfNecessary(item)">
              <v-alert
                class="mb-0"
                :color="item.type?item.type:'primary'"
                border="left"
                dark
              >
                <div class="text-body-2">{{ item.title }}</div>
                <div class="text-caption">{{ item.text }}</div>
              </v-alert>
            </div>
          </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import plugin from "../index";
import { events } from "../events";
import parseNumericValue from "../parser";
import { Id, split, listToDirection, Timer } from "../utils";

const defaults = {
  position: ["bottom", "right"],
  velocityAnimation: {
    enter: (el) => {
      var height = el.clientHeight;

      return {
        height: [height, 0],
        opacity: [1, 0],
      };
    },
    leave: {
      height: 0,
      opacity: [0, 1],
    },
  },
};

const STATE = {
  IDLE: 0,
  DESTROYED: 2,
};

export default {
  name: "notification",
  props: {
    group: {
      type: String,
      default: "",
    },
    width: {
      type: [Number, String],
      default: 300,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    position: {
      type: [String, Array],
      default: () => {
        return defaults.position;
      },
    },
    classes: {
      type: String,
      default: "notification",
    },
    animationType: {
      type: String,
      default: "css",
    },
    animation: {
      type: Object,
      default() {
        return defaults.velocityAnimation;
      },
    },
    animationName: {
      type: String,
      default: "v-fade",
    },
    speed: {
      type: Number,
      default: 300,
    },
    /* Todo */
    cooldown: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2500,
    },
    delay: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    ignoreDuplicates: {
      type: Boolean,
      default: false,
    },
    closeOnClick: {
      type: Boolean,
      default: false,
    },
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [],
      velocity: plugin.params.velocity,
      timerControl: "",
    };
  },
  mounted() {
    events.$on("add", this.addItem);
    events.$on("close", this.closeItem);
  },
  computed: {
    actualWidth() {
      return parseNumericValue(this.width);
    },
    active() {
      return this.list.filter((v) => v.state !== STATE.DESTROYED);
    },
    styles() {
      const { x, y } = listToDirection(this.position);
      const width = this.actualWidth.value;
      const suffix = this.actualWidth.type;
      let styles = {
        width: width + suffix,
        [y]: "0px",
      };
      if (x === "center") {
        styles["left"] = `calc(50% - ${width / 2}${suffix})`;
      } else {
        styles[x] = "0px";
      }
      return styles;
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    },
  },
  methods: {
    destroyIfNecessary (item) {
      this.$emit('click', item)
      if (this.closeOnClick) {
        this.destroy(item)
      }
    },
    getAnimation(index, el) {
      const animation = this.animation[index];
      return typeof animation === "function"
        ? animation.call(this, el)
        : animation;
    },
    enter(e) {
      console.log(e);
      const animation = this.getAnimation("enter", el);
      this.velocity(el, animation, {
        duration: this.speed,
        complete,
      });
    },
    leave({ el, complete }) {
      let animation = this.getAnimation("leave", el);
      this.velocity(el, animation, {
        duration: this.speed,
        complete,
      });
    },
    clean() {
      this.list = this.list.filter((v) => v.state !== STATE.DESTROYED);
    },
    destroy(item) {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;
      if (!this.isVA) {
        this.clean();
      }
      this.$emit("destroy", item);
    },
    destroyById(id) {
      const item = this.list.find((v) => v.id === id);
      if (item) {
        this.destroy(item);
      }
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    notifyClass(item) {
      return ["notification-template", this.classes];
    },
    notifyWrapperStyle(item) {
      return { transition: `all ${item.speed}ms` };
    },
    pauseTimeout() {
      if (this.pauseOnHover) {
        this.timerControl.pause();
      }
    },
    resumeTimeout() {
      if (this.pauseOnHover) {
        this.timerControl.resume();
      }
    },
    addItem(event) {
      event.group = event.group || "";
      event.data = event.data || {};
      if (this.group !== event.group) {
        return;
      }
      if (event.clean || event.clear) {
        this.destroyAll();
        return;
      }
      const duration =
        typeof event.duration === "number" ? event.duration : this.duration;
      const speed = typeof event.speed === "number" ? event.speed : this.speed;
      const ignoreDuplicates =
        typeof event.ignoreDuplicates === "boolean"
          ? event.ignoreDuplicates
          : this.ignoreDuplicates;
      let { title, text, type, data, id } = event;
      const item = {
        id: id || Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed,
        data,
      };
      if (duration >= 0) {
        this.timerControl = new Timer(
          () => this.destroy(item),
          item.length,
          item
        );
      }
      let direction = this.reverse ? !this.botToTop : this.botToTop;
      let indexToDestroy = -1;
      const isDuplicate = this.active.some((item) => {
        return item.title === event.title && item.text === event.text;
      });
      const canAdd = ignoreDuplicates ? !isDuplicate : true;
      if (!canAdd) return;
      if (direction) {
        this.list.push(item);
        if (this.active.length > this.max) {
          indexToDestroy = 0;
        }
      } else {
        this.list.unshift(item);
        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1;
        }
      }
      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy]);
      }
    },
  },
};
</script>

<style scoped>
.notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
  padding-bottom: 10px;
}
.notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}
.notification-title {
  font-weight: 600;
}
.notification-template {
  display: block;
  box-sizing: border-box;
  text-align: left;
}
.notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  margin: 0 10px 6px 0;
  color: white;
}
.v-fade-enter-active,
.v-fade-leave-active,
.v-fade-move {
  transition: all 0.3s;
}
.v-fade-enter,
.v-fade-leave-to {
  opacity: 0;
}
</style>
