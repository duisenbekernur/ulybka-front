<template>
  <div class="w-[1280px] mx-auto mt-28 mb-8 bg-gray-50">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Басты бет</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/services' }">Сервистер</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="text-center text-3xl font-medium mb-8">Сервистер</h1>

    <div
      v-if="withoutDiscount.length > 0"
      v-loading="loadingServices"
      class="flex flex-wrap justify-center gap-2"
    >
      <div
        v-for="(service, index) in withoutDiscount"
        :key="index"
        class="w-[300px] border rounded-lg overflow-hidden"
      >
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
            >Тіркелу</el-button
          >
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center text-rose-500 text-3xl font-medium mb-8">Бос сервистер табылмады</h1>
    </div>

    <el-dialog v-model="openModal" title="Выберите дату" width="25%" :before-close="handleClose">
      <div class="" v-loading="loadingDate">
        <div>
          <p class="text-gray-400 mb-1 text-sm">Күн таңдаңыз</p>
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
          <p class="text-gray-400 mb-1 text-sm">Уақыт таңдаңыз</p>
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
          <p class="text-gray-400 mb-1 text-sm">Таңдалған күнге бос орындар табылмады</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openModal = false">Артқа</el-button>
          <el-button type="primary" @click="sign"> Растау </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { axiosInstance } from "@/axios";

export default {
  name: "Services",
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
    withoutDiscount() {
      let cur = [];
      this.services.forEach(service => {
        if (service.discount === 0) {
          cur.push(service);
        }
      });

      return cur;
    },
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
      let response = await axiosInstance.get("/service/getAllService").then(response => {
        this.services = response.data.services;
      });
      this.loadingServices = false;
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
