<template>
  <div>
      <Auth title="Логин" back-link="/register"  />
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";

export default {
    name: "Login",
    components: {Auth}
}
</script>

<style scoped>

</style>