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
      <!-- <template v-slot:label>
      <div>Bio <small>(optional)</small></div>
    </template> -->
    </v-textarea>

    <v-btn
      color="blue lighten-1"
      rounded
      :disabled="!form.text.length"
      style="color:white"
      large
      @click="valideteForm"
    >
      Tweet
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "TweetInputField",
  data: () => ({
    form: {
      text: ""
    }
  }),
  methods: {
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
        })
        .catch(error => {
          console.log("create error", error);
        });
      // TODO redirect to details view
    }
  }
};
</script>
