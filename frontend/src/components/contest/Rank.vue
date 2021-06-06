<template>
  <div>
    {{ contest.title }}
  </div>
</template>

<script>
export default {
  name: "ContestRank",
  props: {
    contest: {
      default: {},
      type: Object
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>