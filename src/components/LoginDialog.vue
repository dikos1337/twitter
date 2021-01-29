<template>
  <v-row justify="center">
    <v-dialog v-model="getDialogLoginState" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
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
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="toggleLoginDialogState">
            Close
          </v-btn>
          <v-btn color="blue" style="color:white;" text @click="validate">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LoginDialog",
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
  computed: {
    ...mapGetters(["getDialogLoginState", "getDialogSignupState"])
  },
  methods: {
    ...mapMutations(["toggleLoginDialogState", "toggleSignupDialogState"]),
    validate() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        this.login(this.email, this.password);
      }
    },
    login(email, password) {
      let context = this;
      this.$axios(context.$store.state.apiUrls.accounts.login, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: { email, password }
      })
        .then(response => {
          console.log("login", response);
          context.toggleLoginDialogState();
          context.$router.push({ name: "Feed" });
        })
        .catch(error => {
          console.log("login", error);
        });
    }
  }
};
</script>
