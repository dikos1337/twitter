<template>
  <v-btn @click="logout" text>
    logout
  </v-btn>
</template>

<script>
export default {
  name: "LogoutBtn",
  methods: {
    logout() {
      let context = this;
      this.$axios
        .post("/accounts/logout/")
        .then(response => {
          console.log("logout", response);
          context.$router.push({ name: "Home" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
