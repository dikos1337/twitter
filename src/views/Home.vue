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
      </v-dialog> </v-row
    ><br />
    <v-btn color="blue" @click="axiosCall">
      Axios call
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from "@/components/SignUp.vue";
import Login from "@/components//Login.vue";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

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
    axiosCall() {
      console.log("axiosCall");
      this.$axios("/accounts/register/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: {
          name: `some name`,
          email: `test@test.com`,
          password: "324824"
        }
      });

      // axiosCall() {
      //       console.log("axiosCall");
      //       this.$axios("/accounts/login/", {
      //         method: "POST",
      //         headers: {
      //           "content-type": "application/json"
      //         },
      //         data: {
      //           // name: "namesad",
      //           email: "test2@test.com",
      //           password: "324824"
      //         }
      //       });
    }
  }
};
</script>
