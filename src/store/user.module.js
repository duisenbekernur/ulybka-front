export default {
  namespaced: true,
  state: {
    data:
      typeof localStorage.getItem("user") != "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    activeMenu: localStorage.getItem("active-menu") || 0,
  },
  mutations: {
    logout(state) {
      state.data = null;
      localStorage.removeItem("user");
      console.log(state.data);
    },
    login(state, payload) {
      state.data = payload.user;

      localStorage.setItem("token", JSON.stringify(payload.token));
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    save(state, payload) {
      state.data = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    setActiveMenu(state, payload) {
      state.activeMenu = payload;
    },
  },
  actions: {},
  getters: {
    user: state => {
      return state.data;
    },
  },
};
