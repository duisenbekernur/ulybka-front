<template>
  <div class="w-[1280px] mt-20 p-4 mx-auto flex gap-8">
    <aside class="w-80">
      <img
        class="w-80"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        alt="img"
      />

      <el-button
        type="primary"
        plain
        class="mt-2 ml-16"
        @click="
          isDrawerOpened = true;
          updateUserValues = user;
        "
        >Редактировать</el-button
      >

      <ul class="p-4">
        <li
          v-for="(item, index) in sideItems"
          class="px-4 py-2 mb-2 rounded-lg cursor-pointer hover:bg-neutral-100 flex gap-2 items-center"
          @click="handleClickMenu(index)"
          :class="{ 'bg-neutral-200 text-blue-500 hover:bg-neutral-200': index === activeItem }"
        >
          <Icon
            :icon="item.icon"
            width="25"
            color="gray"
            :color="`${activeItem === index && 'blue'}`"
          />
          {{ item.name }}
        </li>
      </ul>
    </aside>
    <main class="w-full">
      <Main v-if="sideItems[activeItem].component === 'Main'" />
      <History v-else-if="sideItems[activeItem].component === 'History'" />
    </main>

    <el-drawer v-model="isDrawerOpened" title="Редактировать профиль" :with-header="true">
      <p class="text-gray-500 mb-1">Имя</p>
      <el-input v-model="updateUserValues.firstname" placeholder="Имя" class="mb-3" />
      <p class="text-gray-500 mb-1">Фамилия</p>
      <el-input v-model="updateUserValues.lastname" placeholder="Имя" class="mb-3" />
      <p class="text-gray-500 mb-1">Номер телефона</p>
      <el-input v-model="updateUserValues.phone" placeholder="Имя" class="mb-3" />
      <p class="text-gray-500 mb-1">Email</p>
      <el-input v-model="updateUserValues.email" placeholder="Имя" class="mb-3" />

      <el-button plain type="success" @click="handleUpdateUser">Сохранить</el-button>
    </el-drawer>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import Main from "@/components/profile/Main.vue";
import History from "@/components/profile/History.vue";
import { mapState } from "vuex";
export default {
  components: {
    History,
    Main,
    Icon,
  },
  name: "Profile",
  data() {
    return {
      isDrawerOpened: false,
      activeItem: 0,
      sideItems: [
        {
          name: "Основное",
          component: "Main",
          icon: "mdi:user",
        },
        {
          name: "История посещения",
          component: "History",
          icon: "ic:baseline-history",
        },
      ],
      updateUserValues: {},
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.data,
    }),
  },
  methods: {
    handleClickMenu(index) {
      this.activeItem = index;
    },
    handleUpdateUser() {
      this.$store.commit("user/save", this.updateUserValues);
      this.user = this.updateUserValues;
      console.log(this.user);
      this.$toast.success("Изменения сохранены");
    },
  },
};
</script>

<style scoped></style>
