<template>
  <v-sheet min-height="70vh" rounded="lg">
    <div v-if="!$store.state.isAuthenticated">
      <SignUp />
      <br />
      <Login />
    </div>
  </v-sheet>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import SignUp from "@/components/SignUp.vue";
import Login from "@/components//Login.vue";

export default {
  name: "Home",
  components: { SignUp, Login },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  })
};
</script>
