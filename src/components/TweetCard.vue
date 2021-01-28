<template>
  <!-- v-if="tweet.user" means won’t try to render unless tweet.user is defined -->
  <v-card v-if="tweet.user" class="mx-auto" tile flat>
    <v-card-title class="py-0">
      <v-list-item-avatar color="grey darken-3">
        <v-img
          class="elevation-6"
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <router-link :to="`/${tweet.user.slug}/`">
            {{ tweet.user.name }}
          </router-link>
        </v-list-item-title>
        <v-list-item-subtitle>@{{ tweet.user.slug }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ tweet.text }}
    </v-card-text>

    <v-card-actions class="py-0">
      <v-list-item class="grow">
        <span>
          <router-link :to="`/${tweet.user.slug}/status/${tweet.id}`">
            {{ new Date(tweet.created).toLocaleString() }}
          </router-link>
        </span>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>

          <span class="subheading mr-2">{{ tweet.likes }}</span>

          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading mr-2">{{ tweet.reposts }}</span>
          <v-icon class="mr-1">
            mdi-comment
          </v-icon>
          <span class="subheading mr-2">{{ 0 }}</span>
          <!-- FIXME replace 0 with tweet.comment.count -->
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TweetCard",
  props: { tweet: Object },
  data: () => ({}),
  created() {}
};
</script>

<style scoped>
a:link {
  text-decoration: none;
  color: inherit;
}

a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

a:active {
  text-decoration: underline;
}

.v-card.v-sheet.theme--light {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
/* .v-card__actions {
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
  padding: 0px;
} */
.v-card:hover {
  background-color: rgba(33, 150, 243, 0.05);
}
</style>
