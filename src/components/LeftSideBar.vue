<template>
  <v-card height="100vh" min-width="10vw">
    <v-list color="transparent">
      <v-list-item v-for="link in links" :key="link.id" link>
        <v-list-item-content>
          <v-list-item-title> {{ link.name }} </v-list-item-title>
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
      { id: 1, name: "Home" },
      { id: 2, name: "Explore" },
      { id: 3, name: "Notifications" },
      { id: 4, name: "Messages" },
      { id: 5, name: "Bookmarks" },
      { id: 6, name: "Lists" },
      { id: 7, name: "Profile" }
    ]
  })
};
</script>
