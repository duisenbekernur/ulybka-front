<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/dentists' }">Стоматологи</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ dentist.firstname + " " + dentist.lastname }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div v-loading="loading" class="flex justify-around items-center">
      <div class="w-1/2">
        <h1 class="text-3xl font-medium">
          {{ dentist.firstname + " " + dentist.lastname }}
        </h1>
        <p class="text-xl mb-4">{{ dentist.job }}</p>
        <span class="text-xl mb-4">{{ dentist.description }}</span>
        <el-button @click="openModal = true" type="warning" size="large" class="w-1/3"
          >Записаться</el-button
        >
      </div>
      <div class="w-1/3 rounded-lg shadow-2xl overflow-hidden">
        <img :src="dentist.avatar" class="h-[400px] w-full" alt="dentist" />
      </div>
    </div>

    <div>
      <h1 class="text-center mt-8 text-4xl font-medium">Образование стоматолога</h1>

      <div>
<!--        <h3 v-for="item in dentist.empCertifications">-->
<!--          {{ item }}-->
<!--        </h3>-->
      </div>
    </div>

    <el-dialog v-model="openModal" title="Выберите дату" width="25%" :before-close="handleClose">
      <div class="" v-loading="loadingDate">
        <div>
          <p class="text-gray-400 mb-1 text-sm">Выберите день</p>
          <el-date-picker
            class="w-full mb-4"
            @change="handleChangeDate"
            v-model="dateValue"
            type="date"
            placeholder="Выберите день"
            :shortcuts="shortcuts"
            size="large"
          />
        </div>
        <div v-if="ok && availableDates.length > 0">
          <p class="text-gray-400 mb-1 text-sm">Выберите время</p>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="(item, index) in availableDates"
              class="p-1 border border-gray-400 w-20 rounded-lg flex justify-center items-center mb-1 cursor-pointer"
              :key="index"
              @click="signDateIndex = index"
              :class="{ 'bg-gray-100': signDateIndex === index }"
            >
              {{ new Date(item.signDate).toLocaleTimeString() }}
            </div>
          </div>
        </div>
        <div v-if="ok && dateValue && availableDates.length === 0">
          <p class="text-gray-400 mb-1 text-sm">Нет свободныых записей для выбранной даты</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openModal = false">Назад</el-button>
          <el-button type="primary" @click="sign"> Подтвердить </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "DentistPage",
  data() {
    return {
      loading: false,
      loadingDate: false,
      dentist: {
        dataValues: {
          firstname: "",
          lastname: "",
        },
      },
      openModal: false,
      dateValue: null,
      availableDates: [],
      ok: false,
      signDateIndex: null,
      applyLoading: false,
    };
  },
  computed: {
    shortcuts() {
      return [
        {
          text: "Today",
          value: new Date(),
        },
        {
          text: "Yesterday",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: "A week ago",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ];
    },
  },
  async created() {
    this.loading = true;
    await this.getDentist();
    this.loading = false;
  },
  methods: {
    async getDentist() {
      let id = this.$route.params.id;
      let response = await axiosInstance.get(`/emp/getEmployer/${id}`);
      this.dentist = response.data.emp;
    },
    handleClose(done) {
      done();
    },
    async handleChangeDate() {
      let date = new Date(this.dateValue).toLocaleDateString();
      date = date.replace(/\./g, "/");
      date = date.split("/");
      let temp = parseInt(date[0]);
      date[0] = parseInt(date[1]);
      date[1] = parseInt(temp);

      date = date.join("/");
      console.log(date);

      this.loadingDate = true;
      let response = await axiosInstance.post("/sign/getEmptySignsOfEmployer/", {
        employerId: this.dentist.dataValues.id,
        date,
      });
      this.ok = true;
      this.loadingDate = false;
      this.availableDates = response.data.signs;
      console.log(this.availableDates);
    },
    async sign() {
      this.applyLoading = true;
      let response = await axiosInstance.post("/sign/signToExistingDate", {
        id: this.availableDates[this.signDateIndex].id,
      });
      this.applyLoading = false;
      console.log(response.data);
      this.openModal = false;
      this.$toast.success("Успешно!");
    },
  },
};
</script>

<style scoped></style>
