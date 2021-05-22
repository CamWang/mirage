<template>
  <v-app>

  <router-view name="head"></router-view>

  <v-main class="pb-5">
    <router-view></router-view>
  </v-main>

  <router-view name="foot"></router-view>
  
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

</style>