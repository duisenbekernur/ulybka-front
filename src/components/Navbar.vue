<template>
  <nav class="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center">
        <!--                <img src="../assets/Untitled.png" width="" class="h-8 scale-[15] mt mr-3" alt="Ulybka Logo">-->
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Ulybka</span>
      </router-link>

      <div v-if="!user" class="flex">
        <div class="flex gap-4">
          <router-link to="/login">
            <button
              type="button"
              class="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 transition"
            >
              Кіру
            </button>
          </router-link>
          <router-link to="/register">
            <button
              type="button"
              class="text-white border focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 hover:bg-blue-400 focus:ring-blue-800 transition"
            >
              Тіркелу
            </button>
          </router-link>
        </div>
      </div>

      <button
        v-if="user"
        @click="handleClickBurger"
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="order-2 inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-if="user"
        :class="`${
          isMenuOpen ? 'visible  order-5' : 'hidden'
        } items-center justify-between w-full md:flex sm:w-auto`"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 bg-gray-800 md:bg-gray-900 border-gray-700"
        >
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link
              :to="item.path"
              class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent cursor-pointer"
              :class="activeIndex === index && 'border-b-2'"
              @click="handleClickMenu(index)"
              aria-current="page"
              >{{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="user" class="flex gap-4 items-center">
        <router-link to="/profile" class="flex items-center" @click="handleClickMenu(-1)">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </router-link>
        <router-link to="/login" class="flex items-center" @click="handleLogout">
          <button
            class="text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 hover:bg-rose-800 focus:ring-blue-800 transition"
          >
            Шығу
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { setLocalStorage } from "@/utils/local-storage";

export default {
  name: "Navbar",
  data() {
    return {
      isMenuOpen: false,
      menuItems: [
        {
          name: "Басты бет",
          path: "/",
        },
        {
          name: "Стоматологтар",
          path: "/dentists",
        },
        {
          name: "Акциялар",
          path: "/discount",
        },
        {
          name: "Сервистер",
          path: "/services",
        },
        {
          name: "Блогтар",
          path: "/blog",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.data,
      activeIndex: state => state.user.activeMenu,
    }),
  },
  created() {
    console.log(this.getPathname());
  },
  methods: {
    handleLogout() {
      this.$store.commit("user/logout");
    },
    getPathname() {
      return window.location.pathname;
    },
    handleClickMenu(index) {
      setLocalStorage("active-menu", index);
      this.$store.commit("user/setActiveMenu", index);
      this.isMenuOpen = false;
    },
    handleClickBurger() {
      this.isMenuOpen = !this.isMenuOpen;
      console.log(this.isMenuOpen);
    },
  },
};
</script>

<style scoped></style>
