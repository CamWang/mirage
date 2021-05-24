<template>
  <v-app>

  <router-view name="head"></router-view>

  <v-main class="pb-5">
    <transition name="fade">
      <router-view class="router"></router-view>
    </transition>
  </v-main>

  <router-view name="foot"></router-view>
  <notification></notification>
  
</v-app>
</template>

<script>
export default {

}
</script>

<style>
@import './style/style.css';
</style>
<style scoped>
.router {
  position:absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>