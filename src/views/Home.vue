<template>
  <div data-app>
    <br />
    <v-row justify="center">
      <v-dialog v-model="signupDialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Sign Up
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <SignUp v-if="signupDialog" />
        </v-card>
      </v-dialog>
      <v-dialog v-model="loginDialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Login
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <Login v-if="loginDialog" />
        </v-card>
      </v-dialog>
    </v-row>
    <br />
    <v-btn color="blue" @click="logout">
      logout
    </v-btn>
  </div>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import Login from "@/components//Login.vue";

export default {
  name: "Home",
  components: {
    SignUp,
    Login
  },
  data: () => ({
    // dialog: false,
    loginDialog: false,
    signupDialog: false
  }),

  methods: {
    logout() {
      this.$axios
        .post("/accounts/logout/")
        .then(response => {
          console.log("logout", response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    let context = this;
    this.$axios.get("/accounts/current").then(function(response) {
      console.log("current", response);
      if (response.status == 200) {
        context.$router.push({ name: "Feed" }).catch(() => {});
      }
    });
  }
};
</script>
