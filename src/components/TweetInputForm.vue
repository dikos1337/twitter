<template>
  <v-container>
    <v-textarea
      v-model="form.text"
      color="teal"
      placeholder="What's happening?"
      counter="300"
      rows="1"
      auto-grow
    >
    </v-textarea>
    <v-row justify="end">
      <v-btn
        color="blue lighten-1"
        class="mt-4 mr-2 mb-1"
        style="color:white"
        @click="valideteForm"
        :disabled="!form.text.length"
        depressed
        rounded
        large
      >
        Tweet
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TweetInputField",
  data: () => ({
    form: {
      text: ""
    }
  }),
  computed: { ...mapGetters(["getUserSlug", "getDialogMakeTweetState"]) },
  methods: {
    ...mapMutations(["toggleMakeTweetDialogState"]),
    valideteForm() {
      // TODO some validations
      this.sendTweet();
    },
    sendTweet() {
      let context = this;
      this.$axios(context.$store.state.apiUrls.tweet.create, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: { text: context.form.text }
      })
        .then(response => {
          console.log("create", response);
          context.form.text = ""; // clear input

          // Если твит создавался из popup окна то его надо закрыть
          if (context.getDialogMakeTweetState) {
            context.toggleMakeTweetDialogState();
          }
          context.$router.push({
            name: "TweetDetails",
            params: { tweetId: response.data.id, userSlug: context.getUserSlug }
          }); // redirect to details view
        })
        .catch(error => {
          console.log("create error", error);
        });
    }
  }
};
</script>
