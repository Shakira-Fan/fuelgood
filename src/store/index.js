import { createStore } from 'vuex';

export default createStore({
  state: {
    user: [],
    token: null,
    logIn: false,
    loginError: null,
    username: localStorage.getItem('name'),
    orders: [],
  },
  getters: {},
  mutations: {
    updateLogIn(state, newState) {
      state.logIn = newState;
    },
    updateName(state, newState) {
      state.username = newState;
    },
  },
  actions: {},
  modules: {},
});
