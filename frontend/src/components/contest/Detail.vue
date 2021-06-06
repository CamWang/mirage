<template>
  <div class="contest-detail">
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