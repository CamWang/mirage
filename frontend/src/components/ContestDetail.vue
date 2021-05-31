<template>
  <v-col class="contest-detail col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="goContestList">
            <v-icon>{{ mdiTrophy }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          {{ $t("contest.detail.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-1"
              color="blue"
              label
              text-color="white"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiPulse }}
              </v-icon>
              {{ $t() }}
            </v-chip>
          </template>
        </v-tooltip>
      </v-toolbar>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiTrophyVariantOutline
} from "@mdi/js"
export default {
  name: "ProblemDetail",
  
  data() {
    return {
      mdiTrophy: mdiTrophyVariantOutline,
      mdiPulse: mdiClipboardPulseOutline,

      isLoading: false,
      contest: {
        
      },
    }
  },

  mounted() {

  },

  methods: {
    goContestList() {

    },

    getContestStatus() {

    }
  }
}
</script>

<style scoped>
.contest-detail {
  position: absolute;
}
</style>