<template>
  <v-card class="mx-auto" flat :href="`/${profileUrl}/status/${tweet.id}`">
    <v-card-title>
      <v-list-item-avatar color="grey darken-3">
        <v-img
          class="elevation-6"
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ userData.name }}</v-list-item-title>
      </v-list-item-content>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ tweet.text }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <span>{{ new Date(tweet.created).toLocaleString() }}</span>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>

          <span class="subheading mr-2">{{ tweet.likes }}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading">{{ tweet.reposts }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TweetCard",
  props: { tweet: Object, userData: Object, profileUrl: String },
  data: () => ({}),
  mounted() {}
};
</script>
