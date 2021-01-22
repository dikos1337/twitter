<template>
  <v-card
    height="100vh"
    min-width="200px"
    max-width="10vw"
    style="position: sticky; top: 0; overflow-y: auto;"
  >
    <v-list color="transparent">
      <v-list-item v-for="link in links" :key="link.id" link>
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
export default {
  name: "LeftSideBar",

  data: () => ({
    // TODO: Добавить ссылки на страницу в список
    links: [
      { id: 1, name: "Home", icon: "mdi-home-variant" },
      { id: 2, name: "Explore", icon: "mdi-pound" },
      { id: 3, name: "Notifications", icon: "mdi-bell" },
      { id: 4, name: "Messages", icon: "mdi-email" },
      { id: 5, name: "Bookmarks", icon: "mdi-bookmark" },
      { id: 6, name: "Lists", icon: "mdi-format-list-bulleted" },
      { id: 7, name: "Profile", icon: "mdi-account" }
    ]
  })
};
</script>
