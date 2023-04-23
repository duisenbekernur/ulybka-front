<template>
  <div id="services" class="w-[1280px] text-center my-16 mx-auto px-8">
    <h1 class="text-5xl font-medium mb-12">Наши услуги</h1>

    <div class="flex w-full flex-wrap gap-8">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="w-[31%] h-[300px] flex flex-col items-center justify-center border bg-black relative cursor-pointer hover:scale-105 transition shadow-5xl shadow-cyan-600"
      >
        <img :src="service.service_image" class="opacity-40 bg-contain w-full h-full" />
        <div class="absolute top-0 h-full">
          <div class="p-8 text-white flex flex-col gap-8 h-full">
            <h2 class="text-3xl mb-2 font-medium">{{ service.name }}</h2>
            <p class="text-3xl font-medium">{{ service.price }} ₸</p>
            <el-button
              type="primary"
              size="large"
              class="absolute bottom-8 right-0 left-0 m-auto w-1/2"
            >
              <router-link to="/services"> Оставит заявку </router-link>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Services",
  data() {
    return {
      services: [],
    };
  },
  async created() {
    await this.getServices();
  },
  methods: {
    async getServices() {
      this.loadingServices = true;
      let response = await axiosInstance.get("/service/getAllService").then(response => {
        this.services = response.data.services;
      });
      this.loadingServices = false;
    },
  },
};
</script>

<style scoped></style>
