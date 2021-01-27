<template>
  <v-card
    height="100vh"
    min-width="200px"
    max-width="10vw"
    style="position: sticky; top: 0; overflow-y: auto;"
    tile
    flat
  >
    <div class="TODO"><LogoutBtn /></div>
  </v-card>
</template>

<script>
import LogoutBtn from "@/components/LogoutBtn.vue";

export default {
  name: "RightSideBar",
  components: {
    LogoutBtn
  }
};
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>
