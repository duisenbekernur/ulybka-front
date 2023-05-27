<template>
  <div class="w-full">
    <h1 class="font-medium text-xl mb-4">Қолдану тарихы</h1>

    <el-table :data="history" style="width: 100%">
      <el-table-column prop="date" label="ID" />
      <el-table-column prop="name" label="Врач" />
      <el-table-column prop="address" label="Дата" />
    </el-table>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";
import { mapState } from "vuex";

export default {
  name: "History",
  data() {
    return {
      history: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState({
      user: state => state.user.data,
    }),
  },
  methods: {
    async fetchData() {
      const response = await axiosInstance.get(
        `/medHist/getAllMedicineHistoryUser/${this.user.id}`
      );
      this.history = response.data.histories;
    },
  },
};
</script>

<style scoped></style>
