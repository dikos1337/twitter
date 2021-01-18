<template lang="html">
  <v-form ref="signUpForm" v-model="valid">
    <v-container>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="50"
        label="Name"
        required
      ></v-text-field>
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
        Sign Up
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "SignUp",
  data: () => ({
    name: "",
    email: "",
    password: "",

    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 50 || "Name must be less than 50 characters",
      v => v.length >= 2 || "Name must at least 2 characters"
    ],
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
      this.$refs.signUpForm.validate();
      if (this.valid) {
        this.signUp(this.name, this.email, this.password);
      }
    },
    signUp(name, email, password) {
      let context = this;
      this.$axios("/accounts/register/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: { name, email, password }
      })
        .then(response => {
          console.log("register", response);
          if (response.status === 201) {
            Login.methods.login.call(context, this.email, this.password);
          }
        })
        .catch(error => {
          console.log("register", error);
        });
    }
  }
};
</script>
