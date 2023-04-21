<template>
  <div id="dentists" class="w-[1280px] text-center my-16 mx-auto px-8">
    <h1 class="text-5xl font-medium mb-12">Врачи-стоматологи клиники</h1>

    <div class="flex w-full flex-wrap gap-8">
      <div
        v-for="(dentist, index) in dentists"
        :key="index"
        class="w-[31%] bg-blue-100 rounded-xl p-8 relative cursor-pointer hover:scale-105 transition"
        @click="$router.push({ name: 'dentist_id', params: { id: dentist.id } })"
      >
        <p class="text-xl">{{ dentist.job }}</p>
        <h1 class="text-3xl text-blue-500">{{ dentist.job }} {{ dentist.lastname }}</h1>
        <p class="text-xl mb-8">Опыт работы: 9 лет</p>
        <img src="../../assets/intro-man.jpg" class="rounded-full" />
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Dentists",
  data() {
    return {
      loading: false,
      dentists: [],
    };
  },
  async created() {
    this.loading = true;
    await this.getDentists();
    this.loading = false;
  },
  methods: {
    async getDentists() {
      const response = await axiosInstance.get("/emp/getAllEmployers");
      this.dentists = response.data.employers;
      console.log(response.data);
    },
  },
};
</script>

<style scoped></style>
