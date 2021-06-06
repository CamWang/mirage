<template>
  <div>
    detail
  </div>
</template>

<script>
export default {
  name: "ContestRank",
  props: {
    contest: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      rank: {}
    }
  },
  mounted() {
    this.getRank();
  },
  methods: {
    getRank() {
      if (!this.contest.id) {
        return; 
      }
      const contestId = this.contest.id;
      this.axios
        .get("/contest/rank", { params: { id: contestId } })
        .then((response) => {
          this.rank = response.data.rank;
        })
        .catch((error) => {})
        .finally(() => {
        });
    }
  }
}
</script>

<style>

</style>