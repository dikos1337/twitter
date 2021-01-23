<template>
  <v-card
    height="100vh"
    min-width="200px"
    max-width="10vw"
    style="position: sticky; top: 0; overflow-y: auto;"
  >
    <v-list color="transparent">
      <v-list-item v-for="link in links" :key="link.id" :to="link.url" link>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left color="blue"> {{ link.icon }} </v-icon>{{ link.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item link color="grey lighten-4">
        <v-list-item-content>
          <v-list-item-title>
            Tweet
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
// let userSlug = "xE9nPVP5MyXMdWF",

export default {
  name: "LeftSideBar",

  data() {
    return {
      // TODO: Добавить ссылки на страницу в список
      links: [
        { id: 1, name: "Home", icon: "mdi-home-variant", url: "/feed" },
        { id: 2, name: "Explore", icon: "mdi-pound", url: "/explore" },
        {
          id: 3,
          name: "Notifications",
          icon: "mdi-bell",
          url: "/notifications"
        },
        { id: 4, name: "Messages", icon: "mdi-email", url: "/messages" },
        { id: 5, name: "Bookmarks", icon: "mdi-bookmark", url: "/bookmarks" },
        {
          id: 6,
          name: "Lists",
          icon: "mdi-format-list-bulleted",
          url: "/explore/"
        },
        { id: 7, name: "Profile", icon: "mdi-account", url: `/${"userSlug"}` }
      ]
    };
  }
};
</script>
