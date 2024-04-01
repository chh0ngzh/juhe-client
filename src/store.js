import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      is_server_alive: false,
      bypass_server: false,
    };
  },
  mutations: {
    server_is_alive(state) {
      state.is_server_alive = true;
    },
    server_is_not_alive(state) {
      state.is_server_alive = false;
    },
    bypass(state) {
      state.bypass_server = false;
    },
  },
});

export default store;
