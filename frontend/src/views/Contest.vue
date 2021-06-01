<template>
  <v-container class="ambient position-absolute max-height" fluid>
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
