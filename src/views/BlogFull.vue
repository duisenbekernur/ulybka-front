<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Басты</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/blog' }">Блогтар</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ blog.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div v-loading="loadingBlog">
      <h1 class="text-center text-3xl font-medium mb-8">{{ blog.name }}</h1>
      <p class="border rounded-lg p-8 bg-neutral-100">{{ blog.description }}</p>
      <div class="mt-4">
        <p class="font-medium">Отзыв жазу</p>
        <div class="flex gap-2">
          <el-input v-model="userReview" placeholder="Введите..." class=""></el-input>
          <el-button v-loading="loadingReview" @click="handleSubmitReview" type="primary"
            >Жіберу</el-button
          >
        </div>
      </div>
      <div class="mt-4" v-loading="loadingReviews">
        <p class="font-medium">Отзывтар</p>

        <div v-if="reviews.length > 0" class="flex flex-col gap-2">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="border p-2 rounded-lg flex gap-4"
          >
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <div class="flex justify-between w-full items-center">
              <div>
                <p class="font-medium">{{ review.fullname }}</p>
                <p>{{ review.description }}</p>
              </div>
              <p class="text-gray-400">
                {{
                  new Date(review.createdAt).toLocaleDateString() +
                  "/" +
                  new Date(review.createdAt).toLocaleTimeString()
                }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Здесь пока нету отзывов</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";
import { mapState } from "vuex";

export default {
  name: "BlogFull",
  data() {
    return {
      loadingBlog: false,
      loadingReview: false,
      loadingReviews: false,
      blog: {},
      userReview: "",
      reviews: [],
    };
  },
  created() {
    console.log("aa");
    this.getBlog();
    this.getReviews();
  },
  computed: {
    ...mapState({
      user: state => state.user.data,
    }),
  },
  methods: {
    async getBlog() {
      this.loadingBlog = true;
      let response = await axiosInstance
        .get(`/blog/getBlogByParams/${this.$route.params.id}`)
        .then(response => (this.blog = response.data.blog))
        .catch(error => console.log(error));
      this.loadingBlog = false;
    },
    async getReviews() {
      this.loadingReviews = true;
      let response = await axiosInstance
        .get(`/review/getReviewOfBlog/${this.$route.params.id}`)
        .then(response => (this.reviews = response.data.reviews));
      this.loadingReviews = false;
      console.log("r", this.reviews);
    },
    async handleSubmitReview() {
      this.loadingReview = true;
      let response = await axiosInstance.post(`/review/createReviewToBlog`, {
        blogId: +this.$route.params.id,
        description: this.userReview,
        author_id: this.user.id,
      });
      this.loadingReview = false;
      this.reviews.unshift({
        description: this.userReview,
        fullname: this.user.firstname + " " + this.user.lastname,
        createdAt: new Date(),
      });
    },
  },
};
</script>

<style scoped></style>