<template>
  <div data-app>
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
          <Login v-if="loginDialog" />
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
  </div>
</template>

<script>
// @ is an alias to /src
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
  })
};
</script>
