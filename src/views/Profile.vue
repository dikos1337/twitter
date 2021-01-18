<template>
  <h1>profileUrl: {{ profileUrl }}</h1>
</template>

<script>
export default {
  data() {
    return {
      profileUrl: this.$route.params.profileUrl
    };
  },
  methods() {},
  mounted() {}
};
</script>
