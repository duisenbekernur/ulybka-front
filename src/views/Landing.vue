<template>

      <NavLanding />
  <div class="">

      <Intro />

      <About />

      <Services />

      <Dentists />

      <Contact />
  </div>

</template>

<script>
import Intro from "@/components/landing/Intro.vue";
import About from "@/components/landing/About.vue";
import Services from "@/components/landing/Services.vue";
import Dentists from "@/components/landing/Dentists.vue";
import Contact from "@/components/landing/Contact.vue";
import NavLanding from "@/App.vue";

export default {
    name: "Landing",
    components: {NavLanding, Contact, Dentists, Services, About, Intro}
}
</script>

<style scoped>

</style>