<template>
  <div class="rank-container">
    <div class="rank-header">
      <div class="rank-number">{{ $t("contest.rank.name") }}</div>
      <div class="rank-profile">
        <p class="subtitle-1">{{ $t("contest.rank.nickname") }}</p>
        <p class="subtitle-2">{{ $t("contest.rank.username") }}</p>
      </div>
      <div class="rank-score">
        <p>{{ $t("contest.rank.score.name") }}</p>
        <p>{{ $t("contest.rank.score.time") }}</p>
      </div>
      <div class="rank-info">
        <div class="rank-code">A</div>
        <div class="rank-code">B</div>
        <div class="rank-code">C</div>
        <div class="rank-code">D</div>
      </div>
    </div>

    <transition-group name="list">
      <div class="rank-row" v-for="rank in rank.list" :key="rank.rank">
      <div class="rank-number">{{ rank.rank }}</div>
      <div class="rank-profile">
        <p class="subtitle-1">{{ rank.user.nickname }}</p>
        <p class="subtitle-2">{{ rank.user.username }}</p>
      </div>
      <div class="rank-score">
        <p>{{ rank.score.count }}</p>
        <p>{{ rank.score.time }}</p>
      </div>
      <div class="rank-info">
        <div class="rank-item" v-for="info in rank.results" :key="info.problemId" :class="getRankItemStyle(info)">
          <p class="rank-item-time">{{ info.time?info.time:"&nbsp;" }}</p>
          <p>{{ info.try }} try</p>
        </div>
      </div>
    </div>
    </transition-group>

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
    },
    getRankItemStyle(info) {
      if (info.fb) {
        return "rank-item-fb"
      } else if (info.result === 0) {
        return "rank-item-def";
      } else if (info.result === 9) {
        return "rank-item-ac";
      } else {
        return "rank-item-wa";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-container {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: auto;
  min-height: 320px;

  p {
    margin: 0;
  }

  .rank-header {
    display: flex;
    flex-direction: row;
    height: 4.5rem;

    .rank-score {
      width: 4.8rem;
      font-size: 0.9rem;
      text-align: center;
      padding: 0.8rem 0.2rem;
      border: #888 1px solid;
    }

    .rank-number {
      width: 3.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 1.2rem 0;
      text-align: center;
      border:  1px #888 solid;
      border-top: 0;
      border-left: 0;
    }
  }

  .rank-row {
    display: flex;
    flex-direction: row;
    height: 4.5rem;

    .rank-item {
      color: #000;
      text-align: center;
    }

    .rank-number {
      width: 3.5rem;
      font-size: 1rem;
      text-align: center;
      font-weight: 600;
      padding: 1rem 0.6rem;
      border: 1px #888 solid;
      border-right: 0;
      border-left: 0;
    }

    .rank-score {
      width: 4.8rem;
      font-size: 1rem;
      text-align: center;
      padding: 0.6rem 0.2rem;
      border: #888 1px solid;
    }

    .rank-item-ac {
      background: #00e676;
    }

    .rank-item-fb {
      background: #7c4dff;
      color: #fff;
    }

    .rank-item-wa {
      background: #ff5252;
    }

    .rank-item-def {
      background: #eee;
    }

    .rank-item-time {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .rank-profile {
    overflow: hidden;
    width: 14rem;
    border: 1px solid #888;
    padding: 0.5rem 0.6rem;
    text-align: right;
  }

  .rank-info {
    display: flex;
    flex-direction: row;

    .rank-item {
      width: 6rem;
      border: 1px solid #888; 
      padding: 0.5rem 0.6rem;
    }

    .rank-code {
      width: 6rem;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 0.8rem 0.6rem;
      border: 1px solid #888;
    }
  }
}

.list-item {
  display: inline-block;
}
.list-enter-active, .list-leave-active {
  transition: all 0.8s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>