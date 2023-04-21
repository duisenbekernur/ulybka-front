<template>
  <section class="bg-neutral-100">
    <div class="flex flex-col items-center justify-center px-6 py-32  mt-20 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
            {{ title }}
          </h1>

          <!-- FORM -->
          <Form
            v-if="title === 'Регистрация'"
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-4 md:space-y-6"
          >
            <div v-if="title === 'Регистрация'">
              <!-- firstname -->
              <label for="firstname" class="block mb-2 text-lg font-medium text-black">Имя</label>
              <Field
                v-model="authDatas.firstname"
                type="text"
                name="firstname"
                id="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="Иван"
              />
              <span class="text-red-500">{{ errors.firstname }}</span>
            </div>
            <div v-if="title === 'Регистрация'">
              <!-- lastname -->
              <label for="lastname" class="block mb-2 text-lg font-medium text-black"
                >Фамилия</label
              >
              <Field
                v-model="authDatas.lastname"
                type="text"
                name="lastname"
                id="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="Петрович"
              />
              <span class="text-red-500">{{ errors.lastname }}</span>
            </div>
            <div v-if="title === 'Регистрация'">
              <!-- IIN -->
              <label for="IIN" class="block mb-2 text-lg font-medium text-black">ИИН</label>
              <Field
                v-model="authDatas.IIN"
                type="text"
                name="IIN"
                id="IIN"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="Петрович"
              />
              <span class="text-red-500">{{ errors.IIN }}</span>
            </div>
            <div v-if="title === 'Регистрация'">
              <!-- phone -->
              <label for="email" class="block mb-2 text-lg font-medium text-black"
                >Номер телефона</label
              >
              <Field
                v-model="authDatas.phone"
                type="text"
                name="phone"
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="+7 777 77 77"
              />
              <span class="text-red-500">{{ errors.phone }}</span>
            </div>
            <div v-if="title === 'Регистрация'">
              <!-- email -->
              <label for="email" class="block mb-2 text-lg font-medium text-black">Email</label>
              <Field
                v-model="authDatas.email"
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="abc@mail.ru"
              />
              <span class="text-red-500">{{ errors.email }}</span>
            </div>
            <div v-if="title === 'Регистрация'">
              <!-- Password -->
              <label for="password" class="block mb-2 text-lg font-medium text-black">Пароль</label>
              <Field
                v-model="authDatas.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
              />
              <span class="text-red-500">{{ errors.password }}</span>
            </div>
            <!-- <ElLoading /> -->
            <button
              v-loading="this.isLoading"
              type="submit"
              class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-rose-500 hover:bg-rose-400 transition"
            >
              {{ title }}
            </button>
          </Form>
          <Form
            v-else
            @submit="onSubmit"
            :validation-schema="loginScheme"
            v-slot="{ errors }"
            class="space-y-4 md:space-y-6"
          >
            <div>
              <!-- iinlogin -->
              <label for="phonelogin" class="block mb-2 text-lg font-medium text-black"
                >ИИН пользователя</label
              >
              <Field
                v-model="authDatas.IIN"
                type="text"
                name="iinlogin"
                id="iinlogin"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="010101 202020"
              />
              <span class="text-red-500">{{ errors.iinlogin }}</span>
            </div>
            <div>
              <!-- passwordlogin -->
              <label for="passwordlogin" class="block mb-2 text-lg font-medium text-black"
                >Пароль</label
              >
              <Field
                v-model="authDatas.password"
                type="password"
                name="passwordlogin"
                id="passwordlogin"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
              />
              <span class="text-red-500">{{ errors.passwordlogin }}</span>
            </div>
            <button
              v-loading="this.isLoading"
              type="submit"
              class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-rose-500 hover:bg-rose-400 transition"
            >
              {{ title }}
            </button>
          </Form>
          <!-- Change route -->
          <p v-if="title === 'Логин'" class="text-sm font-light text-black">
            Нету аккаунта?
            <router-link :to="backLink" class="font-medium text-primary-600 hover:underline"
              >Регистрация</router-link
            >
          </p>
          <p v-if="title === 'Регистрация'" class="text-sm font-light text-black">
            Уже есть аккаунт?
            <router-link :to="backLink" class="font-medium text-primary-600 hover:underline"
              >Войти</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import { axiosInstance } from "../axios.js";

export default {
  name: "Auth",
  props: {
    title: String,
    backLink: String,
  },
  components: { Field, Form, ErrorMessage },
  data() {
    const schema = yup.object({
      phone: yup.string().required("обязательное поле"),
      password: yup.string().required("обязательное поле"),
      firstname: yup.string().required("обязательное поле"),
      lastname: yup.string().required("обязательное поле"),
      email: yup.string().email(),
      IIN: yup.string().required("обязательное поле"),
    });
    const loginScheme = yup.object({
      iinlogin: yup.string().required("обязательное поле"),
      passwordlogin: yup.string().required("обязательное поле"),
    });
    return {
      schema,
      loginScheme,
      authDatas: { lastname: "", firstname: "", password: "", phone: "", email: "", IIN: "" },
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;
        if (this.title === "Логин") {
          const response = await axiosInstance.post("/auth/login", {
            IIN: this.authDatas.IIN,
            password: this.authDatas.password,
          });
          if (response.data.message === "Пользватель не найден!") throw new Error();
          console.log(response.data);
          this.$store.commit("user/login", response.data);
        } else {
          const response = await axiosInstance.post("/auth/registration", this.authDatas);
          console.log(response.data);
        }

        localStorage.setItem("active-menu", JSON.stringify(-1));
        this.$router.replace("/profile");
        this.$toast.success("Успешно");
      } catch (error) {
        this.isLoading = false;
        this.$toast.error("Ошибка данных");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
