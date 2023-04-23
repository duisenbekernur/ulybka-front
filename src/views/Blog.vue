<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blog' }">Блог</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="text-center text-3xl font-medium mb-8">Блог</h1>

    <div v-loading="loadingBlogs" class="m-auto flex flex-col items-center gap-2">
      <div
        v-for="(blog, index) in blogs"
        :key="index"
        class="max-w-md min-w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <router-link :to="{ name: 'blog_full', params: { id: blog.id } }">
            {{ blog.name }}</router-link
          >
        </h5>
        <p
          class="mb-3 font-normal text-gray-500 dark:text-gray-400"
          v-if="blog.description.length > 250"
        >
          {{ blog.description.substring(0, 260) }}
          <router-link
            :to="{ name: 'blog_full', params: { id: blog.id } }"
            class="text-blue-500 cursor-pointer underline"
            >...читать далее</router-link
          >
        </p>
        <p v-else>{{ blog.description }}</p>

        <router-link
          :to="{ name: 'dentist_id', params: { id: blog.author_id } }"
          class="inline-flex items-center text-blue-600 hover:underline"
        >
          Автор: {{ blog.author_name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Blog",
  data() {
    return {
      loadingBlogs: false,
      blogs: [],
    };
  },
  created() {
    this.getBlogs();
  },
  methods: {
    async getBlogs() {
      this.loadingBlogs = true;
      let response = await axiosInstance.get("/blog/getAllBlogs").then(response => {
        this.blogs = response.data.blogs;
      });
      this.loadingBlogs = false;
      console.log(this.blogs);
    },
  },
};
</script>

<style scoped></style>
