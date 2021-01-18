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
      v => v.length >= 6 || "Password must be at least 6 characters"
    ]
  }),

  methods: {
    validate() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        this.login(this.email, this.password);
      }
    },
    login(email, password) {
      let context = this;
      this.$axios("/accounts/login/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: { email, password }
      })
        .then(response => {
          console.log("login", response);
          context.$router.push({ name: "Feed" });
        })
        .catch(error => {
          console.log("login", error);
        });
    }
  }
};
</script>
