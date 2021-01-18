<template lang="html">
  <v-form ref="loginForm" v-model="valid">
    <v-container>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
        @keyup.enter="validate"
      >
      </v-text-field>
      <v-btn color="primary" class="mr-4" @click="validate">
        Login
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
// import axios from "axios";

export default {
  name: "Login",

  data: () => ({
    email: "",
    password: "",

    valid: false,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Password must be at least  8 characters"
    ]
  }),

  methods: {
    validate() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        this.login();
      }
    },
    login() {
      let context = this;
      this.$axios
        .post(
          "/accounts/login/",
          {
            email: this.email,
            password: this.password
          },
          {
            headers: {
              "content-type": "application/json"
            }
          }
        )
        .then(function(response) {
          console.log(response);
          context.$store.dispatch("SET_NAME", {
            name: response.data.name,
            isAuthenticated: true
          });
          context.$router.push({ name: "Feed" });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // authenticate() {
    //   const payload = {
    //     username: this.username,
    //     password: this.password
    //   };
    //   axios
    //     .post(this.$store.state.endpoints.obtainJWT, payload)
    //     .then(response => {
    //       this.$store.commit("updateToken", response.data.token);
    //       // get and set auth user
    //       const base = {
    //         baseURL: this.$store.state.endpoints.baseUrl,
    //         headers: {
    //           // Set your Authorization to 'JWT', not Bearer!!!
    //           Authorization: `JWT ${this.$store.state.jwt}`,
    //           "Content-Type": "application/json"
    //         },
    //         xhrFields: {
    //           withCredentials: true
    //         }
    //       };
    //       // Even though the authentication returned a user object that can be
    //       // decoded, we fetch it again. This way we aren't super dependant on
    //       // JWT and can plug in something else.
    //       const axiosInstance = axios.create(base);
    //       axiosInstance({
    //         url: "/user/",
    //         method: "get",
    //         params: {}
    //       }).then(response => {
    //         this.$store.commit("setAuthUser", {
    //           authUser: response.data,
    //           isAuthenticated: true
    //         });
    //         this.$router.push({ name: "Home" });
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       console.debug(error);
    //       console.dir(error);
    //     });
    // }
  }
};
</script>
