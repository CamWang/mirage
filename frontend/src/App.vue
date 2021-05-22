<template>
  <v-app>

  <v-app-bar app>
    <router-view name="head"></router-view>
  </v-app-bar>

  <v-main class="grey lighten-3 pb-5">
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <router-view name="foot"></router-view>
  </v-footer>
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