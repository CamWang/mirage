<template>
  <v-container class="ambient container" fluid>
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