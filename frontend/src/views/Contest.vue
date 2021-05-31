<template>
  <v-container class="ambient fill-height d-flex flex-row align-start" fluid>
    <v-row class="d-flex justify-center">
      <transition name="component-fade">
        <router-view></router-view>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
