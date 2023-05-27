<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Басты бет</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/dentists' }">Стоматологтар</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="text-center text-3xl font-medium mb-8">Клиниканың стоматологтары</h1>

    <div v-loading="loading" class="flex flex-wrap gap-4 justify-center">
      <el-card v-for="item in dentists" :body-style="{ padding: '0px' }" class="relative w-80">
        <img class="w-[350px] h-[250px]" :src="item.avatar" alt="dentist" />
        <div class="flex justify-between items-center" style="padding: 14px">
          <div class="flex flex-col gap">
            <span class="text-lg font-medium">{{ item.lastname + " " + item.firstname }}</span>
            <span>{{ item.job }}</span>
            <span class="mb-4">Жұмыс тәжірибесі: 5 жыл</span>
          </div>
          <router-link :to="{ name: 'dentist_id', params: { id: item.id } }">
            <el-button plain type="primary">> </el-button>
          </router-link>
        </div>
      </el-card>
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
