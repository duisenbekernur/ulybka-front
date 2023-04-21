<template>
  <div>
    <h1 class="font-medium text-xl mb-4">Данные пользователя</h1>

    <div class="border rounded-lg p-4 flex gap-16">
      <div class="text-gray-500 flex flex-col gap-4">
        <p>ID ползователя</p>
        <p>Имя</p>
        <p>Фамилия</p>
        <p>Номер телефона</p>
        <p>ИИН</p>
        <p>Email</p>
        <p>Аккаунт создан</p>
      </div>
      <div class="flex flex-col gap-4">
        <p>{{ user.id }}</p>
        <p>{{ user.firstname }}</p>
        <p>{{ user.lastname }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ user.IIN }}</p>
        <p>{{ user.email }}</p>
        <p>{{ new Date(user.createdAt).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Main",
  computed: {
    ...mapState({
      user: state => state.user.data,
    }),
  },
};
</script>

<style scoped></style>
