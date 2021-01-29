<template>
  <v-row justify="center">
    <v-dialog
      v-model="getDialogMakeTweetState"
      @click:outside="toggleMakeTweetDialogState"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create a tweet</span>
        </v-card-title>
        <TweetInputForm />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import TweetInputForm from "@/components/TweetInputForm.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TweetInputFormDialog",
  components: { TweetInputForm },
  computed: {
    ...mapGetters(["getDialogMakeTweetState"])
  },
  methods: {
    ...mapMutations(["toggleMakeTweetDialogState"])
  }
};
</script>
