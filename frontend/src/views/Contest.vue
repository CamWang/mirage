<template>
  <v-container class="ambient fill-height d-flex flex-row align-start" fluid>
    <v-row class="d-flex justify-center">
      <v-col class="col-lg-8 col-md-10 col-12">
        <v-sheet min-height="20vh" rounded="lg">
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>