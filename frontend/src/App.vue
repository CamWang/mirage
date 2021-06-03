<template>
  <v-app>
    <router-view name="head"></router-view>

    <v-main>
      <transition name="component-fade">
        <router-view class="router positon-absolute max-height"></router-view>
      </transition>
    </v-main>

    <router-view name="foot" v-if="false"></router-view>
    <notification></notification>
    <Message class="message" />
    
  </v-app>
</template>

<script>
import Message from "@/components/Message.vue"
export default {
  name: "App",
  components: {
    Message
  },
  mounted() {
  },
  data() {
    return {
      drawer: null,
    };
  },
};
</script>

<style lang="scss">
@import "./style/style.scss";
</style>
<style>
@import "./style/katex.css";

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
<style scoped>
</style>
