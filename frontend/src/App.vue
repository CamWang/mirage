<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat class="app-bar">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" size="42">
          <img src="@/static/image/avatar.jpg" alt="Heading" />
        </v-avatar>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3 pb-5">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet class="pa-6" rounded="lg">
              <div class="text-h4 mt-5 mx-lg-3 font-weight-light">
                Online Judge Demand Collect
              </div>
              <v-form
                class="mx-lg-3 mb-3"
                ref="form"
                lazy-validation
              >
                <v-text-field
                  v-model="nickname"
                  :counter="20"
                  label="Nickname"
                  required
                  :rules="nameRules"
                  class="my-3"
                ></v-text-field>
                <v-textarea
                  outlined
                  name="content"
                  :counter="200"
                  label="Your Suggestion"
                  clearable
                  clear-icon="mdi-close-circle"
                  no-resize
                  rows="5"
                  v-model="content"
                  :rules="contentRules"
                  required
                  class="my-3"
                ></v-textarea>
                <v-btn
                  :loading="loading"
                  depressed
                  @click="submit"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet v-for="item in list" :key="item._id" class="pa-6 mb-5" rounded="lg">
              <div class="text-h6 my-1 mx-lg-3">{{ item.nickname }}</div>
              <p class="my-1 mx-lg-3">
                {{ item.content }}
              </p>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row v-if="total">
          <v-col class="text-right">
            <v-pagination
              v-model="page"
              :length="Math.ceil(total/20)"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" :color="color" timeout="6000" class="mb-5">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      loading: false,
      content: "",
      nickname: "",
      snackbar: false,
      list: [],
      page:1,
      current: 0,
      total: 0,
      text: "Default Message",
      color: "success",
      nameRules: [
        (v) => !!v || "Nickname is required",
        (v) =>
          (v && v.length <= 20) || "Nickname must be less than 20 characters",
      ],
      contentRules: [
        (v) => !!v || "Suggestion is required",
        (v) =>
          (v && v.length <= 200) ||
          "Suggestion must be less than 200 characters",
      ],
    };
  },
  watch: {
    page: function() {
      this.current = (this.page - 1) * 20;
      this.getList()
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        fetch(
          "http://42.193.116.219:3000/demand?" +
            "nickname=" +
            encodeURIComponent(this.nickname) +
            "&content=" +
            encodeURIComponent(this.content)
        ,{
          method: "POST",
        }).then(response => {
          return response.json();
        }).then(result => {
          if (result.status === 0) {
            this.color = "success";
            this.text = result.message;
            this.snackbar = true;
            setTimeout(() => {
              this.getList();
            }, 1000);
          } else {
            this.color = "red";
            this.text = result.message;
            this.snackbar = true;
          }
        }).catch(err => {
          this.color = "red";
          this.text = "Server Error. Please contact QQ:915852444";
          this.snackbar = true;
        }).finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      } else {
        this.color = "red";
        this.text = "Please fill in forms";
        this.snackbar = true;
      }
    },
    getList() {
      fetch("http://42.193.116.219:3000/demand?start=" + this.current, {
        method: "GET",
      }).then(response => {
        return response.json();
      }).then(result => {
        if (result.status === 0) {
          this.list = result.content;
          this.total = result.total;
          this.current = result.skip;
        } else {
          this.color = "red";
          this.text = result.message;
          this.snackbar = true;
        }
      })
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
</style>