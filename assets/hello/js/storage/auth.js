export default {
  actions: {
    async login({ dispatch, commit }, { username, password }) {
      try {
        const response = await axios
          .post("/auth/", {
            username,
            password,
          })
          commit("setInfo", {
            username: username,
          });
          localStorage.setItem("user-token", response.data.token);
      } catch (e) {
        commit("setError", e);
        localStorage.removeItem("user-token");
        throw e;
      }
    },
    async logout({ commit }) {
      commit("clearInfo");
      localStorage.removeItem("user-token");
    },
  },
};
