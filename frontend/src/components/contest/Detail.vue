<template>
  <div class="contest-detail">
    <v-row class="d-flex">
        <v-col class="col-md-8 col-12 pl-9 pr-4 pt-8">
          <h2>{{ this.contest.title }}</h2>
          <p class="mb-2">{{ this.contest.description }}</p>
        </v-col>
        <v-col class="col-md-4 col-12 pr-6 pl-md-0 pl-9 pt-md-6 pt-0">
          <p class="mb-2">{{ $t("contest.list.start") }}: {{ $d(new Date(contest.start?contest.start:0), "long") }}</p>
          <p class="mb-2">{{ $t("contest.list.end") }}: {{ $d(new Date(contest.end?contest.end:0), "long") }}</p>
          <p class="mb-2">{{ $t("contest.detail.type") }}: {{ contest.type === 0?"OI":"ACM" }}</p>
        </v-col>
      </v-row>

      <v-progress-linear
          v-model="progress"
          class="mt-2"
          color="primary"
          height="8"
          striped
        >
      </v-progress-linear>

      <v-data-table
        :headers="headers"
        :items="contest.problems"
        hide-default-footer
        class="elevation-1"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getProblemStatusColor(item.status)"
            text-color="white"
            label
          >
            {{ $t(`status.full[${item.status}]`) }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.name="{ item }">
          <a style="color: inherit" @click="goProblemDetail(item)">{{ item.name }}</a>
        </template>
      </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ContestDetails",
  props: {
    contest: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t("contest.detail.status.code"), value: "code" },
        { text: this.$t("problem.list.title"), value: "name" },
        { text: this.$t("contest.detail.status.name"), value: "status" }
      ]
    }
  },
  computed: {
    progress: function() {
      const now = Date.now();
      const start = this.contest.start;
      const end = this.contest.end;
      if (end < now) {
        return 100
      } else if (start > now) {
        return 0
      } else {
        return (((end - now)/(end - start)) * 100).toFixed(0);
      }
    }
  },
  methods: {
    getProblemStatusColor(status) {
      if (status === 0) {
        return "deep"
      } else if (status === 8) {
        return "error"
      } else if (status === 9) {
        return "success"
      } else {
        return "warning"
      }
    },
    goProblemDetail(item) {
      this.$router.push(`/problem/detail/${item.id}`);
    },
  }
}
</script>

<style>

</style>