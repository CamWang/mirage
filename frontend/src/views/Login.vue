<template>
  <v-container class="ambient container position-absolute max-height" fluid>
    <LoginForm />
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"
export default {
  name: "Login",
  components: {
    LoginForm
  }
}
</script>

<style>

</style>