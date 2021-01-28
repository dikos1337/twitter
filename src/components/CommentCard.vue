<template>
  <!-- TODO : Поменять дизайн  -->
  <v-card v-if="comment.user" class="mx-auto" tile flat>
    <v-card-title class="py-0">
      <v-list-item-avatar color="grey darken-3" size="32">
        <v-img
          class="elevation-6"
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
      <v-row align="center" justify="start">
        <span class="subtitle-2 font-weight-black mr-1">
          <router-link :to="`/${comment.user.slug}/`">
            {{ comment.user.name }}
          </router-link>
        </span>
        <span class="caption  ">@{{ comment.user.slug }}</span>
      </v-row>
    </v-card-title>

    <v-card-text class="font-weight-medium py-0">
      {{ comment.text }}
    </v-card-text>

    <v-card-actions class="py-0">
      <v-list-item>
        <span class="caption">
          {{ new Date(comment.created).toLocaleString() }}
        </span>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>

          <span class="subheading mr-2">{{ comment.likes }}</span>

          <!-- <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading mr-2">{{ tweet.reposts }}</span> -->

          <!-- <v-icon class="mr-1">
            mdi-comment
          </v-icon>
          <span class="subheading mr-2">{{ 0 }}</span> -->
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CommentCard",
  props: { comment: Object },
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
