<template>
  <!-- TODO : Поменять дизайн  -->
  <v-card v-if="comment.user" class="mx-auto" tile flat>
    <v-card-title>
      <v-list-item-avatar color="grey darken-3">
        <v-img
          class="elevation-6"
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <router-link :to="`/${comment.user.slug}/`">
            {{ comment.user.name }}
          </router-link>
        </v-list-item-title>
        <v-list-item-subtitle>@{{ comment.user.slug }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ comment.text }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <span>
          <router-link :to="`/${comment.user.slug}/status/${comment.id}`">
            {{ new Date(comment.created).toLocaleString() }}
          </router-link>
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
</style>
