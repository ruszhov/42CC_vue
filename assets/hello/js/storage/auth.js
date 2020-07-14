export default {
  actions: {
    async login({ dispatch, commit }, { username, password }) {
      try {
        await axios
          .post("/auth/", {
            username,
            password,
          })
          .then((response) => {
            commit("setInfo", {
              username: username,
            });
            localStorage.setItem("user-token", response.data.token);
          });
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
