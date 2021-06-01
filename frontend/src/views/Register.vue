<template>
  <v-container class="ambient container position-absolute max-height" fluid>
    <RegisterForm />
  </v-container>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue"
export default {
  name: "Register",
  components: {
    RegisterForm
  }
}
</script>

<style>

</style>