<template>
  <div class="rank-container">
    <div class="rank-header">
      <div class="rank-number">Rank</div>
      <div class="rank-profile">
        <p class="subtitle-1">昵称</p>
        <p class="subtitle-2">用户名</p>
      </div>
      <div class="rank-info">
        <div class="rank-code">A</div>
        <div class="rank-code">B</div>
        <div class="rank-code">C</div>
        <div class="rank-code">D</div>
      </div>
    </div>

    <div class="rank-row">
      <div class="rank-number">1</div>
      <div class="rank-profile">
        <p class="subtitle-1">Admin</p>
        <p class="subtitle-2">admin</p>
      </div>
      <div class="rank-info">
        <div class="rank-item"></div>
        <div class="rank-item"></div>
        <div class="rank-item"></div>
        <div class="rank-item"></div>
      </div>
    </div>
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

<style lang="scss" scoped>
.rank-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;

  p {
    margin: 0;
  }

  .rank-header {
    display: flex;
    flex-direction: row;
    border: #eee 1px solid;
    height: 4.5rem;

    .rank-number {
      width: 3.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.5rem 0.6rem;
      border: green 1px solid;
    }
  }

  .rank-row {
    display: flex;
    flex-direction: row;
    border: 1px solid red;
    height: 4.5rem;

    .rank-number {
      width: 3.5rem;
      font-size: 1rem;
      text-align: center;
      font-weight: 600;
      padding: 0.5rem 0.6rem;
      border: green 1px solid;
    }
  }

  .rank-profile {
    overflow: hidden;
    width: 9rem;
    border: 1px solid blue;
    padding: 0.5rem 0.6rem;
    text-align: right;
  }

  .rank-info {
    display: flex;
    flex-direction: row;

    .rank-item {
      width: 6rem;
      border: 1px solid yellow; 
      padding: 0.5rem 0.6rem;
    }

    .rank-code {
      width: 6rem;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 0.5rem 0.6rem;
      border: 1px solid cyan;
    }
  }
}
</style>