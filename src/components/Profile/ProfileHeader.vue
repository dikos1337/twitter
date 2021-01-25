<template>
  <v-container py-2>
    <v-card flat>
      <v-row>
        <v-col cols="auto" class="pr-0">
          <v-avatar color="blue darken-1" size="128" />
        </v-col>
        <v-col cols="auto" class="pa-0">
          <v-card-title>{{ userData.name }} </v-card-title>
          <v-card-subtitle>@{{ userData.slug }}</v-card-subtitle>
          <v-card-text class="py-0"
            >Joined {{ userData.joined_at }}</v-card-text
          >
          <v-card-text class="py-0">
            29 Following 0 Followers
            <!-- TODO FIX ME -->
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: { userData: Object },
  data: () => ({}),
  methods: {},
  created() {
    // let context = this;
    let date_options = { year: "numeric", month: "long" };
    this.userData.joined_at = new Date(
      this.userData.joined_at
    ).toLocaleDateString("en-US", date_options);
  }
};
</script>

<style></style>
