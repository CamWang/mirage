<template>
  <v-app>

  <router-view name="head"></router-view>

  <v-main>
    <transition name="component-fade">
      <router-view class="router"></router-view>
    </transition>
  </v-main>

  <router-view name="foot" v-if="false"></router-view>
  <notification></notification>
  
</v-app>
</template>

<script>
export default {

}
</script>

<style>
@import './style/style.scss';
</style>
<style scoped>
.router {
  position:absolute;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>