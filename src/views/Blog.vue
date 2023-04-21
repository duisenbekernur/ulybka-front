<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blog' }">Блог</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="text-center text-3xl font-medium mb-8">Блог</h1>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Blog",
  data() {
    return {
      blogs: [],
    };
  },
  created() {
    this.getBlogs();
  },
  methods: {
    async getBlogs() {
      let response = await axiosInstance.get("/blog/getAllBlogs").then(response => {
        this.blogs = response.data.blogs;
      });
    },
  },
};
</script>

<style scoped></style>
