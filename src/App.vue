<script>
import { getLocalStorage } from "@/utils/local-storage";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = getLocalStorage("user");
  },
};
</script>

<template>
  <div >
    <Navbar />

    <main >
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  /*width: 1280px;*/
  margin: 0 auto 0;
}
</style>
