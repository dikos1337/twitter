<template>
  <v-row justify="center">
    <v-dialog v-model="getDialogSignupState" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
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
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="toggleSignupDialogState">
            Close
          </v-btn>
          <v-btn color="blue" style="color:white;" text @click="validate">
            Sign up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Login from "@/components/Login.vue";

export default {
  name: "SignUpDialog",
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
  computed: {
    ...mapGetters(["getDialogLoginState", "getDialogSignupState"])
  },
  methods: {
    ...mapMutations(["toggleLoginDialogState", "toggleSignupDialogState"]),
    validate() {
      this.$refs.signUpForm.validate();
      if (this.valid) {
        this.signUp(this.name, this.email, this.password);
      }
    },
    signUp(name, email, password) {
      let context = this;
      this.$axios(context.$store.state.apiUrls.accounts.register, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: { name, email, password }
      })
        .then(response => {
          console.log("register", response);
          if (response.status === 201) {
            context.toggleSignupDialogState();
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
