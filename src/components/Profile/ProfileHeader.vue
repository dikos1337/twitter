<template>
  <v-card>
    <v-container class="py-2">
      <v-avatar class="mr-10" color="grey darken-1" size="128"></v-avatar>
      <v-spacer>{{ name }} </v-spacer>
      <v-spacer>@xE9nPVP5MyX</v-spacer>
      <v-spacer>Joined {{ joined_at }}</v-spacer>
      <v-spacer>29 Following 0 Followers</v-spacer>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ProfileHeader",
  data() {
    return {
      profileUrl: this.$route.params.profileUrl,
      name: "",
      joined_at: ""
    };
  },
  methods() {},
  mounted() {
    let context = this;
    let date_options = { year: "numeric", month: "long" };
    this.$axios
      .get(context.$store.state.apiUrls.accounts.current) // TODO + this.$route.params.profileUrl
      .then(function(response) {
        console.log("current", response);
        context.name = response.data.name;
        context.joined_at = new Date(
          response.data.joined_at
        ).toLocaleDateString("en-US", date_options);
      })
      .catch(() => {
        context.$router.push({ name: "Home" });
      });
  }
};
</script>

<style></style>
