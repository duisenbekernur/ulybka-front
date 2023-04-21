<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/services' }">Сервисы</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="text-center text-3xl font-medium mb-8">Действующие сервисы</h1>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Services",
  data() {
    return {
      services: [],
      servicesWithDiscount: [],
    };
  },
  async created() {
    await this.getServices();
    await this.getServicesWithDiscount();
  },
  methods: {
    async getServices() {
      let response = await axiosInstance.get("/service/getAllService").then(response => {
        this.services = response.data.services;
      });
      console.log(response.data);
    },
    async getServicesWithDiscount() {
      let response = await axiosInstance.get("/service/getServicesWithDiscount").then(response => {
        this.servicesWithDiscount = response.data.services;
      });
      console.log(response.data);
    },
  },
};
</script>

<style scoped></style>
