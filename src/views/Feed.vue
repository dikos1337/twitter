<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links" :key="link" text :href="'#' + link">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <!-- <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          >
          </v-text-field> -->
        </v-responsive>
        <v-btn text>{{ name }}</v-btn>
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content> </v-list-item
                ><v-list-item-content>
                  <LogoutBtn />
                </v-list-item-content>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
              <br />
              <TweetCard />
              <br />
              <TweetCard />
              <br />
              <!-- <TweetCard />
              <br />
              <TweetCard />
              <br />
              <TweetCard /> -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import SignUp from "@/components/SignUp.vue";
// import Login from "@/components//Login.vue";
import TweetCard from "@/components//TweetCard.vue";
import LogoutBtn from "@/components//LogoutBtn.vue";

export default {
  name: "Home",
  // components: { SignUp, Login },
  components: { TweetCard, LogoutBtn },

  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    // username: "" // TODO наверно надо в стор закинуть
    name: "ad"
  }),
  methods: {},
  mounted() {
    // this.property = 'Example property update.'
    // console.log("created");
    let context = this;

    this.$axios
      .get("/accounts/current")
      .then(function(response) {
        context.$store.dispatch("SET_NAME", {
          name: response.data.name,
          isAuthenticated: true
        });
        console.log("current", response);
        context.name = response.data.name; // Может быть брать из стора
      })
      .catch(() => {
        context.$router.push({ name: "Home" });
      });
    // this.name = this.$store.state.authUser.name;
  }
};
</script>
