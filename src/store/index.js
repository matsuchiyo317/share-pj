import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
  },
  mutations: {
    auth(state, payloud) {
      state.auth = payloud;
    },
    user(state, payloud) {
      state.user = payloud;
    },
    logout(state, payloud) {
      state.auth = payloud;
    },
    changeUserData(state, payloud) {
      state.user.profile = payloud;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://nameless-caverns-04556.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://nameless-caverns-04556.herokuapp.com/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      router.replace("/home");
    },
    logout({ commit }) {
      axios
        .post("https://nameless-caverns-04556.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", resopose.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
