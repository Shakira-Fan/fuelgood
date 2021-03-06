import { createStore } from 'vuex';

export default createStore({
  state: {
    user: [],
    logIn: false,
    username: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('id'),
    orders: [],
    inventory: [],
  },
  getters: {},
  mutations: {
    updateLogIn(state, newState) {
      state.logIn = newState;
    },
    updateName(state, newState) {
      state.username = newState;
    },
    updateId(state, newState) {
      state.id = newState;
    },
    updateInv(state, newState) {
      state.inventory = newState;
    },
    updateUser(state, newState) {
      state.user = newState;
    },
    updateOrders(state, newState) {
      state.orders = newState;
    },
  },
  actions: {},
  modules: {},
});
