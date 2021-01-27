<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col align="center">
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h1>Sorry, that page doesn’t exist!</h1>
                <p class="py-5">
                  Why not try a
                  <router-link to="/explore">search</router-link> to find
                  something else?
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LeftSideBar from "@/components/LeftSideBar.vue";

export default {
  name: "NotFound",
  components: { LeftSideBar }
};
</script>

<style scoped>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  text-decoration: underline;
}
</style>
