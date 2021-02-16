<template>
  <v-row justify="center">
    <v-dialog
      v-model="getDialogReplyState"
      @click:outside="toggleReplyDialogState"
      max-width="600px"
    >
      <v-card>
        <TweetCard :tweet="getReplyTweetData" />
        <v-container>
          <v-textarea
            v-model="form.text"
            color="teal"
            placeholder="Tweet your reply"
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
              Reply
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import TweetCard from "@/components/TweetCard.vue";

export default {
  name: "ReplyInputFormDialog",
  components: { TweetCard },
  data: () => ({
    form: {
      text: ""
    },
    tweetData: {}
  }),
  computed: {
    ...mapGetters([
      "getDialogReplyState",
      "getReplyTweetData",
      "getCommentsToRender"
    ])
  },
  methods: {
    ...mapMutations(["toggleReplyDialogState", "setCommentsToRender"]),
    valideteForm() {
      this.sendReply();
    },
    sendReply() {
      let context = this;
      this.$axios(context.$store.state.apiUrls.tweet.createComment, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: {
          tweet: context.getReplyTweetData.id,
          text: context.form.text
        }
      })
        .then(response => {
          console.log("createComment", response);
          // TODO запушить коммент в коммент стейт

          context.form.text = ""; // clear input
          // close the dialog after creating a reply
          if (context.getDialogReplyState) {
            context.toggleReplyDialogState();
          }
        })
        .catch(error => {
          console.log("create error", error);
        });
    }
  }
};
</script>
