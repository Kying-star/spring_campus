<template>
  <p>{{ openid }}</p>
</template>

<script>
export default {
  setup() {
    const openid = localStorage.getItem("openid");
    return {
      openid
    };
  }
};
</script>

<style></style>
