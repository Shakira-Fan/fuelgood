import { createStore } from 'vuex';

export default createStore({
  state: {
    user: [],
    logIn: false,
    username: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('id'),
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
