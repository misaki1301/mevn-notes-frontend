import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from "../router"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    user: ""
  },
  mutations: {
    getUser(state, payload) {
      state.token = payload;
      if (payload === "") {
        state.user = ""
        state.token = ""
        localStorage.removeItem("token")
      } else {
        state.user = decode(state.token)
        console.log("current user:", state.user)
        //send user to desired route
      }
    }
  },
  actions: {
    saveUser({commit}, payload) {
      localStorage.setItem("token", payload);
      commit('getUser', payload);
    },
    logOut({commit}) {
      commit('getUser', "")
      //then remove token from local storage
      localStorage.removeItem("token");
      console.log("event logout has been triggered")
      router.push({ name: 'Login'});
    },
    readToken({commit}) {
      const token = localStorage.getItem("token");
      if (!token) {
        commit('getUser', "");
      } else {
        let currentTime = new Date().getTime() / 1000;
        const tokenExp = decode(token).exp;
        if (currentTime > tokenExp) {
         commit('getUser', "");
        }else {
          commit('getUser', token)
        }
      }

    }
  },
  getters: {
    isActive(state) {
      if (!state.token || !state.user) {
        console.log("el estado actual del men", false)
        return false
      } else {
        console.log("el estado actual del men", true)
        return true
      }
    }
  },
  modules: {
  }
})
