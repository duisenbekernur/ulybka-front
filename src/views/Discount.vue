<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/dentists' }">Акции</el-breadcrumb-item>
    </el-breadcrumb>

    <h1 class="text-center text-3xl font-medium mb-8">
      Действующие сервисы <span class="text-rose-500 uppercase">со скидками</span>
    </h1>

    <div v-loading="loadingServices" class="flex flex-wrap justify-center gap-2">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="w-[300px] border rounded-lg relative"
      >
        <div
          class="absolute -right-4 -top-4 bg-red-600 rounded-full w-16 h-16 flex items-center justify-center"
        >
          <p class="text-white font-medium text-lg">-{{ service.discount }}%</p>
        </div>
        <div class="h-[150px] w-[300px] overflow-hidden">
          <img :src="service.service_image" alt="service image" width="300" class="bg-cover" />
        </div>
        <div class="p-4 flex flex-col gap-2">
          <h1 class="text-xl font-medium">{{ service.name }}</h1>
          <h1 class="text-lg">{{ service.price }} ₸</h1>
          <el-button
            @click="
              chosenService = service;
              openModal = true;
            "
            type="warning"
            >Записаться</el-button
          >
        </div>
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
              {{ new Date(item.signDate).toLocaleTimeString().substring(0, 5) }}
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
  name: "Discount",

  data() {
    return {
      loadingServices: false,
      services: [],
      loadingDate: false,
      openModal: false,
      dateValue: null,
      chosenService: null,
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
    await this.getServices();
  },
  methods: {
    async getServices() {
      this.loadingServices = true;
      let response = await axiosInstance.get("/service/getServicesWithDiscount").then(response => {
        this.services = response.data.services;
      });
      this.loadingServices = false;
      console.log(this.services);
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
      let response = await axiosInstance.post("/sign/getEmptySignsOfService/", {
        service_id: this.chosenService.id,
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
